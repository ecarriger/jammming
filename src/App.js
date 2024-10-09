import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import PlayList from './components/PlayList';
import mockTracks from './utilities/mockTracks';

function App() {
  return (
    <div>
      <SearchBar />
      <SearchResults />
      <PlayList />
    </div>
  );
}

export default App;
