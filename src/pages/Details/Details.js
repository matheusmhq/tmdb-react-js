import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingDetails from "../../components/Loading/LoadingDetails";
import CardCast from "../../components/Others/CardCast";
import MainCard from "../../components/MainCard/MainCard";
import Social from "../../components/Others/Social";
import Trailer from "../../components/Modals/Trailer";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import {
  GetImage,
  ConvertRuntime,
  HexToRgbA,
  FormatterDollar,
  StatusMovieToBr,
  StatusTvToBr,
  TypeTvToBr,
  GetColorRating,
} from "../../functions/utils";
import placeholder from "../../assets/img/placeholder.jpg";
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
  const [showCast, setShowCast] = useState(false);

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
            append_to_response:
              "videos,external_ids,recommendations,keywords,credits",
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

  function RenderYear() {
    if (type == "movie") {
      if (details.release_date != undefined) {
        return <span>({moment(details.release_date).format("YYYY")})</span>;
      }
    } else {
      if (details.first_air_date != undefined) {
        return <span>({moment(details.first_air_date).format("YYYY")})</span>;
      }
    }
  }

  function RenderDate() {
    if (type == "movie") {
      if (details.release_date != undefined) {
        return (
          <p className="details-date">
            {moment(details.release_date).format("LL")}
          </p>
        );
      }
    } else {
      if (details.first_air_date != undefined) {
        return (
          <p className="details-date">
            {moment(details.first_air_date).format("LL")}
          </p>
        );
      }
    }
  }

  function RenderInfoMovie() {
    return (
      <>
        {details.original_title != "" && (
          <div className="info-item">
            <h3>Título original</h3>
            <p>{details.original_title}</p>
          </div>
        )}

        {details.status != "" && (
          <div className="info-item">
            <h3>Situação</h3>
            <p>{StatusMovieToBr(details.status)}</p>
          </div>
        )}

        {details.budget > 0 && (
          <div className="info-item">
            <h3>Orçamento</h3>
            <p>{FormatterDollar(details.budget)}</p>
          </div>
        )}

        {details.revenue > 0 && (
          <div className="info-item">
            <h3>Receita</h3>
            <p>{FormatterDollar(details.revenue)}</p>
          </div>
        )}

        {details.keywords.keywords.length > 0 && (
          <div className="info-item">
            <h3>Palavras-chave</h3>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              {details.keywords.keywords.map((item) => {
                return (
                  <p key={item.id} className="keyword-tag">
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  function RenderInfoTv() {
    return (
      <>
        {details.status != "" && (
          <div className="info-item">
            <h3>Situação</h3>
            <p>{StatusTvToBr(details.status)}</p>
          </div>
        )}

        {details.networks.length > 0 && (
          <div className="info-item">
            <h3>Emissora</h3>
            <img
              title={details.networks[0].name}
              alt={details.networks[0].name}
              src={GetImage("h30", details.networks[0].logo_path)}
            />
          </div>
        )}

        {details.type != "" && (
          <div className="info-item">
            <h3>Tipo</h3>
            <p>{TypeTvToBr(details.type)}</p>
          </div>
        )}

        {details.keywords.results.length > 0 && (
          <div className="info-item">
            <h3>Palavras-chave</h3>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              {details.keywords.results.map((item) => {
                return (
                  <p key={item.id} className="keyword-tag">
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
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
        <>
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
                        : placeholder
                    }
                  />
                  <div className="container-rating" style={{ left: 30 }}>
                    <CircularProgressbar
                      strokeWidth={7}
                      styles={buildStyles({
                        textSize: "28px",
                        pathColor: GetColorRating(details.vote_average),
                        textColor: "white",
                        trailColor: HexToRgbA(
                          GetColorRating(details.vote_average),
                          0.3
                        ),
                        backgroundColor: "black",
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
                    {RenderYear()}
                  </h1>
                  <div className="d-flex flex-column flex-md-row">
                    {RenderDate()}
                    <div className=" d-flex justify-content-center align-items-center container-gender">
                      <p>{GetGenres(details.genres)}</p>
                    </div>
                    <p className="details-runtime">
                      {type == "movie" && ConvertRuntime(details.runtime)}
                      {type == "tv" &&
                        details.episode_run_time.length > 0 &&
                        ConvertRuntime(details.episode_run_time[0])}
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
                      {details.overview != ""
                        ? details.overview
                        : "Indisponível"}
                    </p>
                  </div>
                </div>
              </Col>
            </div>
          </div>

          <Container className="mt-4 p-0" fluid>
            <div className="d-flex flex-wrap">
              <Col xs={12} md={8} lg={8} className="">
                <div className="panel">
                  <h3 className="mb-4 text-center text-md-left">
                    Elenco principal
                  </h3>
                  <div className="d-flex flex-wrap">
                    <CardCast
                      list_cast={details.credits.cast.slice(
                        0,
                        showCast == true ? 999 : 8
                      )}
                    />
                  </div>
                  {details.credits.cast.length > 8 && (
                    <div className="text-center">
                      <button
                        className="btn-show-cast btn-lg"
                        onClick={() => setShowCast(!showCast)}
                      >
                        ver {showCast == true ? "menos" : "mais"}
                      </button>
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={12} md={4} lg={4}>
                <div className="info text-center text-md-left">
                  <Social
                    social={details.external_ids}
                    homepage={details.homepage}
                  />
                  {type == "movie" && RenderInfoMovie()}
                  {type == "tv" && RenderInfoTv()}
                </div>
              </Col>
            </div>

            {details.recommendations.results.length > 0 && (
              <div className="d-flex flex-wrap mt-4">
                <h3 className="w-100 mb-4 text-center text-md-left">
                  Recomendações
                </h3>
                <MainCard
                  list_movie={details.recommendations.results.slice(0, 8)}
                />
              </div>
            )}
          </Container>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Details;
