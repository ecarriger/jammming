import React from 'react';
import { convertMsToTime } from '../utilities/utils';

import styles from './Track.module.css';

const Track = ({index, track, handleTrackClick, iconSymbol}) => {

    return (
        <li key={index} onClick={handleTrackClick}>
            <div className={styles.trackWrapper}>
                <img src={track.album.images[2].url} alt='Cover art' />
                <div className={styles.trackText}>
                    <h3 className={styles.trackTitle}>{track.name}</h3>
                    <div className={styles.trackDetails}>
                        <h4>{track.artists[0].name}</h4>
                        <h4>{convertMsToTime(track.duration_ms)}</h4>
                    </div>
                </div>
            </div>
            <span className={styles.trackIcon}>{iconSymbol}</span>
        </li>
    );
};

export default Track;