import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';



//mock sessionStorage for tests
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: (...args) => mockGetItem(...args),
    setItem: (...args) => mockSetItem(...args),
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

//setup App render
const renderApp = () => {
  render (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
};

describe('auth state false (no access token in url)', () => {
  test('renders Jamming title', () => {
    renderApp();
  
    const title = screen.getByRole('heading', {
      name: /jammming/i
    });
  
    expect(title).toBeInTheDocument();
  });
  test('auth button is present when App is first rendered', () => {
    renderApp();
  
    const authButton = screen.getByRole('button', {
      name: /connect to spotify/i
    });
  
    expect(authButton).toBeInTheDocument();
  });
});
describe('auth state set to true (access token in url and spotify state matches)', () => {
  //set access token in url and spotify state in sessionStorage
  beforeEach(() => {
    delete window.location;
    window.location = {
      href: 'http://localhost',
      search: '?access_token=abc123&expires_in=3600&state=abcdefgh12345678'
    };
    mockGetItem.mockReturnValue('abcdefgh12345678');
  });

  test('SearhBar, SearchResults, and Playlist render if access token is in browser', () => {
    renderApp();

    const searchBarHeader = screen.getByRole('textbox', {
      name: /search for songs/i
    });
    const searchResultsHeader = screen.getByRole('heading', {
      name: /search results/i
    });
    const playlistHeader = screen.getByRole('heading', {
      name: /playlist/i
    });

    expect(searchBarHeader).toBeInTheDocument();
    expect(searchResultsHeader).toBeInTheDocument();
    expect(playlistHeader).toBeInTheDocument();
  });
  test('Auth does not render', () => {
    renderApp();

    const authButton = screen.queryByRole('button', {
      name: /connect to spotify/i
    });
  
    expect(authButton).not.toBeInTheDocument();
    
  });
  test('track added and removed from playlist when clicked', async () => {
    renderApp();

    //enter search term
    const searchBar = screen.getByRole('textbox', {
      name: /search for songs/i
    });
    user.click(searchBar);
    user.keyboard('sound of silence');
    //submit search
    const searchButton = screen.getByRole('button', {
      name: /search/i
    });
    user.click(searchButton);
    //click search result track to add to playlist
    const searchResultTrack = await screen.findByRole('heading', {
      name: /sound of silence/i
    });
    user.click(searchResultTrack);
    //click playlist track to remove
    
    await waitFor(() => {
      const playlistTrack = screen.getAllByRole('heading', {
        name: /sound of silence/i
      });
      expect(playlistTrack.length).toBe(2);
    });
    const playlistTrack = await screen.findAllByRole('heading', {
      name: /sound of silence/i
    });
    user.click(playlistTrack[1]);

    await waitFor(() => {
      expect(playlistTrack[1]).not.toBeInTheDocument();
    });
  });
});