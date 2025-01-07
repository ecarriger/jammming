import React from 'react';
import TrackList from './TrackList';

import styles from './SearchResults.module.css'

const SearchResults = ({resultTracks, playlistTracks, setPlaylistTracks}) => {

    //Add clicked track to playlist (clicked from SearchResult list)
    const handleClickAddToPlaylist = (trackIdToAdd) => {
        setPlaylistTracks([resultTracks[trackIdToAdd], ...playlistTracks]);
    };

    return (
        <section className={styles.listSection}>
            <h2>Search Results</h2>
            <TrackList tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} />
        </section>
    );
};

export default SearchResults;