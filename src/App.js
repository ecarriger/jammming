import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import styles from './App.module.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Auth from './components/Auth';
import Message from './components/Message';

function App() {
  //Initialize states for result list and playlist tracks
  const [fadeOutResults, setFadeOutResults] = useState(false);
  const [resultTracks, setResultTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [auth, setAuth] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(new Date());
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  
  const messageHandler = (newMessage, messageDuration = null) => {
    const fadeOutDuration = 250;
    if(!newMessage) {
      setShowMessage(false);
      setTimeout(() => {

      }, fadeOutDuration)
    }
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setTimeout(() => {
        setMessage('');
      }, fadeOutDuration);
    }, messageDuration);
  };


  //App JSX to render
  return (
    <div className={styles.app}>
      <Message 
        message={message}
        showMessage={showMessage}
      />
      <div className={styles.upperContent}>
        <header>
          <img className={styles.logo} src={logo} alt='Jammming headphones logo' />
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
            setFadeOutResults={setFadeOutResults}
            messageHandler={messageHandler}
          />}
          <div className={styles.trackListsWrapper}>
            {auth && <SearchResults 
              resultTracks={resultTracks} 
              setPlaylistTracks={setPlaylistTracks}
              fadeOutResults={fadeOutResults}
              messageHandler={messageHandler}
            />}
            {auth && <Playlist 
              playlistTracks={playlistTracks} 
              setPlaylistTracks={setPlaylistTracks} 
              auth={auth}
              setAuth={setAuth}
              accessToken={accessToken}
              accessTokenExpiration={accessTokenExpiration}
              messageHandler={messageHandler}
            />}
          </div>
        </main>
      </div>
      <footer>
          <p>Created by <a href="https://github.com/ecarriger/jammming">@ecarriger on GitHub</a></p>
          <p><a href="https://github.com/ecarriger/jammming/blob/master/PRIVACY.md" rel="noreferrer" target="_blank">Privacy Policy</a></p>
      </footer>
    </div>
  )
}

export default App;
