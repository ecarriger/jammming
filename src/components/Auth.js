import React, { useEffect } from "react";
import Spotify from '../utilities/Spotify';

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
    const accessTokenInUrl = Spotify.auth.checkUrlForAccessToken();
    if(!accessToken && accessTokenInUrl) {
      const stateMatches = sessionStorage.getItem('state') === Spotify.auth.extractState();
      if(stateMatches) {
        setAccessToken(Spotify.auth.extractAccessToken());
        setAccessTokenExpiration(Spotify.auth.extractExpiration());
        setAuth(true);
      }
    }
  });
  
  //Redirect to Spotify to grant permission to app
  const handleAuthSubmit = (event) => {
    event.preventDefault();
    Spotify.auth.requestAccessToken();
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      <input type="submit" value="Authorize Spotify" />
    </form>  
  );
};

export default Auth