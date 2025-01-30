import React from 'react';
import TrackList from './TrackList';

import styles from './SearchResults.module.css'

const SearchResults = ({resultTracks, playlistTracks, setPlaylistTracks}) => {

    //Add clicked track to playlist (clicked from SearchResult list)
    const handleClickAddToPlaylist = (trackIdToAdd) => {
        setPlaylistTracks([...playlistTracks, resultTracks[trackIdToAdd]]);
    };

    return (
        <section className={styles.listSection}>
            <h2 className={styles.resultsTitle}>Search Results</h2>
            <TrackList className={styles.resultsList} tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} iconSymbol='+' />
        </section>
    );
};

export default SearchResults;