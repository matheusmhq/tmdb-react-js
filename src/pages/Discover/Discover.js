import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Form } from "react-bootstrap";
import Select from "react-select";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingCard from "../../components/Loading/LoadingCard";
import MainPagination from "../../components/MainPagination/MainPagination";
import { GetListYears, GetListSort } from "../../functions/utils";
import MainCard from "../../components/MainCard/MainCard";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import ChooserType from "../../components/ChooserType/ChooserType";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

function Discover({ history, ...props }) {
  const listScroll = useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [type, setType] = useState("movie");
  const [year, setYear] = useState({
    label: moment().format("YYYY"),
    value: moment().format("YYYY"),
  });
  const [sort, setSort] = useState({
    label: "Popularidade Desc",
    value: "popularity.desc",
  });
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //Select
  const [optionsYear, setOptionsYear] = useState(GetListYears);
  const [optionsSort, setOptionsSort] = useState(GetListSort);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    function LoadMovies() {
      scrollToRefObject(listScroll);
      setLoading(true);

      var obj = {
        page: currentPage,
        sort_by: sort?.value,
      };
      if (type == "movie") obj.primary_release_year = year?.value;
      else obj.first_air_date_year = year?.value;

      api
        .get(`/discover/${type}`, {
          params: obj,
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
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }

    LoadMovies();
  }, [type, year, sort, currentPage]);

  return (
    <div ref={listScroll}>
      <MainNavBar history={history} />

      <Container fluid>
        <ChooserType
          screen="discover"
          handler_current_page={setCurrentPage}
          handler_type={setType}
          type={type}
        />

        <div className="d-flex flex-wrap mt-4">
          <Col xs={12} sm={4} lg={2} className="mb-3 mb-md-0">
            <Form.Label className="field-label">Ano</Form.Label>
            <Select
              noOptionsMessage={() => "Sem opções"}
              classNamePrefix="react-select"
              placeholder={"Selecionar"}
              options={optionsYear}
              isClearable={false}
              value={year}
              onChange={(item) => {
                setCurrentPage(1);
                setYear(item);
              }}
            />
          </Col>

          <Col xs={12} sm={8} md={6} lg={3}>
            <Form.Label className="field-label">Ordenar por</Form.Label>
            <Select
              noOptionsMessage={() => "Sem opções"}
              classNamePrefix="react-select"
              placeholder={"Selecionar"}
              options={optionsSort}
              isClearable={false}
              value={sort}
              onChange={(item) => {
                setCurrentPage(1);
                setSort(item);
              }}
            />
          </Col>
        </div>

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

          {!loading && (
            <MainCard type={type} list_movie={listMovie} history={history} />
          )}
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

export default Discover;
