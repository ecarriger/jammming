import React from 'react';
import TrackList from './TrackList';

const SearchResults = ({resultTracks, setPlaylistTracks}) => {

    //Add clicked track to playlist (clicked from SearchResult list)
    const handleClickAddToPlaylist = (trackIdToAdd) => {
        setPlaylistTracks(playlistTracks => [resultTracks[trackIdToAdd], ...playlistTracks]);
    };

    return (
        <section>
            <h2>Search Results</h2>
            <TrackList tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} />
        </section>
    );
};

export default SearchResults;