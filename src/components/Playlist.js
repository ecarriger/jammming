import React, { useState, useEffect } from 'react';

import TrackList from './TrackList';

import Spotify from '../utilities/Spotify';
import { checkTokenExpired } from '../utilities/utils';

import styles from './Playlist.module.css'


const Playlist = ({playlistTracks, setPlaylistTracks, accessToken, auth, setAuth, accessTokenExpiration}) => {
    const [playlistName, setPlaylistName] = useState('');
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if(!auth) {
            setUserId('');
        }
    }, [auth]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    }, [message]);
    
    //Remove track from playlist
    const handleClickRemoveTrack = (trackIdToRemove) => {
        setPlaylistTracks(playlistTracks => playlistTracks.filter((track, index) => index !== trackIdToRemove ));
    }

    const handlePlaylistNameChange = ({target}) => {
        setPlaylistName(target.value);
    };

    const handleSaveSubmit = async (event) => {
        event.preventDefault();
        const tokenExpired = checkTokenExpired(accessTokenExpiration);
        if(tokenExpired) {
            setAuth(false);
            window.location = 'http://localhost:3000';
            return;
        }
        if(playlistTracks.length === 0) {
            setMessage('Playlist is empty, please add some tracks');
            return;
        }
        const trackUrisToSave = [];
        playlistTracks.forEach(track => trackUrisToSave.push(track.uri));

        //Get user's Spotify ID
        let currentUserId = userId;
        if(!currentUserId) {
            const user = await Spotify.getUserId(accessToken);
            currentUserId = user.id;
            setUserId(currentUserId);
        }

        //Create new playlist on users account
        const createPlaylistResults =  await Spotify.postNewPlaylist(playlistName, currentUserId, accessToken);
        const playlistId = createPlaylistResults.id;

        //Add selected tracks to the new playlist
        if(playlistId) {
            const addTracksToPlaylistResults = await Spotify.postTracksToPlaylist(playlistId, trackUrisToSave, accessToken);
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
        <section id={styles.playlist}>
            <h2>Playlist</h2>
            <form onSubmit={handleSaveSubmit}>
                <label className='inter-bold' htmlFor="playlistName">New playlist name:</label>
                <div className={styles.formInputs}>
                    <input 
                        type="text" 
                        id='playlistName'
                        className={styles.playlistName}
                        name="playlist-name" 
                        placeholder="Type playlist name..." 
                        value={playlistName}
                        onChange={handlePlaylistNameChange} 
                    />
                    <input type='submit' className='inter-bold playlistSubmit' value='Save to Spotify' />
                </div>
            </form>
            <p id="message">{message}</p>
            <TrackList tracks={playlistTracks} handleTrackClick={handleClickRemoveTrack} iconSymbol='-' />
        </section>
    );
};

export default Playlist;
