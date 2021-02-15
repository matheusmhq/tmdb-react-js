import React, { useState } from "react";
import { Button, Form, Navbar, Nav, FormControl } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/img/logo.png";

function MainNavBar({ ...props }) {
  const { history, query, handler_current_page } = props;
  const location = useLocation();

  const [word, setWord] = useState(query != undefined ? query : "");
  const [isPageSearch, setIsPageSearch] = useState(
    location.pathname.includes("search")
  );

  function GoToSearch(word) {
    if (isPageSearch) {
      history.replace({
        pathname: `/search/${word}`,
      });
      handler_current_page(1);
      return false;
    }

    history.push({ pathname: `/search/${word}` });
  }

  function VerifyActualPage(page) {
    //Veriry discover
    if (page == "/") {
      var locationSplit = location.pathname.split("/");
      if (locationSplit[1] == "") return "active-page";
      else return "disabled-page";
    }

    //Verify others page
    if (location.pathname.includes(page)) return "active-page";
    else return "disabled-page";
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
            <Nav.Link className={`${VerifyActualPage("/")}`} href="/">
              Descubra
            </Nav.Link>
            <Nav.Link
              className={`${VerifyActualPage("movies")}`}
              href="/movies"
            >
              Filmes
            </Nav.Link>
            <Nav.Link className={`${VerifyActualPage("tvs")}`} href="/tvs">
              Séries
            </Nav.Link>
            <Nav.Link
              className={`${VerifyActualPage("persons")}`}
              href="/persons"
            >
              Pessoas
            </Nav.Link>
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
              placeholder="Filmes ou Séries"
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
