import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { fetchTokens, fetchUserInfo } from '../apis/cognito';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const [ token, setTokenObj ] = useState({});
  const [ userObject, setUserObj ] = useState({});

  const query = useQuery();
  const code = query.get("code");

  useEffect (() => {

    fetchTokens(code)
      .then((tokenObject) => {
        setTokenObj(tokenObject);
        return fetchUserInfo(tokenObject.access_token);
      })
      .then((userInfo) => {
        setUserObj(userInfo);
      })
      .catch((error) => console.log(error));
  }, [code]);

  return (
    <div className="text-center">
      <a href="https://infomed1.auth.us-east-2.amazoncognito.com/login?client_id=133b172mr6hvdr48eg0mb2uirh&response_type=code&scope=email+openid&redirect_uri=http://localhost:5004/login" 
        className="btn btn-success btn-lg mr-3" role="button">
          Login
      </a>
      <a href="https://infomed1.auth.us-east-2.amazoncognito.com/logout?response_type=code&client_id=133b172mr6hvdr48eg0mb2uirh&redirect_uri=http://localhost:5004/login&scope=email+openid" 
        className="btn btn-danger btn-lg ml-3" role="button">
          Logout
      </a>
    </div>
  )
}