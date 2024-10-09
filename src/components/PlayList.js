import React from 'react';
import TrackList from './TrackList';

const PlayList = () => {
    return (
        <div>
            <h1>Playlist</h1>
            <form>
                <label for="playlist-name">Playlist name</label>
                <input type="text" id="playlist-name" name="playlist-name" placeholder="Playlist name" />
                <input type='submit' value='Save to Spotify' />
            </form>
            <TrackList />
        </div>
    );
};

export default PlayList;