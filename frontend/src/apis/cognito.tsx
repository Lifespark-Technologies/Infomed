export const fetchTokens = (code: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_id", "133b172mr6hvdr48eg0mb2uirh");
    urlencoded.append("code", code);
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

export const fetchUserInfo = (access_token: any) => {
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