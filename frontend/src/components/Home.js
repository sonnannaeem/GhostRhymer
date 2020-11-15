import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [text, setText] = useState("NOT CLICKED");

  const handleClick1 = () => {
    console.log("HOME#HANDLECLICK1");
    setText('NUMBER 1');
  };

  const handleClick2 = () => {
    console.log("HOME#HANDLECLICK2");
    setText('NUMBER 2');
  };

  useEffect(() => {

  });

  return (
    <div>
    <h2>{text}</h2>
      <Navbar bg="primary" variant="dark">
        <Nav>
          <NavItem onClick={() => handleClick1()}>Click1</NavItem>
          <NavItem onClick={() => handleClick2()}>Click2</NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
