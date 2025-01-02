import React from 'react';
import { convertMsToTime } from '../utilities/utils';

const Track = ({index, track, handleTrackClick}) => {

    return (
        <li key={index} onClick={handleTrackClick}>
            <img src={track.album.images[2].url} alt='Cover art' />
            <h3>{track.name}</h3>
            <h4>{track.artists[0].name}</h4>
            <h4>{convertMsToTime(track.duration_ms)}</h4>
        </li>
    );
};

export default Track;