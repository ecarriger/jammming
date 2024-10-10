import React from 'react';
import TrackList from './TrackList';

const SearchResults = ({tracks, handleTrackClick}) => {
    console.log(`SearchResults | tracks: ${tracks.title}`);
    return (
        <section>
            <h2>Search Results</h2>
            <TrackList tracks={tracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default SearchResults;