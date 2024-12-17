import { render, screen } from '@testing-library/react';
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
    name: /authorize spotify/i
  });

  expect(authButton).toBeInTheDocument();
});
describe('auth state set to true (access token in url and spotify state matches)', () => {
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

    const searchHeader = screen.getByRole('heading', {
      name: 'Search'
    });

    expect(searchHeader).toBeInTheDocument();
  });
});