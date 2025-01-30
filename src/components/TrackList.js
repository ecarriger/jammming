import React from 'react';
import Track from './Track';

import styles from './TrackList.module.css'

const TrackList = ({tracks, handleTrackClick, iconSymbol}) => {
    const tracksToDisplay = tracks.map((track, index) => {
        const key = track.hasOwnProperty('uKey') ? track.uKey : track.id;
        return (
            <Track 
                key={key} 
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