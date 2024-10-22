import React, { useState } from 'react';

import TrackList from './TrackList';

import Spotify from '../utilities/Spotify';

const Playlist = ({playlistTracks, setPlaylistTracks, handleTrackClick, accessToken}) => {

    const [userId, setUserId] = useState('');
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

        //Get user's Spotify ID
        if(userId.length === 0) {
            const user = await Spotify.getUserId(accessToken);
            setUserId(user.id);
            
        }

        //Create new playlist on users account
        const createPlaylistResults =  await Spotify.postNewPlaylist(playlistName, userId, accessToken);
        console.log('Playlist creation:' + createPlaylistResults);
        const playlistId = createPlaylistResults.id;

        //Add selected tracks to the new playlist
        if(playlistId) {
            const addTracksToPlaylistResults = await Spotify.postTracksToPlaylist(playlistId, trackUrisToSave, accessToken);
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
            <TrackList tracks={playlistTracks} handleTrackClick={handleTrackClick} />
        </section>
    );
};

export default Playlist;
