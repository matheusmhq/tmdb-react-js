import React from "react";
import { Modal, Button } from "react-bootstrap";

function Trailer({ ...props }) {
  const { trailer_id, handler_show_trailer, show_trailer } = props;

  return (
    <Modal
      show={show_trailer}
      onHide={() => handler_show_trailer(false)}
      backdrop="static"
      keyboard={false}
      size={"xl"}
    >
      <Modal.Header closeButton={() => handler_show_trailer(false)}>
        <Modal.Title id="contained-modal-title-vcenter">Trailer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${trailer_id}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}

export default Trailer;
