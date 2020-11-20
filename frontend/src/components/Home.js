import React, { useState } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Axios from "axios";

export default function Home() {
  const [showSignUp, setShow] = useState(false); //use sign up
  const [showLogin, setShow2] = useState(false); //used for login
  const [userText, setUserText] = useState("");
  const [rhymesText, setRhymesText] = useState(
    "My money was thinner than Sean Paul's goatee hair now Jean Paul Gaultier cologne fill the air \n-Kanye West"
  ); //used for rhymes display

  //calls the backend for rhymes and displays them
  const handleClick = () => {
    let lastWordTyped = userText;
    Axios({
      method: "POST",
      url: "http://localhost:5000/api/rhymes/get-rhymes",
      data: {
        rhyme: `${lastWordTyped}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let rhymesData = res.data;
        let rhymesString = "";

        for (var i in rhymesData) {
          if (i == rhymesData.length - 1) {
            rhymesString += `${rhymesData[i].word}`;
          } else {
            rhymesString += `${rhymesData[i].word}, `;
          }
        }

        setRhymesText(rhymesString);
      })
      .catch((err) => console.log(err));
  };

  //Used for Signup Dialog
  const handleCloseSignUp = () => setShow(false);
  const handleShowSignUp = () => setShow(true); //used for signup

  //Used for Login Dialog
  const handleCloseLogin = () => setShow2(false); //used for login
  const handleShowLogin = () => setShow2(true);

  return (
    <div>
      <div className="user-action">
        <Button id="user" variant="primary" onClick={handleShowLogin}>
          Login
        </Button>
        <Button id="user" variant="primary" onClick={handleShowSignUp}>
          Sign Up
        </Button>
      </div>
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button id="user" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button id="user" type="submit">
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="container-name">
        <h1 className="app-name">Ghost Rhymer</h1>
      </div>

      <Navbar className="navbar" expand="lg">
        <Nav className="m-auto">
          <Nav.Link id="nav-link" onClick={() => handleClick()}>
            Rhyming words
          </Nav.Link>
          <Nav.Link id="nav-link" onClick={() => handleClick()}>
            Synonymous words
          </Nav.Link>
          <Nav.Link id="nav-link" onClick={() => handleClick()}>
            Related words
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="button-container">
        <div className="left-div">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Enter word</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              id="userTextBox"
              as="textarea"
              aria-label="With textarea"
              onChange={(e) => setUserText(e.target.value)}
            />
          </InputGroup>
          <div className="submit-button">
            <Button id="submit" onClick={handleClick}>
              Find Rhymes {/*tick so it can be dynamic with selection */}
            </Button>
          </div>
        </div>
        <div className="right-div">
          <text id="quote">{rhymesText}</text>
        </div>
      </div>
    </div>
  );
}
