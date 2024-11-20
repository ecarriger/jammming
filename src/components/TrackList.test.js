import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import TrackList from './TrackList';

const setUpTrackList = () => {
    const handleClick = jest.fn();
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

    render(<TrackList tracks={tracks} handleTrackClick={handleClick} />);
    
    return handleClick;
}

test('no tracks displayed if tracks is empty', () => {
    render(<TrackList tracks={[]} handleTrackClick={() => {}} />);

    const trackList = screen.queryByRole('listitem');

    expect(trackList).not.toBeInTheDocument();
});
test('tracks are displayed if present', () => {
    setUpTrackList();

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
    const handleClick = setUpTrackList();
    const tracks = screen.getAllByRole('listitem');    

    userEvent.click(tracks[0]);

    expect(handleClick).toHaveBeenCalled();  
});