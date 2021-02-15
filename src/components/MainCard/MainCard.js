import React from "react";
import { Col, Card } from "react-bootstrap";

import placeholder from "../../assets/img/placeholder.jpg";
import moment from "moment";
import { GetImage } from "../../functions/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Colors from "../../styles/Colors";
import { HexToRgbA, GetColorRating } from "../../functions/utils";

function MainCard({ ...props }) {
  const { list_movie, history } = props;

  return (
    <>
      {list_movie.map((item) => {
        return (
          <Col xs={6} md={4} lg={3} key={item.id}>
            <Card className="mb-3">
              <a
                href={`/details/${item.title != undefined ? "movie" : "tv"}/${
                  item.id
                }`}
                className="position-relative"
              >
                <Card.Img
                  title={item.title}
                  alt={item.title}
                  variant="top"
                  src={
                    item.poster_path != null
                      ? GetImage("w500", item.poster_path)
                      : placeholder
                  }
                />
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
              </a>
              <Card.Body>
                <a
                  href={`/details/${item.title != undefined ? "movie" : "tv"}/${
                    item.id
                  }`}
                  title={item.title}
                  alt={item.title}
                >
                  <Card.Title className="limit_word">
                    {item.title != undefined ? item.title : item.name}
                  </Card.Title>
                </a>
                <Card.Text>
                  {moment(
                    item.release_date != undefined
                      ? item.release_date
                      : item.first_air_date
                  ).format("LL")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default MainCard;
