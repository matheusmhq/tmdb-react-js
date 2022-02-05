import React, { useState } from "react";
import { Button, Form, Navbar, Nav, FormControl } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/img/logo.png";

function MainNavBar({ ...props }) {
  const { history, query, handler_current_page } = props;
  const location = useLocation();

  const [word, setWord] = useState(query ? query : "");
  const isPageSearch = location.pathname.includes("search");

  function GoToSearch(word) {
    if (word == "") return false;
    if (isPageSearch) {
      history.replace({
        pathname: `/search/${word}`,
      });
      handler_current_page(1);
      return false;
    }

    history.push({ pathname: `/search/${word}` });
  }

  return (
    <div
      className={`container-header ${
        location.pathname.includes("details") ? "" : "mb-4"
      } `}
    >
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img title="Tmdb" alt="Tmdb" className="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              exact
              to="/"
            >
              Descubra
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/movies"
            >
              Filmes
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/tvs"
            >
              Séries
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/persons"
            >
              Pessoas
            </NavLink>
          </Nav>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              GoToSearch(word);
            }}
          >
            <FormControl
              type="text"
              placeholder="Filme, Série ou Pessoa..."
              className="mr-sm-2"
              onChange={(e) => {
                setWord(e.currentTarget.value);
              }}
              value={word}
            />
            <Button
              disabled={word == "" ? true : false}
              className="button-primary btn-search"
              onClick={() => GoToSearch(word)}
            >
              Pesquisar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavBar;
