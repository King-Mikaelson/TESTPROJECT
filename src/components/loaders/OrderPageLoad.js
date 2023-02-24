import React from "react";
import { useState } from "react";
import "../category/Category.css";

const OrderPageLoad = () => {
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

      <div className="category__heading loading">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </>
  );
};

export default OrderPageLoad;

const LoadingCard = () => {
  return (
    <div className="loader__main">
      <p
        style={{
          height: "1.5rem",
          width: "8rem",
        }}
        className="skeleton"
      ></p>
      <div
        style={{
          height: "5rem",
          width: "5rem",
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
          width: "5rem",
        }}
        className="skeleton"
      ></p>

      <button
        style={{
          border: "1px solid goldenrod",
          width: "6rem",
          height: "1.5rem",
        }}
        className="skeleton"
      ></button>
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
