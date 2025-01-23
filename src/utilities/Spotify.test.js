import Spotify from './Spotify';

describe('getUserId tests', () => {
    test('passing access token abc123 response contains user id 123', async () => {
        const accessToken = 'abc123';

        const response = await Spotify.getUserId(accessToken);

        expect(response.id).toBe('123');
    });
    test('passing access token xyz789 throws error', async () => {
        const accessToken = 'xyz789';

        const response = async () => {
            await Spotify.getUserId(accessToken);
        };

        await expect(response()).rejects.toThrow(/401: unauthorized/i);
    });
});
describe('getTracks tests', () => {
    test('passing access token xyz789 throws error', async () => {
        const accessToken = 'xyz789';
        const query = 'sound of silence';

        const response = async () => {
            await Spotify.getTracks(query, accessToken);
        };

        await expect(response()).rejects.toThrow(/401: unauthorized/i);
    });
    test('passing access token abc123 results in successful query', async () => {
        const accessToken = 'abc123';
        const query = 'sound of silence';

        const response = await Spotify.getTracks(query, accessToken);
        const trackName = response.tracks.items[0].name;

        expect(trackName).toMatch(/sound of silence/i);
    });
});
describe('postNewPlaylist tests', () => {
    test('passing access token xyz789 throws error', async () => {
        const playlistName = 'New playlist';
        const userId = '123';
        const accessToken = 'xyz789';

        const response = async () => {await Spotify.postNewPlaylist(playlistName, userId, accessToken)};

        await expect(response()).rejects.toThrow(/401: unauthorized/i);
    });
    test('passing access token abc123 returns new playlist id 456', async () => {
        const playlistName = 'New playlist';
        const userId = '123';
        const accessToken = 'abc123';

        const response = await Spotify.postNewPlaylist(playlistName, userId, accessToken);
        const newPlaylistId = response.id;

        expect(newPlaylistId).toBe('456');
    });
});
describe('postTracksToPlaylist tests', () => {
    test('passing access token xyz789 throws error', async () => {
        const playlistId = '456';
        const trackUrisToSave = ['1', '2', '3', '4', '5'];
        const accessToken = 'xyz789';

        const response = async () => {await Spotify.postTracksToPlaylist(trackUrisToSave, playlistId, accessToken)};

        await expect(response()).rejects.toThrow(/401: unauthorized/i);
    });
    test('passing access token abc123 returns snapshot id 789', async () => {
        const playlistId = '456';
        const trackUrisToSave = ['1', '2', '3', '4', '5'];
        const accessToken = 'abc123';

        const response = await Spotify.postTracksToPlaylist(trackUrisToSave, playlistId, accessToken);
        const snapshotID = response.snapshot_id;

        expect(snapshotID).toBe('789');
    });
});