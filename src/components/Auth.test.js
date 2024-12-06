import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import Auth from './Auth';
import Spotify from '../utilities/Spotify';

jest.mock('../utilities/spotify', () => {
    return {
        auth: {
            requestAccessToken: jest.fn(),
            checkUrlForAccessToken: jest.fn(),
            extractAccessToken: jest.fn(),
            extractState: jest.fn(),
            extractExpiration: jest.fn()
        }
    };
});

const renderAuth = (
    auth = false, 
    setAuth = bool => auth = bool, 
    accessToken = 'abc123', 
    setAccessToken = token => accessToken = token, 
    setAccessTokenExpiration = () => {}
) => {
    render(<Auth 
        auth={auth}
        setAuth={setAuth}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setAccessTokenExpiration={setAccessTokenExpiration}
    />)
};
test('authorize button renders', () => {
    renderAuth();

    const button = screen.getByRole('button', {
        name: /authorize spotify/i
    });

    expect(button).toBeInTheDocument();
});
test('Spotify.auth.requestAccessToken function fires if button clicked', () => {
    renderAuth();

    const button = screen.getByRole('button', {
        name: /authorize spotify/i
    });
    user.click(button);

    expect(Spotify.auth.requestAccessToken).toHaveBeenCalled();
});