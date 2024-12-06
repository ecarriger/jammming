import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import SearchBar from './SearchBar';

const renderSearchBar = (setResultTracks = () => {}, setAuth = () => {}, accessToken = 'ab123', accessTokenExpiration = new Date(999999999999999)) => {
    render(
        <SearchBar 
            setResultTracks={setResultTracks} 
            setAuth={setAuth} 
            accessToken={accessToken} 
            accessTokenExpiration={accessTokenExpiration} 
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
    renderSearchBar();

    const searchButton = screen.getByRole('button', {
        name: /search/i
    });
    user.click(searchButton);

    const message = await screen.findByText(/search must be at least 3 charaters/i);

    expect(message).toBeInTheDocument();
});
test('Message shown if token expired', async () => {
    const mockSetAuth = jest.fn();
    renderSearchBar(undefined, mockSetAuth, undefined, new Date());

    const searchBox = screen.getByRole('textbox', {
        name: /search for songs/i
    });
    const searchButton = screen.getByRole('button', {
        name: /search/i
    });

    user.click(searchBox);
    user.keyboard('sound');
    user.click(searchButton);

    const message = await screen.findByText(/authentication expired/i);

    expect(mockSetAuth).toHaveBeenCalled();
    expect(message).toBeInTheDocument();
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