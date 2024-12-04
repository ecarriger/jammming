import React, { useState } from 'react';

import TrackList from './TrackList';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';


const Playlist = ({playlistTracks, setPlaylistTracks, setAuth}) => {
    const [playlistName, setPlaylistName] = useState('');
    const [message, setMessage] = useState('');
    
    //Remove track from playlist
    const handleClickRemoveTrack = (trackIdToRemove) => {
        setPlaylistTracks(playlistTracks => playlistTracks.filter((track, index) => index !== trackIdToRemove ));
    }

    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    const handleSaveSubmit = async (event) => {
        event.preventDefault();
        const tokenExpired = checkTokenExpired(localStorage.getItem('accessToken'));
        if(tokenExpired) {
            setAuth(false);
            window.location = 'http://localhost:3000';
            return;
        }
        debugger;
        if(playlistTracks.length === 0) {
            setMessage('Playlist is empty, please add some tracks');
            return;
        }
        const trackUrisToSave = [];
        playlistTracks.forEach(track => trackUrisToSave.push(track.uri));

        //Get user's Spotify ID
        let userId = localStorage.getItem('userId');
        if(!userId) {
            const user = await Spotify.getUserId(localStorage.getItem('accessToken'));
            userId = user.id;
            console.log(userId);
        }

        //Create new playlist on users account
        const createPlaylistResults =  await Spotify.postNewPlaylist(playlistName, userId, localStorage.getItem('accessToken'));
        const playlistId = createPlaylistResults.id;

        //Add selected tracks to the new playlist
        if(playlistId) {
            const addTracksToPlaylistResults = await Spotify.postTracksToPlaylist(playlistId, trackUrisToSave, localStorage.getItem('accessToken'));
            setMessage(`Playlist created: ${createPlaylistResults.name}. Snap: ${addTracksToPlaylistResults.snapshot_id}`);
        }
        else {
            setMessage('Cannot add tracks as no playlist id response');
            throw(new Error('Cannot add tracks as no playlist id response'));
        }
        //Cleanup
        setPlaylistName('');
        setPlaylistTracks([]);
    };


    return (
        <section id='playlist'>
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
            <p id="message">{message ? message : 'No message found'}</p>
            <TrackList tracks={playlistTracks} handleTrackClick={handleClickRemoveTrack} />
        </section>
    );
};

export default Playlist;
