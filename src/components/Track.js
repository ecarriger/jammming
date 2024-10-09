import React from 'react';

const Track = ({track, handleTrackClick}) => {

    return (
        <li key={track.id} onClick={handleTrackClick}>{track.title}</li>
    );
};

export default Track;