import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import Auth from './Auth';

const renderAuth = (
    auth = false, 
    setAuth = bool => auth = bool, 
    accessToken = 'abc123', 
    setAccessToken = token => accessToken = token, 
    setAccessTokenExpiration = () => {}
) => {
    render(
    <BrowserRouter>
        <Auth 
            auth={auth}
            setAuth={setAuth}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            setAccessTokenExpiration={setAccessTokenExpiration}
        />
    </BrowserRouter>)
};
test('authorize button renders', () => {
    renderAuth();

    const button = screen.getByRole('button', {
        name: /authorize spotify/i
    });

    expect(button).toBeInTheDocument();
});
test('Spotify.auth.requestAccessToken function fires if button clicked', () => {
    delete window.location;
    window.location = {href: 'http://localhost/'};
    renderAuth();

    const button = screen.getByRole('button', {
        name: /authorize spotify/i
    });
    user.click(button);

    //second .href needed to extract the href string from the URL object
    expect(window.location.href.href).toMatch(/accounts.spotify/i);
});
test('spotify hash response converts to search query in url', () => {
    delete window.location;
    window.location = { 
        href: 'http://localhost/',
        hash: '#access_token=abc123',
        search: ''
    };

    renderAuth();

    expect(window.location.search).toMatch('access_token=abc123');
});