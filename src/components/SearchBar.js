import React, { useState } from 'react';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';

import styles from './SearchBar.module.css';

const SearchBar = ({setResultTracks, setAuth, accessToken, accessTokenExpiration, setFadeOutResults, messageHandler}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = ({target}) => {
      setSearchQuery(target.value);
  };

  const queueRedirect = () => {
    setTimeout(() => {
      window.location = process.env.REACT_APP_APP_ROOT;
    }, 3000)
  };
  //Send search request to Spotify
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
  if(searchQuery.length < 3) {
    messageHandler('Search must be at least 3 charaters', 3000);
    return;
  }
  if(checkTokenExpired(accessTokenExpiration)) {
    setAuth(false);
    messageHandler('Authentication expired, redirecting...', 3000);
    queueRedirect();
    return;
  }

  const formData = new FormData(event.target);
  const query = formData.get('search-bar');    
  try {
    messageHandler('Loading...');
    setFadeOutResults(true);
    const spotifyResults = await Spotify.getTracks(query, accessToken);
    setTimeout(() => {
      setResultTracks([]);
      setResultTracks(spotifyResults.tracks.items);
      setFadeOutResults(false);
    }, 250);
    messageHandler('');
  }
  catch(e) {
    messageHandler('Connection failed, please try again.', 3000);
    return;
  }
};

  return (
      <section className={styles.searchBar}>
          <form onSubmit={handleSearchSubmit}>
              <label className='inter-bold' htmlFor="searchBar">Search for songs:</label>
              <div className={styles.inputWrapper}>
                <input 
                    type="text"
                    id='searchBar'
                    className={styles.searchBar}
                    name="search-bar" 
                    value={searchQuery} 
                    onChange={handleSearchChange}
                    placeholder="Type your search..." />
                <input className='searchSubmit inter-bold' type="submit" value="Search" />
              </div>
          </form>
      </section>
      
  );
};

export default SearchBar;