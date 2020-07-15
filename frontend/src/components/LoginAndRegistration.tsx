import React, { useEffect, useState } from 'react';
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
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const [ tokenObj, setTokenObj ] = useState({});
  const [ userObj, setUserObj ] = useState({});

  let query = useQuery();
  let code = query.get("code");

  function fetchTokens() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_id", "133b172mr6hvdr48eg0mb2uirh");
    urlencoded.append("code", `${code}`);
    urlencoded.append("redirect_uri", "http://localhost:5004/login");

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    return fetch("https://infomed1.auth.us-east-2.amazoncognito.com/oauth2/token", requestOptions)
      .then((response: any) => response.json())
  }

  function fetchUserInfo (access_token: any) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return fetch("https://infomed1.auth.us-east-2.amazoncognito.com/oauth2/userInfo", requestOptions)
      .then((response: any) => response.json())
  }

  useEffect (() => {

    fetchTokens()
      .then((tokenObject) => {
        setTokenObj(tokenObject);
        return fetchUserInfo(tokenObject.access_token);
      })
      .then((userInfo) => {
        setUserObj(userInfo);
        console.log(userInfo);
      })
      .catch((error) => console.log(error));
  }, [code]);

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