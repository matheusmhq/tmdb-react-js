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
          <Col xs={6} sm={4} lg={3} key={item.id} className="mb-3">
            <Card className="h-100">
              <a href={`/person/${item.id}`} className="position-relative">
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
                  href={`/person/${item.id}`}
                  title={item.name}
                  alt={item.name}
                >
                  <Card.Title>{item.name}</Card.Title>
                </a>
                <Card.Text>{item.character}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default CardCast;
