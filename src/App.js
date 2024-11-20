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

  //App JSX to render
  return (
    <section>
      <h1>Jammming</h1>
      {!auth && <Auth auth={auth} setAuth={setAuth} />}
      {auth && <SearchBar setResultTracks={setResultTracks} setAuth={setAuth} />}
      {auth && <SearchResults resultTracks={resultTracks} setPlaylistTracks={setPlaylistTracks} />}
      {auth && <Playlist 
        playlistTracks={playlistTracks} 
        setPlaylistTracks={setPlaylistTracks} 
        setAuth={setAuth}
      />}
    </section>
  )
}

export default App;
