import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Col } from "react-bootstrap";

function LoadingCard({ ...props }) {
  const { qty } = props;

  function RenderSkeleton() {
    var list = [];

    for (var i = 1; i <= qty; i++) {
      list.push(
        <Col xs={6} md={4} lg={3} key={i}>
          <Skeleton className="mb-3" height={400} />
        </Col>
      );
    }
    return list;
  }

  return <>{RenderSkeleton()}</>;
}

export default LoadingCard;
