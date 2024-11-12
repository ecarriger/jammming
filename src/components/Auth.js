import React, { useEffect } from "react";
import Spotify from '../utilities/Spotify';

const Auth = ({ auth, setAuth }) => { 

  //Clear token and expiration when auth set to false
  useEffect(() => {
    if(!auth) {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('accessTokenExpiration', new Date());
    }

  }, [auth]);
  //Authorize app if access token presant and not expired
  useEffect(() => {
    const accessTokenSet = localStorage.getItem('accessToken');
    const accessTokenInUrl = Spotify.auth.checkUrlForAccessToken();
    if(!accessTokenSet && accessTokenInUrl) {
      const stateMatches = localStorage.getItem('state') === Spotify.auth.extractState();
      if(stateMatches) {
        localStorage.setItem('accessToken', Spotify.auth.extractAccessToken());
        localStorage.setItem('accessTokenExpiration', Spotify.auth.extractExpiration());
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