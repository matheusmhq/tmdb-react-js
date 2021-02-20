import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Col } from "react-bootstrap";

import Colors from "../../styles/Colors";
import "./styles.css";

const LoadingPerson = () => {
  return (
    <Container>
      <SkeletonTheme
        color={Colors.brand_gray}
        highlightColor={Colors.light_gray}
      >
        <div className="d-flex">
          <Col xs={12} md={4} lg={4}>
            <Skeleton className="mb-3 p-5" height={800} />
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Skeleton className="mb-3 p-5" height={800} />
          </Col>
        </div>
      </SkeletonTheme>
    </Container>
  );
};

export default LoadingPerson;
