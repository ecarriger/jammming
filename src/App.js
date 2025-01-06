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
    <div>
      <header>
        <img src='/' alt='Jammming headphones logo' />
        <h1 className='galada-regular' >Jammming</h1>
        <p>Search for songs on Spotify and create a playlist</p>
      </header>
      <main>
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
        {auth && <SearchResults resultTracks={resultTracks} playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />}
        {auth && <Playlist 
          playlistTracks={playlistTracks} 
          setPlaylistTracks={setPlaylistTracks} 
          auth={auth}
          setAuth={setAuth}
          accessToken={accessToken}
          accessTokenExpiration={accessTokenExpiration}
        />}
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;
