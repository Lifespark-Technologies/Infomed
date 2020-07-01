import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const [, setTokenObj ] = useState({});
  const [, setUserObj ] = useState({});

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
      <Button 
        className="mt-3" 
        type="submit" 
      >
        <a href="https://infomed1.auth.us-east-2.amazoncognito.com/login?client_id=133b172mr6hvdr48eg0mb2uirh&response_type=code&scope=email+openid&redirect_uri=http://localhost:5004/login">
          Login
        </a>
      </Button>
      <Button 
        className="mt-3 ml-3" 
        type="submit" 
      >
        <a href="https://infomed1.auth.us-east-2.amazoncognito.com/logout?response_type=code&client_id=133b172mr6hvdr48eg0mb2uirh&redirect_uri=http://localhost:5004/login&scope=email+openid">
          Logout
        </a>
      </Button>
    </div>
  )
}