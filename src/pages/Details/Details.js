import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingDetails from "../../components/Loading/LoadingDetails";
import MainCard from "../../components/MainCard/MainCard";
import Trailer from "../../components/Modals/Trailer";
import api from "../../services/api";
import { GetImage, ConvertRuntime, HexToRgbA } from "../../functions/utils";
import placeholder_image from "../../assets/img/placeholder_image.jpg";
import Colors from "../../styles/Colors";

import "./styles.css";

function Details({ history, ...props }) {
  const { match } = props;

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(match.params.id);
  const [type, setType] = useState(match.params.type);
  const [details, setDetails] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState("");

  useEffect(() => {
    if (match.params.id == undefined || match.params.type == undefined) {
      history.push({ pathname: "/" });
    }
  }, []);

  useEffect(() => {
    function LoadDetails() {
      api
        .get(`/${type}/${id}`, {
          params: {
            append_to_response: "videos",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("LoadDetails success");
            console.log(response.data);
            setDetails(response.data);

            if (response.data.videos?.results.length > 0) {
              setTrailerId(response.data.videos.results[0].key);
            }
          }
        })
        .catch((error) => {
          console.log("LoadDetails error " + error);
        })
        .finally(() => setLoading(false));
    }

    LoadDetails();
  }, []);

  function GetGenres(genres) {
    if (genres == null || genres == undefined) return false;
    var list = "";
    genres.map((item, index) => {
      list += `${item.name}${index != genres.length - 1 ? "," : ""} `;
    });
    return list;
  }

  return (
    <div>
      <MainNavBar history={history} />
      <Trailer
        trailer_id={trailerId}
        handler_show_trailer={setShowTrailer}
        show_trailer={showTrailer}
      />

      {loading && <LoadingDetails />}

      {!loading && (
        <div
          className="image-bg-top d-flex flex-wrap justify-content-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6.27%, 5.49%, 5.49%, 1.00) 150px, rgba(6.27%, 5.49%, 5.49%, 0.84) 100%), url(${GetImage(
              "original",
              details.backdrop_path
            )})`,
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: 440,
          }}
        >
          <div
            className="d-flex flex-wrap py-4"
            style={{ width: "100%", maxWidth: 1144 }}
          >
            <Col xs={12} md={4}>
              <div className="details-left text-center">
                <img
                  className="img-fluid"
                  src={
                    details.poster_path != null
                      ? GetImage("w500", details.poster_path)
                      : placeholder_image
                  }
                />
                <div className="container-rating" style={{ left: 30 }}>
                  <CircularProgressbar
                    strokeWidth={7}
                    styles={buildStyles({
                      textSize: "28px",
                      pathColor: Colors.brand_green,
                      textColor: "white",
                      trailColor: HexToRgbA(Colors.brand_green, 0.3),
                      backgroundColor: Colors.brand_blue,
                    })}
                    background={true}
                    backgroundPadding={true}
                    value={details.vote_average * 10}
                    text={`${details.vote_average * 10}%`}
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className="details-right text-center text-md-left">
                <h1 className="details-title my-4 my-md-0">
                  {details.title != undefined ? details.title : details.name}{" "}
                  <span>({moment(details.release_date).format("YYYY")})</span>
                </h1>
                <div className="d-flex flex-column flex-md-row">
                  <p className="details-date">
                    {moment(details.release_date).format("LL")}
                  </p>
                  <div className=" d-flex justify-content-center align-items-center container-gender">
                    <p>{GetGenres(details.genres)}</p>
                  </div>
                  <p className="details-runtime">
                    {ConvertRuntime(details.runtime)}
                  </p>
                </div>
                {trailerId != "" && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="mt-4 w-100 d-flex align-items-center justify-content-center  justify-content-md-start btn-trailer"
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    <p className="ml-2">Reproduzir trailer</p>
                  </button>
                )}

                <div className="mt-4">
                  <h2>Sinopse</h2>
                  <p>
                    {details.overview != "" ? details.overview : "Indisponível"}
                  </p>
                </div>
              </div>
            </Col>
          </div>
        </div>
      )}

      <Container></Container>
    </div>
  );
}

export default Details;
