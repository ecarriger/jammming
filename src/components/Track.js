import React, { useState } from 'react';
import { convertMsToTime } from '../utilities/utils';

import styles from './Track.module.css';

const Track = ({track, handleTrackClick, iconSymbol}) => {
    const [fadeOut, setFadeOut] = useState(false);
    const clickHandler = (event) => {
        console.log(event);
        //iconSymbol of minus means this is a playlist track
        if(iconSymbol === '-') {
            setFadeOut(true);
        }
        handleTrackClick();
    };
    return (
        <li className={fadeOut ? styles.fadeOut : ''} onClick={clickHandler}>
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