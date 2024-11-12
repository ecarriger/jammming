import React, { useState } from 'react';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';


const SearchBar = ({setResultTracks, setAuth}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = ({target}) => {
        setSearchQuery(target.value);
    };

    //Send search request to Spotify
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

  if(checkTokenExpired(localStorage.getItem('accessTokenExpiration'))) {
    setAuth(false);
    window.location = 'http://localhost:3000';
    return;
  }

    const formData = new FormData(event.target);
    const query = formData.get('search-bar');    

    const spotifyResults = await Spotify.getTracks(query, localStorage.getItem('accessToken'));
    setResultTracks(spotifyResults.tracks.items);
  };

    return (
        <section>
            <h2>Search</h2>
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="search-bar">Search for songs</label>
                <input 
                    type="text"
                    id="search-bar" 
                    name="search-bar" 
                    value={searchQuery} 
                    onChange={handleSearchChange}
                    placeholder="Type your search..." />
                <input type="submit" value="Search" />
            </form>
        </section>
        
    );
};

export default SearchBar;