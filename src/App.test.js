import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

//mock spotify authorization
jest.mock('./utilities/Spotify', () => {
  const originalModule = jest.requireActual('./utilities/Spotify');
  return {
    ...originalModule,
    'requestAccessToken': () => {

    } 
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
  render(<App />);

  const authButton = screen.getByRole('button', {
    name: /authorize spotify/i
  });

  user.click(authButton);


});