import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';
import { requestAccessToken } from './utilities/Spotify';



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


//mock spotify authorization
jest.mock('./utilities/Spotify', () => {
  const originalModule = jest.requireActual('./utilities/Spotify');
  return {
    ...originalModule,
    'requestAccessToken': jest.fn() 
  };
});

test('renders Jamming title', () => {
  render(<App />);

  const title = screen.getByRole('heading', {
    name: /jammming/i
  });

  expect(title).toBeInTheDocument();
});
test('auth button is present when App is first rendered', () => {
  render(<App />);

  const authButton = screen.getByRole('button', {
    name: /authorize spotify/i
  });

  expect(authButton).toBeInTheDocument();
});
test('clicking auth button leads to rest of app', async () => {
  requestAccessToken.mockImplementation(() => {
    window.location = {
      href: process.env.REACT_APP_APP_ROOT + `?access_token=abc123&expires_in=3600&state=abcdefgh12345678`
    };
    console.log(window.location.href);
    console.log(window.location.search);
  })
  const { rerender } = render(<App />);

  const authButton = screen.getByRole('button', {
    name: /authorize spotify/i
  });
  user.click(authButton);

  //simulater navigating back to app from Spotify authentication
  console.log(window.location.href);
  rerender(<App />);

  const searchBar = screen.getByRole('textbox', {
    name: /search for songs/i
  })

  expect(searchBar).toBeInTheDocument();
});