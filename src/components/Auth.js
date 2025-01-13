import React, { useEffect } from "react";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { generateRandomString } from "../utilities/utils";

import './Auth.module.css';

const Auth = ({auth, setAuth, accessToken, setAccessToken, setAccessTokenExpiration}) => { 
  //handle returned hash properties from Spotify
  const [ searchParams, setSearchParams ] = useSearchParams();
  if(window.location.hash) {
    const query = createSearchParams(window.location.hash.slice(1)); //slice off # from hash string
    window.location.search = query.toString();
  }
  //Clear token and expiration when auth set to false
  useEffect(() => {
    if(!auth) {
      setAccessToken('');
      setAccessTokenExpiration(new Date());
    }

  }, [auth, setAccessToken, setAccessTokenExpiration]);
  //Authorize app if access token present and not expired
  useEffect(() => {
    const accessTokenInUrl = searchParams.has('access_token');
    if(!accessToken && accessTokenInUrl) {
      const stateMatches = sessionStorage.getItem('state') === searchParams.get('state');
      if(stateMatches) {
        debugger;
        setAccessToken(searchParams.get('access_token'));
        const expirationMinutes = searchParams.get('expires_in') / 60;
        const expirationDate = new Date();
        console.log(`New date: ${expirationDate}`);
        console.log(`New date minutes: ${expirationDate.getMinutes()}`);
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
        console.log(`Modified date: ${expirationDate}`);
        setAccessTokenExpiration(expirationDate);
        setSearchParams({});
        setAuth(true);
      }
    }
  });
  
  //Redirect to Spotify to grant permission to app
  const handleAuthSubmit = (event) => {
    event.preventDefault();
    
    //configurations for navigation to spotify authorization
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const state = generateRandomString(16);
    sessionStorage.setItem('state', state);
    const query = createSearchParams({
      'response_type': 'token',
      'client_id': process.env.REACT_APP_API_CLIENT_ID,
      'redirect_uri': process.env.REACT_APP_APP_ROOT,
      'show_dialog': true,
      'scope': 'playlist-modify-private',
      'state': state
    });

    //build full url with search
    const navTarget = new URL(baseUrl);
    navTarget.search = query.toString();

    //execute navigation
    window.location.href = navTarget;
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      <input className="inter-bold" type="submit" value="Connect to Spotify" />
    </form>  
  );
};

export default Auth