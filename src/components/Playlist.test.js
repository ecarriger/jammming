import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import Playlist from './Playlist';

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
}];

const renderPlaylist = (
        playlistTracks = tracks, 
        setPlaylistTracks = () => {}, 
        accessToken = 'abc123', 
        auth = true, 
        setAuth = () => {}, 
        accessTokenExpiration = new Date(2199, 11),
        setMessage = () => {}
    ) => {
    render(
        <Playlist 
            playlistTracks={playlistTracks} 
            setPlaylistTracks={setPlaylistTracks} 
            accessToken={accessToken} 
            auth={auth} 
            setAuth={setAuth} 
            accessTokenExpiration={accessTokenExpiration} 
            setMessage={setMessage}
        />
    );
}

test('shows no tracks if none present', () => {
    render(<Playlist playlistTracks={[]} />);

    const tracks = screen.queryByRole('listitem');

    expect(tracks).not.toBeInTheDocument();
});
test('input name field can be typed into', async () => {
    renderPlaylist();
    const input = screen.getByRole('textbox', {
        name: /new playlist name/i
    });
    expect(input).toBeInTheDocument();

    user.click(input);
    user.keyboard('My playlist name');

    await waitFor(() => {
        expect(input.value).toBe('My playlist name');
    });
});
test('shows 2 tracks when passed 2', () => {
    renderPlaylist();

    const track1 = screen.getByRole('heading', {
        name: /Sound of Silence/i
    });
    const track2 = screen.getByRole('heading', {
        name: /The Greatest Showman Theme/i
    });

    expect(track1).toBeInTheDocument();
    expect(track2).toBeInTheDocument();
});
test('error message is shown if playlist is empty', async () => {
    const mockSetMessage = jest.fn();
    render(<Playlist playlistTracks={[]} setAuth={() => {}} setPlaylistTracks={() => {}} setMessage={mockSetMessage} />);
    
    const submit = screen.getByRole('button', {
        name: /save/i
    });

    user.click(submit);

    await waitFor(() => {
        expect(mockSetMessage).toHaveBeenCalledWith(expect.stringMatching(/playlist is empty/i), expect.any(Number));
    })
   
});
test('no error message is shown if playlist has tracks', () => {
    renderPlaylist();
    
    const submit = screen.getByRole('button', {
        name: /save/i
    });
    user.click(submit);

    const message = screen.queryByText(/playlist is empty/i);

    expect(message).not.toBeInTheDocument();
});
test('handleTrackClick is run when track is clicked', async () => {
    const mockSetPlaylistTracks = jest.fn();
    renderPlaylist(tracks, mockSetPlaylistTracks);
    const renderedTracks = screen.getAllByRole('listitem');

    for(const track of renderedTracks) {
        user.click(track);
    }

    await waitFor(() => {
        expect(mockSetPlaylistTracks).toHaveBeenCalledTimes(tracks.length);
    });
      
});
test('message set after playlist created', async () => {
    const mockSetMessage = jest.fn();
    renderPlaylist(undefined, undefined, undefined, undefined, undefined, undefined, mockSetMessage);

    const name = screen.getByRole('textbox', {
        name: /new playlist name/i
    });
    const submit = screen.getByRole('button', {
        name: /save/i
    });

    user.click(name);
    user.keyboard('My playlist name');
    user.click(submit);

     await waitFor(() => {
        expect(mockSetMessage).toHaveBeenCalledWith(expect.stringMatching(/my playlist name/i), expect.any(Number));
    });
});
test('playlist name cleared after successful submission', async () => {
    const mockSetPlaylistTracks = jest.fn();
    renderPlaylist(undefined, mockSetPlaylistTracks);
    const myTrack = screen.queryByRole('heading', {
        name: /sound of silence/i
    });
    expect(myTrack).toBeInTheDocument();

    const name = screen.getByRole('textbox', {
        name: /new playlist name/i
    });
    const submit = screen.getByRole('button', {
        name: /save/i
    });

    user.click(name);
    user.keyboard('My playlist name');
    user.click(submit);   
    
    await waitFor(() => {
        expect(name.value).toBe('');
    });
    expect(mockSetPlaylistTracks).toHaveBeenCalled(); 
});
//Testing if track are removed needs to be done in App.test.js
// as that is where setPlaylistTracks state is defined
test('setAuth is called if token expired', () => {
    //set checkTokenExpired to mock return true
    const mockSetAuth = jest.fn();
    renderPlaylist(tracks, () => {}, undefined, undefined, mockSetAuth, new Date(1999, 1));

    const name = screen.getByRole('textbox', {
        name: /new playlist name/i
    });
    const submit = screen.getByRole('button', { 
        name: /save/i
    });

    user.click(name);
    user.keyboard('My playlist name');
    user.click(submit);

    expect(mockSetAuth).toHaveBeenCalled();
});
