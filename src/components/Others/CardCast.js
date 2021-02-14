import React from "react";
import { Col, Card } from "react-bootstrap";

import cast_placeholder from "../../assets/img/cast_placeholder.jpg";
import { GetImage } from "../../functions/utils";

function CardCast({ ...props }) {
  const { list_cast } = props;

  return (
    <>
      {list_cast.map((item) => {
        return (
          <Col xs={6} md={4} lg={3} key={item.id}>
            <Card className="mb-3">
              <a href={`#`} className="position-relative">
                <Card.Img
                  title={item.name}
                  alt={item.name}
                  variant="top"
                  src={
                    item.profile_path != null
                      ? GetImage("w276_and_h350_face", item.profile_path)
                      : cast_placeholder
                  }
                />
              </a>
              <Card.Body>
                <a
                  href={`/details/${item.name != undefined ? "movie" : "tv"}/${
                    item.id
                  }`}
                  title={item.name}
                  alt={item.name}
                >
                  <Card.Title className="limit_word">{item.name}</Card.Title>
                </a>
                <Card.Text className="limit_word_one">
                  {item.character}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default CardCast;
