import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
  faImdb,
} from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

function Social({ ...props }) {
  const { facebook_id, instagram_id, twitter_id, imdb_id } = props.social;
  const { homepage } = props;

  function RenderTooltip(text) {
    return <Tooltip id="tooltip-top">Visitar {text}</Tooltip>;
  }

  return (
    <div className="social">
      {facebook_id && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Facebook")}
        >
          <a target="_blank" href={`https://www.facebook.com/${facebook_id}`}>
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
        </OverlayTrigger>
      )}

      {instagram_id && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Instagram")}
        >
          <a target="_blank" href={`https://www.instagram.com/${instagram_id}`}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </OverlayTrigger>
      )}

      {twitter_id && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Twitter")}
        >
          <a target="_blank" href={`https://www.twitter.com/${twitter_id}`}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </OverlayTrigger>
      )}

      {imdb_id && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("IMDB")}
        >
          <a target="_blank" href={`https://www.imdb.com/title/${imdb_id}`}>
            <FontAwesomeIcon icon={faImdb} />
          </a>
        </OverlayTrigger>
      )}

      {homepage && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("página inicial")}
        >
          <a target="_blank" href={homepage}>
            <FontAwesomeIcon icon={faPlay} />
          </a>
        </OverlayTrigger>
      )}
    </div>
  );
}

export default Social;
