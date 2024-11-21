import { screen, render } from '@testing-library/react';
import SearchResults from './SearchResults';

const resultTracks = [{
    name: 'Sound of Silence',
    album: {
        name: 'Immortalized'
    },
    artists: [
        {
            name: 'Disturbed'
        }
    ],
    duration_ms: 252908
}, 
{
    name: 'The Greatest Showman Theme',
    album: {
        name: 'The Greatest Showman Soundtrack'
    },
    artists: [
        {
            name: 'Hugh Jackman'
        }
    ],
    duration_ms: 272437
}];

test('first test', () => {
    render(<SearchResults resultTracks={resultTracks} />);

});