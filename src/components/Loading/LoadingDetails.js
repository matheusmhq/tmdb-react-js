import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Col } from "react-bootstrap";

import "./styles.css";
import Colors from "../../styles/Colors";

const LoadingDetails = () => {
  return (
    <>
      <SkeletonTheme
        color={Colors.brand_gray}
        highlightColor={Colors.light_gray}
      >
        <Col xs={12}>
          <Skeleton className="mb-3 p-5" height={440} />
        </Col>
        <div
          className="d-flex flex-wrap container-loading-details-info"
          style={{ maxWidth: 1144 }}
        >
          <Col xs={12} md={8}>
            <Skeleton className="mb-3 p-5" height={440} />
          </Col>
          <Col xs={12} md={4}>
            <Skeleton className="mb-3 p-5" height={440} />
          </Col>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default LoadingDetails;
