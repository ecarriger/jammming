import React from 'react';
import TrackList from './TrackList';

const PlayList = ({tracks, handleTrackClick}) => {
    return (
        <section>
            <h2>Playlist</h2>
            <form>
                <label for="playlist-name">Playlist name</label>
                <input type="text" id="playlist-name" name="playlist-name" placeholder="Playlist name" />
                <input type='submit' value='Save to Spotify' />
            </form>
            <TrackList tracks={tracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default PlayList;