import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Col } from "react-bootstrap";

function LoadingDetails({ ...props }) {
  return (
    <>
      <Col xs={12}>
        <Skeleton className="mb-3 p-5" height={440} />
      </Col>
      <div className="d-flex flex-wrap">
        <Col xs={12} md={8}>
          <Skeleton className="mb-3 p-5" height={440} />
        </Col>
        <Col xs={12} md={4}>
          <Skeleton className="mb-3 p-5" height={440} />
        </Col>
      </div>
    </>
  );
}

export default LoadingDetails;
