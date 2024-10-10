import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import PlayList from './components/PlayList';
import mockTracks from './utilities/mockTracks';

function App() {
  //Initialize states for result list and playlist tracks
  const [resultTracks, setResultTracks] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  //Add clicked track to playlist (clicked from SearchResult list)
  const handleClickAddToPlaylist = (trackIdToAdd) => {
    setPlaylistTracks(playlistTracks => [resultTracks[trackIdToAdd], ...playlistTracks]);
  };

  //Remove track from playlist
  const handleClickRemoveTrack = (trackIdToRemove) => {
    setPlaylistTracks(playlistTracks => playlistTracks.filter((track, index) => index !== trackIdToRemove ));
  }

  //App JSX to render
  return (
    <div>
      <SearchBar />
      <SearchResults tracks={resultTracks} handleTrackClick={handleClickAddToPlaylist} />
      <PlayList tracks={playlistTracks} handleTrackClick={handleClickRemoveTrack} />
    </div>
  );
}

export default App;
