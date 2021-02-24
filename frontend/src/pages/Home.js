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

function getLastWord(words) {
  var n = words.split(" ");
  var lastWord = n[n.length - 1];
  console.log(`HOME#LASTWORD: ${lastWord}`);
  return lastWord;
}

export default function Home() {
  const [showSignUp, setShow] = useState(false); //used sign up
  const [showLogin, setShow2] = useState(false); //used for login

  const [firstName, setFirstName] = useState(""); //used for user's First Name
  const [lastName, setLastName] = useState(""); //used for user's Last Name
  const [email, setEmail] = useState(""); //used for user's email
  const [password, setPassword] = useState(""); //used for user's pw
  const [password2, setPassword2] = useState(""); //used for user's pw2

  const [endpoint, setEndpoint] = useState("get-rhymes"); //used for setting different features
  const [buttonText, setButtonText] = useState("Find Rhymes"); //used for changing button

  const [loginMessage, setLoginMessage] = useState("Login or Sign Up Now!"); //Used for if they're logged in
  const [isLoggedIn, setLoginFlag] = useState(false);

  const [userText, setUserText] = useState(""); //used to grab the user's input
  const [wordsText, setResultsText] = useState(
    "My money was thinner than Sean Paul's goatee hair now Jean Paul Gaultier cologne fill the air \n-Kanye West"
  ); //used for rhymes display

  //Resets the state of user info variables
  const resetHooks = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setLoginMessage("Login or Sign Up Now!");
    setLoginFlag(false);
  };

  //calls backend for login
  const handleLogin = () => {
    Axios({
      method: "POST",
      url: `http://localhost:5000/api/users/login`,
      data: {
        firstname: `${firstName}`,
        lastname: `${lastName}`,
        email: `${email}`,
        password: `${password}`,
        password2: `${password2}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.error == null) {
          //Checking for any input errors
          alert("Success! You are now logged in!");
          setShow2(false); //Close login
          setLoginFlag(true);
          console.log(res.data.firstname);
          if (res.data.firstname != null) {
            setLoginMessage(`Welcome ${res.data.firstname}`); //Setting the login message now that they're logged in
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert("Server Error: " + err)); //Catching any server errors
  };

  //calls the backend for user registration
  const handleSignUp = () => {
    // console.log(`${firstName} + ${lastName} + ${email} + ${password} + ${password2}`);
    Axios({
      method: "POST",
      url: `http://localhost:5000/api/users/register`,
      data: {
        firstname: `${firstName}`,
        lastname: `${lastName}`,
        email: `${email}`,
        password: `${password}`,
        password2: `${password2}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.error == null) {
          //Checking for any input errors
          alert("Success! Now you can login!");
          setShow(false); //Close signup
          setShow2(true); //Show login
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert("Server Error: " + err)); //Catching any server errors
  };

  //calls the backend for rhymes and displays them
  const handleClick = () => {
    let lastWordTyped = getLastWord(userText);
    Axios({
      method: "POST",
      url: `http://localhost:5000/api/rhymes/${endpoint}`,
      data: {
        word: `${lastWordTyped}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let wordsData = res.data;

        if (wordsData.length < 1) {
          setResultsText("No results...Sorry!");
        } else {
          let wordsString = "";

          for (var i in wordsData) {
            if (i == wordsData.length - 1) {
              wordsString += `${wordsData[i].word}`;
            } else {
              wordsString += `${wordsData[i].word}, `;
            }
          }
          setResultsText(wordsString);
        }
      })
      .catch((err) => console.log(err));
  };

  //Used for Signup Dialog
  const handleCloseSignUp = () => {
    setShow(false);
    resetHooks();
  };
  const handleShowSignUp = () => setShow(true); //used for signup

  //Used for Login Dialog
  const handleCloseLogin = () => {
    setShow2(false);
    resetHooks();
  }; //used for login
  const handleShowLogin = () => setShow2(true);

  return (
    <div>
      <div className="user-action">
        <Button id="user" variant="primary" onClick={handleShowLogin} disabled={isLoggedIn}>
          Login
        </Button>
        <Button id="user" variant="primary" onClick={handleShowSignUp} disabled={isLoggedIn}>
          Sign Up
        </Button>
        <Button id="user" variant="primary" type="submit" onClick={resetHooks} disabled={!isLoggedIn}>
          Logout
        </Button>
      </div>
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="signupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="signupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Smith"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="signupBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="johnsmith@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="signupBasicPassword1">
              <Form.Label>Password (at least 8 characters)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="signupBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>

            <Button id="user" onClick={handleSignUp}>
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
            <Form.Group controlId="loginBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="loginBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button id="user" onClick={handleLogin}>
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
          <Nav.Link
            id="nav-link"
            onClick={() => {
              setEndpoint("get-rhymes");
              setButtonText("Find Rhymes");
            }}
          >
            Rhyming words
          </Nav.Link>
          <Nav.Link
            id="nav-link"
            onClick={() => {
              setEndpoint("get-syn");
              setButtonText("Find Synonymous");
            }}
          >
            Synonymous words
          </Nav.Link>
          <Nav.Link
            id="nav-link"
            onClick={() => {
              setEndpoint("get-related");
              setButtonText("Find Related");
            }}
          >
            Related words
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="button-container">
        <div className="left-div">
          <h1 style={{color: "white"}}>{loginMessage}</h1>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Enter verse</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              id="userTextBox"
              as="textarea"
              aria-label="With textarea"
              disabled={!isLoggedIn}
              onChange={(e) => setUserText(e.target.value)}
            />
          </InputGroup>
          <div className="submit-button">
            <Button id="submit" onClick={handleClick} disabled={!isLoggedIn}>
              {buttonText} {/*tick so it can be dynamic with selection */}
            </Button>
          </div>
        </div>
        <div className="right-div">
          <text id="quote">{wordsText}</text>
        </div>
      </div>
    </div>
  );
}
