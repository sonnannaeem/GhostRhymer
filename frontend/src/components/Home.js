import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

export default function Home() {

  const handleClick = () => {
    console.log("HANDLECLICK WORKS");
  }

  return (
    <div>
      <h1 className="page-header">GhostRhymer</h1>
      <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => handleClick()}>Rhymes</Nav.Link>
            <Nav.Link onClick={() => handleClick()}>Synonyms</Nav.Link>
          </Nav>
      </Navbar>
    </div>
  );
}
