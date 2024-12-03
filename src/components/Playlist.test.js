import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import {setupServer} from 'msw/node';
import { rest } from 'msw';

import { checkTokenExpired } from '../utilities/utils';
import Playlist from './Playlist';

//mock Spotify API
const handlers = [
    rest.get('/api/me', (req, res, ctx) => {
        return res(
            ctx.json({
                id: '123'
            })
        );
    }),
    rest.post('/api/users/playlists', (req, res, ctx) => {

    })
];
const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => {
    server.close();
});

//mock utilities module so checkTokenExpired can be set to return true or false
jest.mock('../utilities/utils', () => {
    return {
        convertMsToTime: () => {},
        checkTokenExpired: jest.fn()
    };
});
 
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
}];

const renderPlaylist = (playlistTracks = tracks, setPlaylistTracks = () => {}, setAuth = () => {}) => {
    render(<Playlist playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} setAuth={setAuth}/>);
}

describe('accessToken not expired', () => {
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
    test('handleTrackClick is run when track is clicked', () => {
        const mockSetPlaylistTracks = jest.fn();
        renderPlaylist(tracks, mockSetPlaylistTracks);
        const renderedTracks = screen.getAllByRole('listitem');
    
        for(const track of renderedTracks) {
            user.click(track);
        }
    
        expect(mockSetPlaylistTracks).toHaveBeenCalledTimes(2);  
    });
    test('playlist name cleared after successful submission', async () => {
        const mockSetPlaylistTracks = jest.fn();
        renderPlaylist(undefined, mockSetPlaylistTracks);
        const myTrack = screen.queryByRole('heading', {
            name: /sound of silence/i
        });
        expect(myTrack).toBeInTheDocument();
    
        const name = screen.getByRole('textbox', {
            name: 'Playlist name'
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
});
describe('accessToken is expired', () => {

    test('setAuth is called if token expired', () => {
        //set checkTokenExpired to mock return true
        checkTokenExpired.mockReturnValueOnce(true); 
        const mockSetAuth = jest.fn();
        renderPlaylist(tracks, () => {}, mockSetAuth);
    
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