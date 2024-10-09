import React from 'react';

const SearchBar = () => {
    return (
        <section>
            <h2>Search</h2>
            <form>
                <label htmlFor="search-bar">Search for songs</label>
                <input type="text" id="search-bar" name="search-bar" placeholder="Type your search..." />
                <input type="submit" value="Search" />
            </form>
        </section>
        
    );
};

export default SearchBar;