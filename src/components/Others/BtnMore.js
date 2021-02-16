import React from "react";
import "./styles.css";

const BtnMore = ({ handler_show, show, qty }) => {
  return (
    <div className="text-center">
      {qty > 8 && (
        <button
          className="btn-show-cast btn-lg"
          onClick={() => handler_show(!show)}
        >
          ver {show ? "menos" : "mais"}
        </button>
      )}
    </div>
  );
};

export default BtnMore;
