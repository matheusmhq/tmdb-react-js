import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Col } from "react-bootstrap";

import "./styles.css";

function LoadingDetails() {
  return (
    <Container>
      <div className="d-flex">
        <Col xs={12} md={4} lg={4}>
          <Skeleton className="mb-3 p-5" height={800} />
        </Col>
        <Col xs={12} md={8} lg={8}>
          <Skeleton className="mb-3 p-5" height={800} />
        </Col>
      </div>
    </Container>
  );
}

export default LoadingDetails;
