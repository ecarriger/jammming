import React from 'react';
import TrackList from './TrackList';

const PlayList = () => {
    return (
        <section>
            <h2>Playlist</h2>
            <form>
                <label htmlFor="playlist-name">Playlist name</label>
                <input type="text" id="playlist-name" name="playlist-name" placeholder="Playlist name" />
                <input type='submit' value='Save to Spotify' />
            </form>
            <TrackList />
        </section>
    );
};

export default PlayList;