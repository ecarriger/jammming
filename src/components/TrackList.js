import React from 'react';
import Track from './Track';

const TrackList = ({tracks, handleTrackClick}) => {
    const tracksToDisplay = tracks.map(track => <Track track={track} handleTrackClick={handleTrackClick} /> )
    return (
        <ul>
            {tracksToDisplay}
        </ul>
    );
};

export default TrackList;