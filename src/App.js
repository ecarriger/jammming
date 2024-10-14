import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import PlayList from './components/PlayList';

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
