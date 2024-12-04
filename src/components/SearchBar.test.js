import { screen, render } from '@testing-library/react';
import SearchBar from './SearchBar';

const renderSearchBar = (setResultTracks = () => {}, setAuth = () => {}) => {
    render(<SearchBar setResultTracks={setResultTracks} setAuth={setAuth} />)
};

test('First test', () => {
    renderSearchBar();
});