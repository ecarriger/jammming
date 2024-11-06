import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Auth from './components/Auth';

import Spotify from './utilities/Spotify';
import { checkTokenExpired } from './utilities/utils';
import mockTracks from './utilities/mockTracks';

function App() {
  //Initialize states for result list and playlist tracks

  const [resultTracks, setResultTracks] = useState(mockTracks.tracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(new Date());
  const [auth, setAuth] = useState(false);

  //Clear token and expiration when auth set to false
  useEffect(() => {
    if(!auth) {
      setAccessToken('');
      setAccessTokenExpiration(new Date());
    }

  }, [auth])

  //
  const accessTokenSet = accessToken.length > 0;
  const accessTokenInUrl = Spotify.auth.checkUrlForAccessToken();
  const tokenExpired = checkTokenExpired(accessTokenExpiration);
  // If access token is not set, but can be found in url

  if(!accessTokenSet && accessTokenInUrl && !tokenExpired) {
      setAccessToken(Spotify.auth.extractAccessToken);
      setAccessTokenExpiration(Spotify.auth.extractExpiration());
      setAuth(true);
  }


  //Redirect to Spotify to grant permission to app
  const handleAuthSubmit = (event) => {
    event.preventDefault();
    Spotify.auth.requestAccessToken();
  };

  //Send search request to Spotify
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('search-bar');    

    const spotifyResults = await Spotify.getTracks(query, accessToken);
    setResultTracks(spotifyResults.tracks.items);
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
      <h1>Jammming</h1>
      {!auth && <Auth handleAuthSubmit={handleAuthSubmit} />}
      {auth && <SearchBar handleSearchSubmit={handleSearchSubmit} />}
      {auth && <SearchResults tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} />}
      {auth && <Playlist 
        playlistTracks={playlistTracks} 
        setPlaylistTracks={setPlaylistTracks} 
        handleTrackClick={handleClickRemoveTrack} 
        accessToken={accessToken}
        setAuth={setAuth}
        accessTokenExpiration={accessTokenExpiration}
      />}
    </section>
  )
}

export default App;
