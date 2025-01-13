import React from 'react';
import Track from './Track';

import styles from './TrackList.module.css'

const TrackList = ({tracks, handleTrackClick, iconSymbol}) => {
    const tracksToDisplay = tracks.map((track, index) => {
        return (
            <Track 
                key={index} 
                track={track} 
                handleTrackClick={() => handleTrackClick(index)}
                iconSymbol={iconSymbol}
            />
        );
    });
    return (
        <ul className={styles.trackList}>
            {tracksToDisplay}
        </ul>
    );
};

export default TrackList;