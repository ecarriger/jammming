import React from 'react';
import Track from './Track';

import styles from './TrackList.module.css'

const TrackList = ({tracks, handleTrackClick}) => {
    const tracksToDisplay = tracks.map((track, index) => <Track key={index} track={track} handleTrackClick={() => handleTrackClick(index)} /> )
    return (
        <ul className={styles.trackList}>
            {tracksToDisplay}
        </ul>
    );
};

export default TrackList;