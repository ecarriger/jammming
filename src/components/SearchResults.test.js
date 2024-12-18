import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchResults from './SearchResults';

const renderSearchResults = (handleClick) => {
    const tracks = [{
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
    }]

    render(<SearchResults resultTracks={tracks} playlistTracks={[]} setPlaylistTracks={handleClick} />);
}

test('shows no tracks if none present', () => {
    render(<SearchResults resultTracks={[]} />);

    const tracks = screen.queryByRole('listitem');

    expect(tracks).not.toBeInTheDocument();
});
test('shows 2 tracks when passed 2', () => {
    renderSearchResults();

    const track1 = screen.getByRole('heading', {
        name: /Sound of Silence/i
    });
    const track2 = screen.getByRole('heading', {
        name: /The Greatest Showman Theme/i
    });

    expect(track1).toBeInTheDocument();
    expect(track2).toBeInTheDocument();
});
test('handleTrackClick is run when track is clicked', () => {
    const handleClick = jest.fn();
    renderSearchResults(handleClick);
    const tracks = screen.getAllByRole('listitem');

    for(const track of tracks) {
        user.click(track);
    }

    expect(handleClick).toHaveBeenCalledTimes(2);  
});