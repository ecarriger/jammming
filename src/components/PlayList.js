import React from 'react';
import TrackList from './TrackList';

const PlayList = () => {
    return (
        <div>
            <h1>Playlist</h1>
            <TrackList />
            <form>
                <input type='submit' value='Save to Spotify' />
            </form>
        </div>
    );
};

export default PlayList;