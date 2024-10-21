import React, { useState } from 'react';

import TrackList from './TrackList';

import Spotify from '../utilities/Spotify';

const Playlist = ({playlistTracks, setPlaylistTracks, handleTrackClick, accessToken}) => {

    const [playlistName, setPlaylistName] = useState('');
    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    const handleSaveSubmit = async (event) => {
        event.preventDefault();
        const messageElement = document.getElementById('playlist-submit-message');
        if(playlistTracks.length === 0) {
            messageElement.innerHTML = 'Playlist is empty, please add some tracks';
            return;
        }
        const trackUrisToSave = [];
        playlistTracks.forEach(track => trackUrisToSave.push(track.uri));

        console.log(`This should save playlist ${playlistName} to Spotify with tracks: ${trackUrisToSave}`);

        //Get user's Spotify ID
        const userId = await Spotify.getUserId(accessToken);
        console.log(userId);

        //Create new playlist on users account
        Spotify.postNewPlaylist(playlistName);        

        //Add selected tracks to the new playlist
        Spotify.postTracksToPlaylist(playlistName, trackUrisToSave);

        //Cleanup
        setPlaylistName('');
        setPlaylistTracks([]);
    };


    return (
        <section>
            <h2>Playlist</h2>
            <form onSubmit={handleSaveSubmit}>
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
            <p id="playlist-submit-message" hidden={playlistTracks.length >= 1 ? true : false}></p>
            <TrackList tracks={playlistTracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default Playlist;
