import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingCard from "../../components/Loading/LoadingCard";
import MainPagination from "../../components/MainPagination/MainPagination";
import MainCard from "../../components/MainCard/MainCard";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import ChooserType from "../../components/ChooserType/ChooserType";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

function Tvs({ history }) {
  const listScroll = useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [type, setType] = useState("movie");
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    function LoadTvs() {
      scrollToRefObject(listScroll);
      setLoading(true);
      api
        .get(`/tv/${type == "movie" ? "popular" : "top_rated"}`, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("LoadTvs success");
            console.log(response.data);

            setListMovie(response.data.results);
            setLastPage(response.data.total_pages);
            setTotalResults(response.data.total_results);
          }
        })
        .catch((error) => {
          console.log("LoadTvs error " + error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }

    LoadTvs();
  }, [type, currentPage]);

  return (
    <div ref={listScroll}>
      <MainNavBar history={history} />

      <Container fluid>
        <ChooserType
          screen="tvs"
          handler_current_page={setCurrentPage}
          handler_type={setType}
          type={type}
        />

        <div className="mt-5 d-flex flex-wrap">
          {loading && <LoadingCard qty={8} />}
          {!loading && (
            <MainCard type={"tv"} list_movie={listMovie} history={history} />
          )}
        </div>

        <MainPagination
          handler_current_page={setCurrentPage}
          current_page={currentPage}
          total_results={totalResults}
          last_page={lastPage}
          loading={loading}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default Tvs;
