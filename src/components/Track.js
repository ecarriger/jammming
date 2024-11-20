import React from 'react';
import { convertMsToTime } from '../utilities/utils';

const Track = ({index, track, handleTrackClick}) => {

    return (
        <li key={index} onClick={handleTrackClick}>
            <h3>{track.name}</h3>
            <h4>{track.artists[0].name}</h4>
            <h4>{track.album.name}</h4>
            <h4>{convertMsToTime(track.duration_ms)}</h4>
        </li>
    );
};

export default Track;