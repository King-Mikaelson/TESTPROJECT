import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IndividualReportPage from "./IndividualReportPage";
import AuthContext from "../../../context/AuthContext";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function IndividualReportPerWaiter() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const { toastOptions } = useContext(AuthContext);
  const [report, setReport] = useState([]);
  const establishment = "SwiftLounge";
  const { waitername } = useParams();
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [data, setData] = useState([]);

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  // A FUNCTION TO HANDLE THE DATE FOR FILTERED REPORTS
  let fromTime = value && value?.$d.toTimeString().split(" ")[0].slice(0, -3);
  let toTime = value2 && value2?.$d.toTimeString().split(" ")[0].slice(0, -3);

  let FromDate1 = new Date(FromDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // A FUNCTION TO HANDLE FROM AND TO DATE
  function handleDate(e) {
    setFromDate(e.target.value);
  }

  function handleDate2(e) {
    setToDate(e.target.value);
  }

  let ToDate1 = new Date(ToDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // console.log(fromTime, FromDate, ToDate, toTime)

  // A Function A SELECTED DATE
  const FilterByDate = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/filter-individual-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            waiter: waitername,
            from: `${FromDate1} ${fromTime}`,
            to: `${ToDate1} ${toTime}`,
          }),
        }
      );
      if (response.ok) {
        const filtereddata = await response.json();
        setFilteredReports(filtereddata);
      } else {
        toast.warn("No Report Found For This Date", toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function getDate() {
    if (ToDate === "" || toTime === "" || FromDate === "" || fromTime === "") {
      toast.warn("All fields are required", toastOptions);
    } else {
      FilterByDate();
    }
  }

  // FUNCTION TO GET WAITER
  const getWaiterReport = async (waitername) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/individual-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            waiter: waitername,
          }),
        }
      );
      const data = await response.json();
      // A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
      // filter property bar
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWaiterReport(waitername);
  }, []);

  // A USE EFFECT FOR FILTERED REPORTS AND NORMAL REPORT
  const transformReports = !filteredReports.length ? data : filteredReports;

  useEffect(() => {
    transformReports.length && sortDuplicateValues(transformReports);
  }, [transformReports]);

  //  A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
  function sortDuplicateValues(data) {
    let arr = data;

    let resultWithSubTotal = mergeDuplicates(arr).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));
    setReport(resultWithSubTotal);
  }

  function mergeDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (i !== j) {
          if (
            array[i].item === array[j].item &&
            array[i].price === array[j].price
          ) {
            // remove both matching duplicates and create a new array
            let new_array = array.filter((item, index) =>
              index === i || index === j ? null : item
            );
            // add a sample of duplicate items with quantity merged together
            new_array.push({
              item: array[i].item,
              price: array[i].price,
              quantity: array[i].quantity + array[j].quantity,
            });

            return mergeDuplicates(new_array);
          }
        }
      }
    }
    return array;
  }

  const individualReportPageRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: [1300, 1300],
      unit: "px",
      compress: true,
    });

    // Adding the fonts
    doc.setFont("Lucida Sans Unicode");

    doc.html(individualReportPageRef.current, {
      async callback(doc) {
        let blobFile = doc.output("blob");
        const dateCreated = new Date().toLocaleDateString("en-GB");
        let dateModified = dateCreated.toString().replace(/\//g, "-");
        const myFile = new File(
          [blobFile],
          `${waitername}-${establishment}-${dateModified}.pdf`,
          {
            type: "application/pdf",
          }
        );

        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("file", dateModified);
        axios
          .post("https://swift-lounge.onrender.com/upload-report", formData)
          .then((res) => {
            if (res.ok) {
              getWaiterReport(waitername);
              toast.success("Report Uploaded Successfully", toastOptions);
            }
          });
      },
    });
  };

  function handledChange(event) {
    setDate(event.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    let serverDate = date;
    serverDate = serverDate.split("-").reverse().join("-");
    getPdfByDate(serverDate);
  }

  // A Function To GET PDF OF A USER SELECTED DATE

  const getPdfByDate = async (date) => {
    const client = `${waitername}-${establishment}`;
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/retrieve-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client,
            date,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(`PDf sent successfully`, toastOptions);
        window.open(`${data.pdf}`);
      } else if (response.status === 404) {
        toast.error(`Pdf With This Date, This not Exist`, toastOptions);
      } else {
        toast(`Failed to get Pdf`, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  TOTAL PRODUCTS SOLD
  let total = report.reduce((acc, curr) => {
    return acc + +curr.subtotal;
  }, 0);

  function clearReports() {
    setFilteredReports([]);
    setToDate("");
    setFromDate("");
    setValue2("");
    setValue("");
  }

  return (
    <div>
      <div
        className="add__header"
        style={{
          display: "flex",
          margin: "2rem",
          justifyContent: "space-between",
        }}
      >
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={25} />
          <p className="goback__text">Go Back</p>
        </div>
        <div
          className="dateTime__container"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            className="dateTime__from"
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <h2 style={{ display: "inline" }} className="dateTime__text">
              From
            </h2>
            <span className="report--get__date">
              <input type="date" value={FromDate} onChange={handleDate} />
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Pick a time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </span>
            <button
              className="from__datebtn"
              onClick={() => {
                getDate();
              }}
            >
              Get Filter
            </button>
            <button
              className="to__datebtn"
              onClick={() => {
                clearReports();
              }}
            >
              Clear Filter
            </button>
          </div>

          <div
            className="dateTime__to"
            style={{ display: "flex", gap: "1rem", marginLeft: "1rem" }}
          >
            <h2 style={{ display: "inline" }} className="dateTime__text">
              To
            </h2>
            <span className="report--get__date">
              <input type="date" value={ToDate} onChange={handleDate2} />
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Pick a time"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </span>
          </div>
        </div>
        {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="reportbuttons" onClick={handleGeneratePdf}>
            Upload Report
          </button>

          <button
            className="reportbuttons"
            onClick={() => setShowModal((prevValue) => !prevValue)}
          >
            Download Report
          </button>
        </div> */}
      </div>

      <div ref={individualReportPageRef}>
        <IndividualReportPage report={report} total={total} />
      </div>

      <div className={showModal ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Enter Report Date</h3>
          </div>

          <div className="modal__body">
            <form onSubmit={handleSumbit} className="staff__modal">
              <input
                type="date"
                name="date"
                value={date}
                onChange={handledChange}
                className="modal__input"
              />

              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                className="modal__buttons"
              >
                <button
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="button"
                >
                  Get Pdf
                </button>

                <input
                  className="close__button"
                  type="button"
                  value="Close"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualReportPerWaiter;
