import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import Auth from './Auth';

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
        name: /connect to spotify/i
    });

    expect(button).toBeInTheDocument();
});
test('window.location navigates to spotify function fires if button clicked', () => {
    //Clear window.location so it can be mocked
    delete window.location;
    window.location = {href: 'http://localhost/'};
    renderAuth();

    const button = screen.getByRole('button', {
        name: /connect to spotify/i
    });
    user.click(button);

    //second .href needed to extract the href string from the URL object
    expect(window.location.href.href).toMatch(/accounts.spotify/i);
});
test('spotify hash response converts to search query in url', () => {
    //Clear window.location so it can be mocked
    delete window.location;
    window.location = { 
        href: 'http://localhost/',
        hash: '#access_token=abc123',
        search: ''
    };

    renderAuth();

    expect(window.location.search).toMatch('access_token=abc123');
});
test('sessionStorage is called to set Spotify state', () => {
    renderAuth();

    const button = screen.getByRole('button', {
        name: /connect to spotify/i
    });
    user.click(button);    

    expect(mockSetItem).toHaveBeenCalled();
});
test('navigates to spotify', () => {
    //Clear window.location so it can be mocked
    delete window.location;
    window.location = {
        href: 'http://localhost/'
    };
    renderAuth();

    const button = screen.getByRole('button', {
        name: /connect to spotify/i
    });
    user.click(button);

    const url = window.location.href.href;

    expect(url).toMatch('https://accounts.spotify.com/authorize');
});