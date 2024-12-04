import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Auth from './components/Auth';

function App() {
  //Initialize states for result list and playlist tracks

  const [resultTracks, setResultTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [auth, setAuth] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(new Date());


  //App JSX to render
  return (
    <section>
      <h1>Jammming</h1>
      {!auth && <Auth 
        auth={auth} 
        setAuth={setAuth} 
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setAccessTokenExpiration={setAccessTokenExpiration}
      />}
      {auth && <SearchBar 
        setResultTracks={setResultTracks} 
        setAuth={setAuth} 
        accessToken={accessToken}
        accessTokenExpiration={accessTokenExpiration}
      />}
      {auth && <SearchResults resultTracks={resultTracks} setPlaylistTracks={setPlaylistTracks} />}
      {auth && <Playlist 
        playlistTracks={playlistTracks} 
        setPlaylistTracks={setPlaylistTracks} 
        auth={auth}
        setAuth={setAuth}
        accessToken={accessToken}
      />}
    </section>
  )
}

export default App;
