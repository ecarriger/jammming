import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Playlist from './Playlist';
import { checkTokenExpired } from '../utilities/utils';

//mock utilities module so checkTokenExpired can be set to return true or false
jest.mock('../utilities/utils');

const renderPlaylist = () => {
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
    const mockSetPlaylistTracks = jest.fn();
    const mockSetAuth = jest.fn();
    
    render(<Playlist playlistTracks={tracks} setPlaylistTracks={mockSetPlaylistTracks} setAuth={mockSetAuth}/>);

    return [mockSetPlaylistTracks, mockSetAuth];
}

describe('accessToken not expired', () => {
    //set checkTokenExpired to mock return false
    checkTokenExpired.mockImplementation(() => false);

    test('shows no tracks if none present', () => {
        render(<Playlist playlistTracks={[]} />);
    
        const tracks = screen.queryByRole('listitem');
    
        expect(tracks).not.toBeInTheDocument();
    });
    test('input name field can be typed into', () => {
        renderPlaylist();
        const input = screen.getByRole('textbox', {
            name: 'Playlist name'
        });
    
        user.click(input);
        user.keyboard('My playlist name');
    
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('My playlist name');
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
    test('handleTrackClick is run when track is clicked', () => {
        const [mockSetPlaylistTracks] = renderPlaylist();
        const tracks = screen.getAllByRole('listitem');
    
        for(const track of tracks) {
            user.click(track);
        }
    
        expect(mockSetPlaylistTracks).toHaveBeenCalledTimes(2);  
    });
    test('error message is shown if playlist is empty', () => {
        
        render(<Playlist playlistTracks={[]} setAuth={() => {}} setPlaylistTracks={() => {}} />);
        
        const submit = screen.getByRole('button', {
            name: /save/i
        });
        user.click(submit);
    
        const message = screen.getByText(/playlist is empty/i);
    
        expect(message).toBeInTheDocument();
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
    test.skip('playlist name and playlist tracks cleared after successful submission', async () => {
        renderPlaylist();
    
        const name = screen.getByRole('textbox', {
            name: 'Playlist name'
        });
        const submit = screen.getByRole('button', {
            name: /save/i
        });
    
        user.click(name);
        user.keyboard('My playlist name');
        user.click(submit);
    
        
        const playlistItems = screen.queryAllByRole('listitem');
    
        expect(name.value).toBe('');
        expect(playlistItems).not.toBeInTheDocument();
    });
});
describe('accessToken is expired', () => {
    //set checkTokenExpired to mock return true
    checkTokenExpired.mockImplementation(() => true);
    test.skip('setAuth is called if token expired', () => {
        jest.mock('../utilities/utils',() => {
            return false;
        });
        const [ mockSetAuth ] = renderPlaylist();
    
        const name = screen.getByRole('textbox', {
            name: 'Playlist name'
        });
        const submit = screen.getByRole('button', {
            name: /save/i
        });
    
        user.click(name);
        user.keyboard('My playlist name');
        user.click(submit);
    
        expect(mockSetAuth).toHaveBeenCalled();
    });
});
