import { useState } from "react";
import "./Modal.css";

export default function OrdertableModal({ paragraph, text, options, span }) {
  return (
    <div className="backdrop__container">
      <div className="modal__center1">
        <div className="order__pad">
          <span>{span}</span>
          <h1 className="orderpad__heading">{paragraph}</h1>
          <div className="order__buttons">
            <button >
              {text}
            </button>
            <button>
              {options}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
