import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Track from './Track';

const setUpTrack = () => {
    const handleClick = jest.fn();
    const track = {
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
    }

    render(<Track track={track} handleTrackClick={handleClick} />);
    
    return handleClick;
}

test('Track name is displayed', () => {
    setUpTrack();

    const track = screen.getByRole('heading', {
        name: /sound of silence/i
    })

    expect(track).toBeInTheDocument();
});
test('Track album name is shown', () => {
    setUpTrack();

    const album = screen.getByRole('heading', {
        name: /immortalized/i
    });

    expect(album).toBeInTheDocument();
});
test('Track artist name is shown', () => {
    setUpTrack();

    const album = screen.getByRole('heading', {
        name: /disturbed/i
    });

    expect(album).toBeInTheDocument();
});
test('Track time to be shown', () => {
    setUpTrack();

    const album = screen.getByRole('heading', {
        name: '4:12'
    });

    expect(album).toBeInTheDocument();
});
test('click handler runs when clicked', () => {
    const handleClick = setUpTrack();

    const listitem = screen.getByRole('listitem');
    user.click(listitem);

    expect(handleClick).toHaveBeenCalled();
});


