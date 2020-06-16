import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import TabContainer from 'react-bootstrap/TabContainer';
import Login from './Login';
import Registration from './Registration';
import style from './LoginAndRegistration.module.css';



export default () => {

  return (
    <div className="text-center">
      <div className={`${style.topDiv} border border-top-0 rounded-top`}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="ml-1 mr-1">
            <Nav variant="pills" className="w-100">
              <Nav.Item className="w-50">
                <Nav.Link eventKey="first">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-50">
                <Nav.Link eventKey="second">Registration</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <div className="text-center mx-auto my-auto">
              <Tab.Content className="w-100">
                <Tab.Pane eventKey="first" className="mt-5">
                  <Login />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="mt-3">
                  <Registration />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Row>
        </Tab.Container>
      </div>
    </div>
  )
}