import React, { useState } from 'react';
import TrackList from './TrackList';

const Playlist = ({tracks, handleTrackClick}) => {

    const [playlistName, setPlaylistName] = useState('');
    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    return (
        <section>
            <h2>Playlist</h2>
            <form>
                <label htmlFor="playlist-name">Playlist name</label>
                <input 
                    type="text" 
                    id="playlist-name" 
                    name="playlist-name" 
                    placeholder="Playlist name" 
                    value={playlistName}
                    onChange={handlePlaylistNameChange} 
                />
                <input type='submit' value='Save to Spotify' />
            </form>
            <TrackList tracks={tracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default Playlist;