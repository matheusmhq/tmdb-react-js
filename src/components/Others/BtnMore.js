import React from "react";
import "./styles.css";

const BtnMore = ({ handler_show, show, qtd }) => {
  return (
    <div className="text-center">
      {qtd > 6 && (
        <button
          className="btn-show-cast btn-lg"
          onClick={() => handler_show(!show)}
        >
          ver {show == true ? "menos" : "mais"}
        </button>
      )}
    </div>
  );
};

export default BtnMore;
