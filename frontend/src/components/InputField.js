import React from "react"
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { Input } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

function InputField() {

  const LeftContent = (
    <React.Fragment>
      <Row>
        <Col xl={8} className="">
          <TextArea rows={16} /> 
        </Col>
      </Row>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Container fluid className="">
        <Row className="">
          <Col lg={5}>{LeftContent}</Col>
        </Row>
      </Container>
    </React.Fragment>

  )
}

export default InputField