import React, { useEffect } from "react";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { generateRandomString } from "../utilities/utils";

const Auth = ({auth, setAuth, accessToken, setAccessToken, setAccessTokenExpiration}) => { 
  //handle returned hash properties from Spotify
  const [ searchParams ] = useSearchParams();
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
        setAccessToken(searchParams.get('access_token'));
        const expirationMinutes = searchParams.get('expires_in');
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes + expirationMinutes);
        setAccessTokenExpiration(expirationDate);
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
      <input type="submit" value="Authorize Spotify" />
    </form>  
  );
};

export default Auth