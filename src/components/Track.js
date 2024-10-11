import React from 'react';

const Track = ({index, track, handleTrackClick}) => {

    return (
        <li key={index} onClick={handleTrackClick}>{track.name}</li>
    );
};

export default Track;