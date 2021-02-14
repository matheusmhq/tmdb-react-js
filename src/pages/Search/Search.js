import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingCard from "../../components/Loading/LoadingCard";
import MainPagination from "../../components/MainPagination/MainPagination";
import MainCard from "../../components/MainCard/MainCard";
import api from "../../services/api";
import ChooserType from "../../components/ChooserType/ChooserType";
import Footer from "../../components/Footer/Footer";

function Search({ history, ...props }) {
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
    if (match.params.query == undefined) history.push({ pathname: "/" });
  }, []);

  useEffect(() => {
    function LoadMovies() {
      scrollToRefObject(listScroll);
      setLoading(true);
      api
        .get(`/search/${type}`, {
          params: {
            page: currentPage,
            query: match.params.query,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("LoadMovies success");
            console.log(response.data);

            setListMovie(response.data.results);
            setLastPage(response.data.total_pages);
            setTotalResults(response.data.total_results);
          }
        })
        .catch((error) => {
          console.log("LoadMovies error " + error);
        })
        .finally(() => setLoading(false));
    }

    LoadMovies();
  }, [type, currentPage, match]);

  return (
    <div ref={listScroll}>
      <MainNavBar
        history={history}
        query={match.params.query}
        handler_current_page={setCurrentPage}
      />

      <Container>
        <ChooserType
          screen="search"
          handler_current_page={setCurrentPage}
          handler_type={setType}
          type={type}
        />

        <div className="mt-5 d-flex flex-wrap">
          {loading && <LoadingCard qtd={8} />}

          {!loading && listMovie.length == 0 && (
            <div className="container-empty">
              <p>
                Não foram encontrados resultados que correspondam aos seus
                critérios de busca.
              </p>
            </div>
          )}
          {!loading && <MainCard list_movie={listMovie} history={history} />}
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

export default Search;
