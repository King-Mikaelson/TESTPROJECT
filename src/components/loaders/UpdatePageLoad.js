import { useState } from "react";
import "../modal/Modal.css";

const UpdatePageLoad = () => {
  let timer;
  const [reload, setReload] = useState(false);

  timer = setTimeout(() => {
    setReload(true);
  }, 10000);

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setReload(false);
      resetTimer();
    }
  };
  return (
    <>
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      {reload && (
        <div
          className={reload ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DelayCentre closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePageLoad;

const UpdateCard = () => {
  return (
    <div className="updateItem__wrapper">
      <div className="update__item">
        <div
          style={{
            height: "5rem",
            width: "5rem",
            padding: "0.5rem 0",
          }}
          className="skeleton"
        ></div>
        <p
          style={{
            height: "1.5rem",
            width: "8rem",
          }}
          className="skeleton"
        ></p>
        <p
          style={{
            height: "1.5rem",
            width: "8rem",
          }}
          className="skeleton"
        ></p>
        <p
          style={{
            height: "1.5rem",
            width: "8rem",
          }}
          className="skeleton"
        ></p>
        <p
          style={{
            height: "1.5rem",
            width: "8rem",
          }}
          className="skeleton"
        ></p>
        <p
          style={{
            height: "1.5rem",
            width: "8rem",
          }}
          className="skeleton"
        ></p>
      </div>
    </div>
  );
};

const DelayCentre = () => {
  return (
    <div
      style={{ backgroundColor: "white", padding: "3rem", borderRadius: "8px" }}
    >
      <h2>We couldn't find any items in this department.</h2>
      <br />
      <h3>Please Check your internet connection and try again.</h3>
      <br />
      <p style={{ fontSize: "1rem", fontWeight: "500" }}>
        If the problem persists, please contact your Supervisor.{" "}
      </p>
    </div>
  );
};
