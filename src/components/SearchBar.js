import React from 'react';

const SearchBar = () => {

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_SPOTIFY_API_KEY);
    };

    return (
        <section>
            <h2>Search</h2>
            <form onSubmit={handleSearchSubmit} >
                <label htmlFor="search-bar">Search for songs</label>
                <input type="text" id="search-bar" name="search-bar" placeholder="Type your search..." />
                <input type="submit" value="Search" />
            </form>
        </section>
        
    );
};

export default SearchBar;