import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingCard from "../../components/Loading/LoadingCard";
import MainPagination from "../../components/MainPagination/MainPagination";
import MainCard from "../../components/MainCard/MainCard";
import api from "../../services/api";
import ChooserType from "../../components/ChooserType/ChooserType";
import Footer from "../../components/Footer/Footer";

function Persons({ history, ...props }) {
  const { match } = props;
  const listScroll = useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [loading, setLoading] = useState(false);
  const [listMovie, setListMovie] = useState([]);
  const [type, setType] = useState("movie");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    function LoadPersons() {
      scrollToRefObject(listScroll);
      setLoading(true);
      api
        .get(`/person/popular`, {
          params: {
            page: currentPage,
            query: match.params.query,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setListMovie(response.data.results);
            setLastPage(response.data.total_pages);
            setTotalResults(response.data.total_results);
          }
        })
        .catch((error) => {
          console.log("LoadPersons error " + error);
        })
        .finally(() => setLoading(false));
    }

    LoadPersons();
  }, [type, currentPage, match]);

  return (
    <div ref={listScroll}>
      <MainNavBar
        history={history}
        query={match.params.query}
        handler_current_page={setCurrentPage}
      />

      <Container fluid>
        <ChooserType
          screen="person"
          handler_current_page={setCurrentPage}
          handler_type={setType}
          type={type}
        />

        <div className="mt-5 d-flex flex-wrap">
          {loading && <LoadingCard qty={8} />}

          {!loading && listMovie.length == 0 && (
            <div className="container-empty">
              <p>
                Não foram encontrados resultados que correspondam aos seus
                critérios de busca.
              </p>
            </div>
          )}
          {!loading && <MainCard type={"person"} list_movie={listMovie} />}
        </div>

        {listMovie.length > 0 && (
          <MainPagination
            handler_current_page={setCurrentPage}
            current_page={currentPage}
            total_results={totalResults}
            last_page={lastPage}
            loading={loading}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Persons;
