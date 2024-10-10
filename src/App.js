import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import PlayList from './components/PlayList';
import mockTracks from './utilities/mockTracks';

function App() {
  const [resultTracks, setResultTracks] = useState(mockTracks);
  const handleResultTrackClick = ({target}) => {
    alert(`This should add track ${target.innerHTML} to the playlist`);
  };
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const removeTrack = (trackId) => {
    alert(`This should remove track with ID: ${trackId} from the playlist`);
  }
  return (
    <div>
      <SearchBar />
      <SearchResults tracks={resultTracks} handleTrackClick={handleResultTrackClick} />
      <PlayList tracks={playlistTracks} handleTrackClick={removeTrack} />
    </div>
  );
}

export default App;
