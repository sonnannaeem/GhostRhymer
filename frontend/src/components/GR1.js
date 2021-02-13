import React from "react";
import { DatePicker, Row, Col, Button } from "antd";
import "antd/dist/antd.css";

export default function GR1() {
  return (
    <Row justify="center">
      <Col span={8}>
        <DatePicker />
        <Button>PHAT</Button>
      </Col>
      <Col span={8}>
        <DatePicker></DatePicker>
        <Button>Bitch</Button>
      </Col>
      <Col span={8}>
        <DatePicker></DatePicker>
        <Button>Yo</Button>
      </Col>
    </Row>
  );
}
