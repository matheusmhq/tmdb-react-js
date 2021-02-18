import React, { useEffect, useState } from "react";
import { Col, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import placeholder from "../../assets/img/placeholder.jpg";
import cast_placeholder from "../../assets/img/cast_placeholder.jpg";
import moment from "moment";
import { GetImage } from "../../functions/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HexToRgbA, GetColorRating } from "../../functions/utils";

function MainCard({ ...props }) {
  const { list_movie, history, type } = props;
  const location = useLocation();

  const [target, setTarget] = useState("");

  function RenderDate(item) {
    var date = "";
    if (item.release_date != undefined) {
      date = moment(item.release_date).format("ll");
    } else if (item.first_air_date != undefined) {
      date = moment(item.first_air_date).format("ll");
    }
    return date;
  }

  function RenderImg(item) {
    var img = type == "person" ? cast_placeholder : placeholder;
    if (type == "movie" || type == "tv") {
      if (item.poster_path != null) img = GetImage("w500", item.poster_path);
    } else {
      if (item.profile_path != null)
        img = GetImage("w276_and_h350_face", item.profile_path);
    }
    return img;
  }

  function RenderMainWorks(known) {
    if (known == undefined) return false;
    var main = "";
    known.map((item, index) => {
      main += `${item.title != undefined ? item.title : item.name}${
        known.length != index ? ", " : ""
      }`;
    });
    return main;
  }

  function GetUrl(item) {
    var url = `/details/${item.title != undefined ? "movie" : "tv"}/${item.id}`;
    if (type == "person") {
      url = `/person/${item.id}`;
    }
    return url;
  }

  useEffect(() => {
    var page = location.pathname;
    if (
      page.includes("movies") ||
      page.includes("tvs") ||
      page.includes("persons") ||
      page == "/"
    ) {
      setTarget("_blank");
    }
  }, []);

  return (
    <>
      {list_movie.map((item) => {
        return (
          <Col xs={6} sm={4} lg={3} key={item.id} className="mb-3">
            <Card className=" h-100">
              <a
                target={target}
                href={GetUrl(item)}
                className="position-relative"
              >
                <Card.Img
                  title={item.title}
                  alt={item.title}
                  variant="top"
                  src={RenderImg(item)}
                />
                {type != "person" && (
                  <div className="container-rating">
                    <CircularProgressbar
                      strokeWidth={7}
                      styles={buildStyles({
                        textSize: "28px",
                        pathColor: GetColorRating(item.vote_average),
                        textColor: "white",
                        trailColor: HexToRgbA(
                          GetColorRating(item.vote_average),
                          0.3
                        ),
                        backgroundColor: "black",
                      })}
                      background={true}
                      backgroundPadding={true}
                      value={item.vote_average * 10}
                      text={`${item.vote_average * 10}%`}
                    />
                  </div>
                )}
              </a>
              <Card.Body>
                <a
                  target={target}
                  href={`/details/${item.title != undefined ? "movie" : "tv"}/${
                    item.id
                  }`}
                  title={item.title}
                  alt={item.title}
                >
                  <Card.Title>
                    {item.title != undefined ? item.title : item.name}
                  </Card.Title>
                </a>
                {type != "person" && (
                  <Card.Text>
                    {RenderDate(item) != "Data inválida"
                      ? RenderDate(item)
                      : ""}
                  </Card.Text>
                )}
                {type == "person" && (
                  <Card.Text>{RenderMainWorks(item.known_for)}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default MainCard;
