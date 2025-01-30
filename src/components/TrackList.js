import React from 'react';
import Track from './Track';

import { generateRandomString } from '../utilities/utils';

import styles from './TrackList.module.css'

const TrackList = ({tracks, handleTrackClick, iconSymbol}) => {
    const tracksToDisplay = tracks.map((track, index) => {
        return (
            <Track 
                key={generateRandomString(8)} 
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