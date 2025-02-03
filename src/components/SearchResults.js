import React from 'react';
import TrackList from './TrackList';

import { generateRandomString } from '../utilities/utils';

import styles from './SearchResults.module.css'

const SearchResults = ({resultTracks, setPlaylistTracks, fadeOutResults, setMessage}) => {

    //Add clicked track to playlist (clicked from SearchResult list)
    const handleClickAddToPlaylist = (trackIdToAdd) => {
        const trackToAdd = JSON.parse(JSON.stringify(resultTracks[trackIdToAdd]));
        trackToAdd.uKey = generateRandomString(8);
        setPlaylistTracks(prevPlaylistTracks => [...prevPlaylistTracks, trackToAdd]);
        setMessage('Track added', 750);
    };

    return (
        <section className={styles.listSection}>
            <h2 className={styles.resultsTitle}>Search Results</h2>
            <TrackList 
                className={styles.resultsList} 
                tracks={resultTracks} 
                handleTrackClick={handleClickAddToPlaylist} 
                iconSymbol='+'
                fadeOutResults={fadeOutResults}
            />
        </section>
    );
};

export default SearchResults;