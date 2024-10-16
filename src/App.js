import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Auth from './components/Auth';

import Spotify from './utilities/Spotify';
import mockTracks from './utilities/mockTracks';

function App() {
  //Initialize states for result list and playlist tracks

  const [resultTracks, setResultTracks] = useState(mockTracks.tracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(new Date);
  useEffect(() => {
    // Check if Spotify access token is set
    if(accessTokenExpiration < new Date) {
      if(Spotify.auth.checkUrlForAccessToken()) {
          setAccessToken('');
      }
  }
  }, [App]);

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    console.log('This should redirect to Spotify to authorize');
  };

  //Add clicked track to playlist (clicked from SearchResult list)
  const handleClickAddToPlaylist = (trackIdToAdd) => {
    setPlaylistTracks(playlistTracks => [resultTracks[trackIdToAdd], ...playlistTracks]);
  };

  //Remove track from playlist
  const handleClickRemoveTrack = (trackIdToRemove) => {
    setPlaylistTracks(playlistTracks => playlistTracks.filter((track, index) => index !== trackIdToRemove ));
  }


  //App JSX to render
  return (
    <section>
      <Auth handleAuthSubmit={handleAuthSubmit} />
      <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} />
      <SearchResults tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} />
      <Playlist tracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} handleTrackClick={handleClickRemoveTrack} />
    </section>
  )
}

export default App;
