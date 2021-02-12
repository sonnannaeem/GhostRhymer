import React from "react";
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { Layout } from 'antd';


export default function GR1() {

  const { TextArea } = Input;
  const { Header, Footer, Sider, Content } = Layout;


  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider><TextArea rows={4}/></Sider>
        <Content>Content</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
