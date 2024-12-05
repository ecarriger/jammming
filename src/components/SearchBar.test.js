import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import SearchBar from './SearchBar';

const renderSearchBar = (setResultTracks = () => {}, setAuth = () => {}) => {
    render(<SearchBar setResultTracks={setResultTracks} setAuth={setAuth} />)
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

    const message = await screen.findByText(/search must be at least 3 charaters/i);

    expect(message).toBeInTheDocument();
});
test('Message shown if token expired', async () => {
    renderSearchBar();

    const message = await screen.findByText(/authentication expired/i);

    expect(message).toBeInTheDocument();
})