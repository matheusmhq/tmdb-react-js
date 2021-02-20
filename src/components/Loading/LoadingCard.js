import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Col } from "react-bootstrap";

import Colors from "../../styles/Colors";

function LoadingCard({ ...props }) {
  const { qty } = props;

  function RenderSkeleton() {
    var list = [];

    for (var i = 1; i <= qty; i++) {
      list.push(
        <Col xs={6} md={4} lg={3} key={i}>
          <SkeletonTheme
            color={Colors.brand_gray}
            highlightColor={Colors.light_gray}
          >
            <Skeleton className="mb-3" height={400} />
          </SkeletonTheme>
        </Col>
      );
    }
    return list;
  }

  return <>{RenderSkeleton()}</>;
}

export default LoadingCard;
