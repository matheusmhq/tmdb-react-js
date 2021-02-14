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

function Discover({ history }) {
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
      api
        .get(`/discover/${type}`, {
          params: {
            page: currentPage,
            primary_release_year: year?.value,
            sort_by: sort?.value,
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

      <Container>
        <ChooserType
          screen="discover"
          handler_current_page={setCurrentPage}
          handler_type={setType}
          type={type}
        />

        <div className="d-flex flex-wrap">
          <Col xs={12} md={4} lg={2} className="mb-3 mb-md-0">
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

          <Col xs={12} md={4} lg={3}>
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
          {loading && <LoadingCard qtd={8} />}
          {!loading && <MainCard list_movie={listMovie} history={history} />}
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

export default Discover;
