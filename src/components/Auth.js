import React, { useEffect } from "react";
import { requestAccessToken, checkUrlForAccessToken, extractAccessToken, extractExpiration, extractState } from '../utilities/Spotify';

const Auth = ({auth, setAuth, accessToken, setAccessToken, setAccessTokenExpiration}) => { 
  //Clear token and expiration when auth set to false
  useEffect(() => {
    if(!auth) {
      setAccessToken('');
      setAccessTokenExpiration(new Date());
    }

  }, [auth, setAccessToken, setAccessTokenExpiration]);
  //Authorize app if access token present and not expired
  useEffect(() => {
    const accessTokenInUrl = checkUrlForAccessToken();
    if(!accessToken && accessTokenInUrl) {
      const stateMatches = sessionStorage.getItem('state') === extractState();
      if(stateMatches) {
        setAccessToken(extractAccessToken());
        setAccessTokenExpiration(extractExpiration());
        setAuth(true);
      }
    }
  });
  
  //Redirect to Spotify to grant permission to app
  const handleAuthSubmit = (event) => {
    event.preventDefault();
    requestAccessToken();
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      <input type="submit" value="Authorize Spotify" />
    </form>  
  );
};

export default Auth