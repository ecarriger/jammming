import React from "react";

const Auth = ({handleAuthSubmit}) => { 
    return (
      <form onSubmit={handleAuthSubmit}>
        <input type="submit" value="Authorize Spotify" />
      </form>  
    );
};

export default Auth