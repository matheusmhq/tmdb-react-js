import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import "./styles.css";

function Trailer({ ...props }) {
  const { trailer_id, handler_show_trailer, show_trailer } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [show_trailer]);

  return (
    <Modal
      show={show_trailer}
      onHide={() => handler_show_trailer(false)}
      keyboard={false}
      size={"xl"}
      centered
    >
      <Modal.Header closeButton={() => handler_show_trailer(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Reproduzir trailer
        </Modal.Title>
      </Modal.Header>
      {loading && <Skeleton className="mb-3 p-5" height={500} />}
      <iframe
        style={{ border: "none", display: loading ? "none" : "block" }}
        onLoad={() => setLoading(false)}
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${trailer_id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Modal>
  );
}

export default Trailer;
