import React from "react";
import Spotify from '../utilities/Spotify';

const Auth = () => { 
  
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