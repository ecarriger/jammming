import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import SearchBar from './SearchBar';

const renderSearchBar = (
    setResultTracks = () => {}, 
    setAuth = () => {}, 
    accessToken = 'abc123', 
    accessTokenExpiration = new Date(999999999999999),
    setFadeOutResults = () => {},
    setMessage = () => {}
) => {
    render(
        <SearchBar 
            setResultTracks={setResultTracks} 
            setAuth={setAuth} 
            accessToken={accessToken} 
            accessTokenExpiration={accessTokenExpiration}
            setFadeOutResults={setFadeOutResults}
            setMessage={setMessage}
        />
    )
};

test('Searchbar saves value', async () => {
    renderSearchBar();

    const searchbar = screen.getByRole('textbox', {
        name: /search for songs/i
    });
    expect(searchbar).toBeInTheDocument();

    user.click(searchbar);
    user.keyboard('sound of silence');

    expect(searchbar.value).toBe('sound of silence');
});
test('Message shown if search to short', async () => {
    const mockSetmessage = jest.fn();
    renderSearchBar(undefined, undefined, undefined, undefined, undefined, mockSetmessage);

    const searchButton = screen.getByRole('button', {
        name: /search/i
    });
    user.click(searchButton);

    await waitFor(() => {
        expect(mockSetmessage).toHaveBeenCalledWith(expect.stringMatching(/search must be at least 3 charaters/i), expect.any(Number));
    });
});
test('Message shown if token expired', async () => {
    const mockSetAuth = jest.fn();
    const mockSetMessage = jest.fn();
    renderSearchBar(undefined, mockSetAuth, undefined, new Date(), undefined, mockSetMessage);

    const searchBox = screen.getByRole('textbox', {
        name: /search for songs/i
    });
    const searchButton = screen.getByRole('button', {
        name: /search/i
    });

    user.click(searchBox);
    user.keyboard('sound');
    user.click(searchButton);

    expect(mockSetAuth).toHaveBeenCalled();
    await waitFor(() => {
        expect(mockSetMessage).toHaveBeenCalledWith(expect.stringMatching(/authentication expired/i), expect.any(Number));
    });
    
});
test('search button fires setResultTracks function', async () => {
    const mockSetResultTracks = jest.fn();
    renderSearchBar(mockSetResultTracks);

    const searchBox = screen.getByRole('textbox', {
        name: /search for songs/i
    });
    const searchButton = screen.getByRole('button', {
        name: /search/i
    });

    user.click(searchBox);
    user.keyboard('sound');
    user.click(searchButton);

    await waitFor(() => {
        expect(mockSetResultTracks).toHaveBeenCalled();
    });
});