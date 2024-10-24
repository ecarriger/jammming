import React, { useState } from 'react';

const SearchBar = ({handleSearchSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = ({target}) => {
        setSearchQuery(target.value);
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