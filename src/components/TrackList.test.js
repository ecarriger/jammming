import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import TrackList from './TrackList';

const renderTrackList = (handleClick) => {
    const tracks = [{
        name: 'Sound of Silence',
        album: {
            name: 'Immortalized',
            images: [
                '/',
                '/',
                '/'
            ]
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
            name: 'The Greatest Showman Soundtrack',
            images: [
                '/',
                '/',
                '/'
            ]
        },
        artists: [
            {
                name: 'Hugh Jackman'
            }
        ],
        duration_ms: 272437
    }]

    render(<TrackList tracks={tracks} handleTrackClick={handleClick} />);
}

test('no tracks displayed if tracks is empty', () => {
    render(<TrackList tracks={[]} />);

    const trackList = screen.queryByRole('listitem');

    expect(trackList).not.toBeInTheDocument();
});
test('tracks are displayed if present', () => {
    renderTrackList();

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
    renderTrackList(handleClick);
    const tracks = screen.getAllByRole('listitem');

    for(const track of tracks) {
        user.click(track);
    }

    expect(handleClick).toHaveBeenCalledTimes(2);  
});