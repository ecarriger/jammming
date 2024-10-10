import React from 'react';
import Track from './Track';

const TrackList = ({tracks, handleTrackClick}) => {
    const tracksToDisplay = tracks.map((track, index) => <Track index={index} track={track} handleTrackClick={() => handleTrackClick(index)} /> )
    return (
        <ul>
            {tracksToDisplay}
        </ul>
    );
};

export default TrackList;