import React, { useState } from 'react';
import TrackList from './TrackList';

const Playlist = ({tracks, setPlaylistTracks, handleTrackClick}) => {

    const [playlistName, setPlaylistName] = useState('');
    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    const [playlistTracksToSave, setPlaylistTracksToSave] = useState([]);
    const savePlaylist = (e) => {
        e.preventDefault();
        const messageElement = document.getElementById('playlist-submit-message');
        if(tracks.length === 0) {
            messageElement.innerHTML = 'Playlist is empty, please add some tracks';
            return;
        }
        tracks.forEach(track => playlistTracksToSave.push(track.uri));
        setPlaylistName('');
        setPlaylistTracks([]);
        setPlaylistTracksToSave([]);
        messageElement.innerHTML = `This should save playlist ${playlistName} to Spotify with tracks: ${playlistTracksToSave}`;
    };

    return (
        <section>
            <h2>Playlist</h2>
            <form onSubmit={savePlaylist}>
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
            <p id="playlist-submit-message" hidden={tracks.length >= 1 ? true : false}></p>
            <TrackList tracks={tracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default Playlist;
