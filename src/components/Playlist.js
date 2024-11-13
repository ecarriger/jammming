import React, { useState, useEffect } from 'react';

import TrackList from './TrackList';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';


const Playlist = ({playlistTracks, setPlaylistTracks, handleTrackClick, setAuth}) => {

    const [playlistName, setPlaylistName] = useState('');
    
    //Remove track from playlist
    const handleClickRemoveTrack = (trackIdToRemove) => {
        setPlaylistTracks(playlistTracks => playlistTracks.filter((track, index) => index !== trackIdToRemove ));
    }

    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    const handleSaveSubmit = async (event) => {
        event.preventDefault();

        if(checkTokenExpired(localStorage.getItem('accessToken'))) {
            setAuth(false);
            window.location = 'http://localhost:3000';
            return;
        }

        const messageElement = document.getElementById('playlist-submit-message');
        if(playlistTracks.length === 0) {
            messageElement.innerHTML = 'Playlist is empty, please add some tracks';
            return;
        }
        const trackUrisToSave = [];
        playlistTracks.forEach(track => trackUrisToSave.push(track.uri));

        //Get user's Spotify ID
        let userId = localStorage.getItem('userId');
        if(!userId) {
            const user = await Spotify.getUserId(localStorage.getItem('accessToken'));
            userId = user.id;
        }

        //Create new playlist on users account
        const createPlaylistResults =  await Spotify.postNewPlaylist(playlistName, userId, localStorage.getItem('accessToken'));
        const playlistId = createPlaylistResults.id;

        //Add selected tracks to the new playlist
        if(playlistId) {
            const addTracksToPlaylistResults = await Spotify.postTracksToPlaylist(playlistId, trackUrisToSave, localStorage.getItem('accessToken'));
            console.log(addTracksToPlaylistResults);
        }
        else {
            throw(new Error('Cannot add tracks as no playlist id response'));
        }

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
            <TrackList tracks={playlistTracks} handleTrackClick={handleClickRemoveTrack} />
        </section>
    );
};

export default Playlist;
