import React, { useState, useEffect } from 'react';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';

import styles from './SearchBar.module.css';

const SearchBar = ({setResultTracks, setAuth, accessToken, accessTokenExpiration}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    if(message) {
      setTimeout(() => {
        setMessage('');
      }, 5000)
    }
  }, [message])

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
  setMessage('Search must be at least 3 charaters');
  return;
}
if(checkTokenExpired(accessTokenExpiration)) {
  setAuth(false);
  setMessage('Authentication expired, redirecting...');
  queueRedirect();
  return;
}

  const formData = new FormData(event.target);
  const query = formData.get('search-bar');    

  try {
    setMessage('Loading...');
    const spotifyResults = await Spotify.getTracks(query, accessToken);
    setResultTracks(spotifyResults.tracks.items);
  }
  catch(e) {
    setMessage('Connection failed, please try again.');
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
          <p>{message}</p>
      </section>
      
  );
};

export default SearchBar;