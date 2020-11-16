import React, { useState } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

export default function Home() {
  const handleClick = () => {
    console.log("HANDLECLICK WORKS");
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleCloseSignUp = () => setShow(false);
  const handleShowSignUp = () => setShow(true);

  const handleCloseLogin = () => setShow2(false);
  const handleShowLogin = () => setShow2(true);

  const wordDisplayedInTextArea =
    "My money was thinner than Sean Paul's goatee hair Now Jean Paul Gaultier cologne fill the air \n -Kanye West";

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
      <Modal show={show} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleCloseLogin}>
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

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="container-header">
        <h1 className="app-name">Ghost Rhymer</h1>
      </div>

      <Navbar className="navbar" expand="lg">
        <Nav className="m-auto">
          <Nav.Link id="nav-link" onClick={() => handleClick()}>
            Rhymes
          </Nav.Link>
          <Nav.Link id="nav-link" onClick={() => handleClick()}>
            Synonyms
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="button-container">
        <div className="left-div">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Enter verse</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>
          <div className="submit-button">
            <Button id="submit" onClick={handleClick}>
              Find Rhymes {/*tick so it can be dynamic with selection */}
            </Button>
          </div>
        </div>
        <div className="right-div">
          <text id="quote">{wordDisplayedInTextArea}</text>
        </div>
      </div>
    </div>
  );
}
