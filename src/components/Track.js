import React from 'react';

const Track = ({index, track, handleTrackClick}) => {

    return (
        <li key={index} onClick={handleTrackClick}>{track.title}</li>
    );
};

export default Track;