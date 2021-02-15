import React, { useEffect, useState } from "react";

import "./styles.css";

function ChooserType({ ...props }) {
  const { screen, handler_current_page, handler_type, type } = props;
  const [obj, setObj] = useState({});

  useEffect(() => {
    switch (screen) {
      case "discover":
        setObj({
          One: "Descubra novos",
          Two: "Filmes",
          Three: "Ou",
          Four: "Séries",
        });
        break;
      case "search":
        setObj({
          One: "Pesquise por",
          Two: "Filmes",
          Three: ",",
          Four: "Séries",
          Five: "Ou",
          Six: "Pessoas",
        });
        break;
      case "movies":
        setObj({
          One: "Encontre filmes",
          Two: "Populares",
          Three: "Ou",
          Four: "Mais votados",
        });
        break;
      case "tvs":
        setObj({
          One: "Encontre séries",
          Two: "Populares",
          Three: "Ou",
          Four: "Mais votadas",
        });
        break;
      case "person":
        setObj({
          One: "Pessoas populares",
        });
        break;
    }
  }, []);

  function HandlerType(e, type) {
    e.stopPropagation();
    handler_current_page(1);
    handler_type(type);
  }

  return (
    <div className="container-type">
      <p className="discover-text">{obj?.One}</p>
      <a
        onClick={(e) => HandlerType(e, "movie")}
        className={`movie-text ${type == "movie" ? "underline" : ""}`}
      >
        {obj?.Two}
      </a>
      <p className="discover-text">{obj?.Three}</p>
      <a
        onClick={(e) => HandlerType(e, "tv")}
        className={`serie-text ${type == "tv" ? "underline" : ""}`}
      >
        {obj?.Four}
      </a>
      <p className="discover-text">{obj?.Five}</p>
      <a
        onClick={(e) => HandlerType(e, "person")}
        className={`person-text ${type == "person" ? "underline" : ""}`}
      >
        {obj?.Six}
      </a>
    </div>
  );
}

export default ChooserType;
