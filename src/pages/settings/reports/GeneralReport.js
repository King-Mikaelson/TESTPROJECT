import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import "../Settings.css";
import GeneralReportPage from "./GeneralReportPage";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import { MdOutlineArrowBackIos } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";

const GeneralReport = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, toastOptions } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [bar, setBar] = useState([]);
  const [lounge, setLounge] = useState([]);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const navigate = useNavigate();

  // A FUNCTION TO HANDLE FROM AND TO DATE
  function handleDate(e) {
    setFromDate(e.target.value);
  }

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  let fromTime = value && value?.$d.toTimeString().split(" ")[0].slice(0, -3);
  let toTime = value2 && value2?.$d.toTimeString().split(" ")[0].slice(0, -3);

  let FromDate1 = new Date(FromDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  function handleDate2(e) {
    setToDate(e.target.value);
  }

  let ToDate1 = new Date(ToDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const activeUser = user.username;
  const activePasscode = user.passcode;

  const client = "SwiftLounge";

  const url = `https://swift-lounge.onrender.com/overall-reports`;
  const getAllReports = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  // A Function A SELECTED DATE
  const FilterByDate = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/filter-reports",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

  const [paymentsFilter, setPaymentsFilter] = useState([]);
  // A Function A SELECTED DATE
  const FilterPayments = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/filter-tables",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${FromDate1} ${fromTime}`,
            to: `${ToDate1} ${toTime}`,
          }),
        }
      );
      if (response.ok) {
        const filtereddata = await response.json();
        setPaymentsFilter(filtereddata);
      } else {
        toast.warn("No Report Found For This Date", toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let cashPayments1 = paymentsFilter?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  let posPayments1 = paymentsFilter?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  let transferPayments1 = paymentsFilter?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  let totalRevenue1 = cashPayments1 + posPayments1 + transferPayments1;

  function getDate() {
    if (ToDate === "" || toTime === "" || FromDate === "" || fromTime === "") {
      toast.warn("All fields are required", toastOptions);
    } else {
      FilterByDate();
      FilterPayments();
    }
  }
  const transformReports = !filteredReports.length ? reports : filteredReports;

  useEffect(() => {
    if (transformReports.length) {
      sortDuplicateValues(transformReports);
    }
  }, [transformReports]);

  var width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  // A USE EFFECT FUNCTION THAT FETCHES ALL DATA FROM THE DATABASE
  useEffect(() => {
    getAllReports();
  }, []);

  const generalReportPageRef = useRef(null);

  // FUNCTION TO CLEAR GENERAL REPORTS
  const clearDB = async (activeUser, activePasscode) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/clear-db",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Individual table has been cleared", toastOptions);
        setBar([]);
        setLounge([]);
      }
    } catch (err) {
      toast.error("Individual table has not been cleared", toastOptions);
    }
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: [width, width],
      unit: "px",
      compress: true,
    });

    // Adding the fonts
    doc.setFont("helvetica");

    doc.html(generalReportPageRef.current, {
      async callback(doc) {
        let blobFile = doc.output("blob");
        const dateCreated = new Date().toLocaleDateString("en-GB");
        let dateModified = dateCreated.toString().replace(/\//g, "-");
        const myFile = new File([blobFile], `${client}-${dateModified}.pdf`, {
          type: "application/pdf",
        });

        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("file", dateModified);

        axios
          .post("https://swift-lounge.onrender.com/upload-report", formData)
          .then((res) => {
            if (res.ok) {
              toast.success("Report Uploaded Successfully", toastOptions);
            }
            clearDB(activeUser, activePasscode);
          });
      },
    });
  };

  // A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
  function sortDuplicateValues(data) {
    let arr = data;

    // filter property bar
    const results = arr.filter((bar) => {
      return bar.department === "Bar";
    });

    // filter property lounge
    const results2 = arr.filter((lounge) => {
      return lounge.department === "Lounge";
    });

    let BarResultWithSubTotal = mergeDuplicates(results).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));

    let LoungeResultWithSubTotal = mergeDuplicates(results2).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));

    setBar(BarResultWithSubTotal);
    setLounge(LoungeResultWithSubTotal);
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

  function handledChange(event) {
    setDate(event.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    let serverDate = date;
    // Converting Date from yymmdd format to day-month-year format
    serverDate = serverDate.split("-").reverse().join("-");
    getPdfByDate(client, serverDate);
  }

  // A Function To GET PDF OF A USER SELECTED DATE
  const getPdfByDate = async (client, date) => {
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

  // TOTAL PRODUCTS SOLD BAR
  let totalBar = bar.reduce((acc, curr) => {
    return acc + +curr.subtotal;
  }, 0);

  // TOTAL PRODUCTS SOLD LOUNGE
  let totalLounge = lounge.reduce((acc, curr) => {
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
    <div className="main__report">
      <div
        className="add__header"
        style={{
          display: "flex",
          margin: "2rem",
          justifyContent: "space-between",
        }}
      >
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
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
            <button className="from__datebtn" onClick={getDate}>
              Get Filter
            </button>
            <button
              className="to__datebtn"
              onClick={() => {
                clearReports();
                window.location.reload();
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

        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="reportbuttons"
            onClick={() => {
              getAllReports();
              handleGeneratePdf();
            }}
          >
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

      <div ref={generalReportPageRef}>
        <GeneralReportPage
          bar={bar}
          lounge={lounge}
          barTotal={totalBar}
          loungeTotal={totalLounge}
          FromDate={FromDate1}
          FromTime={fromTime}
          ToDate={ToDate1}
          ToTime={toTime}
          cashPayments1={cashPayments1}
          posPayments1={posPayments1}
          transferPayments1={transferPayments1}
          totalRevenue1={totalRevenue1}
        />
      </div>

      <div className={showModal ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Enter Report Date
            </h3>
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

              <div className="modal__buttons">
                <button
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="button"
                >
                  Get Pdf
                </button>

                <input
                  type="button"
                  value="Close"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralReport;
