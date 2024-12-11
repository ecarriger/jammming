import Spotify from './Spotify';

//mock sessionStorage for tests
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: (...args) => mockGetItem(...args),
    setItem: (...args) => mockSetItem(...args),
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

//Clear window.location so it can be mocked
delete window.location;

describe('auth requestAccessToken tests', () => {
    test('sessionStorage is called to set Spotify state', () => {
        Spotify.auth.requestAccessToken();

        expect(mockSetItem).toHaveBeenCalled();
    });
    test('navigates to spotify', () => {
        window.location = {
            href: 'http://localhost/'
        };
        Spotify.auth.requestAccessToken();

        const url = window.location;

        expect(url).toContain('https://accounts.spotify.com/authorize');
    });
});
describe('auth checkUrlForAccessToken tests', () => {
    test('returns false if http://localhost/', () => {
        window.location = {
            href: 'http://localhost/'
        };
        
        const accessTokenIsInUrl = Spotify.auth.checkUrlForAccessToken();

        expect(accessTokenIsInUrl).toBe(false);
    });
    test('returns true if http://localhost?access_token=abc123 is in url', () => {
        window.location = {
            href: 'http://localhost?access_token=abc123'
        };

        const accessTokenIsInUrl = Spotify.auth.checkUrlForAccessToken();

        expect(accessTokenIsInUrl).toBe(true);
    });
});
describe('auth extractAccessToken tests', () => {
    test('returns abc123 if ?access_token=abc123 is in url', () => {
        window.location = {
            href: 'http://localhost?access_token=abc123'
        };
        const accessToken = Spotify.auth.extractAccessToken();

        expect(accessToken).toBe('abc123');
    });
    test('returns abc123 if ?access_token=abc123&token_type is in url', () => {
        window.location = {
            href: 'http://localhost?access_token=abc123&token_type'
        };

        const accessToken = Spotify.auth.extractAccessToken();

        expect(accessToken).toBe('abc123');
    });
    test('throws error if token not found', () => {
        window.location = {
            href: 'http://localhost?token_type=abc123'
        };

        const shouldError = () => Spotify.auth.extractAccessToken();

        expect(shouldError).toThrow(/no token found/i);
    });
    test('throws error if more than one token found', () => {
        window.location = {
            href: 'http://localhost?access_token=abc123&access_token=xyz890&'
        };

        const shouldError = () => Spotify.auth.extractAccessToken();

        expect(shouldError).toThrow(/more than one token found/i);
    });
});
describe('auth extractExpiration tests', () => {
    test('returns a date if http://localhost?expires_in=3600 is in url', () => {
        window.location = {
            href: 'http://localhost?expires_in=3600'
        };

        const expiration = Spotify.auth.extractExpiration();
        const isDate = expiration instanceof Date;

        expect(isDate).toBe(true);
    });
    test('returns date 3600 seconds in the future if http://localhost?expires_in=3600 is in url', () => {
        window.location = {
            href: 'http://localhost?expires_in=3600'
        };

        const now = new Date();
        const expiration = Spotify.auth.extractExpiration();
        const difference = expiration.getTime() - now.getTime();

        //3600 seconds + 10 second buffer converted to milliseconds is 3610000
        expect(difference).toBeLessThan(3610000);
    });
    test('returns date 3600 seconds in the future if http://localhost?expires_in=3600&access_token=abc123 is in url', () => {
        window.location = {
            href: 'http://localhost?expires_in=3600&access_token=abc123'
        };

        const now = new Date();
        const expiration = Spotify.auth.extractExpiration();
        const difference = expiration.getTime() - now.getTime();

        //3600 seconds + 10 second buffer converted to milliseconds is 3610000
        expect(difference).toBeLessThan(3610000);
    });
    test('throws error if http://localhost/ is in url', () => {
        window.location = {
            href: 'http://localhost/'
        };

        const expError = () => Spotify.auth.extractExpiration();

        expect(expError).toThrow(/expiration not found/i);
    });
    test('throws error if http://localhost?expires_in= is in url', () => {
        window.location = {
            href: 'http://localhost?expires_in='
        };

        const expError = () => Spotify.auth.extractExpiration();

        expect(expError).toThrow(/expiration not found/i);
    });
    test('throws error if http://localhost?expires_in=3600&expires_in=3600 is in url', () => {
        window.location = {
            href: 'http://localhost?expires_in=3600&expires_in=3600'
        };

        const expError = () => Spotify.auth.extractExpiration();

        expect(expError).toThrow(/more than one expiration found/i);
    });
});
describe('auth extractState tests', () => {
    test('returns abcdefgh12345678 when http://localhost?state=abcdefgh12345678 is in the url', () => {
        window.location = {
            href: 'http://localhost?state=abcdefgh12345678'
        }

        const state = Spotify.auth.extractState();

        expect(state).toBe('abcdefgh12345678');
    });
    test('returns abcdefgh12345678 when http://localhost?state=abcdefgh12345678&access_token=abc123 is in the url', () => {
        window.location = {
            href: 'http://localhost?state=abcdefgh12345678&access_token=abc123'
        };

        const state = Spotify.auth.extractState();

        expect(state).toBe('abcdefgh12345678');
    });
    test('throws error if url is http://localhost', () => {
        window.location = {
            href: 'http://localhost'
        };

        const stateError = () =>  Spotify.auth.extractState();

        expect(stateError).toThrow(/state not found/i);
    });
    test('throws error if url is http://localhost?state=', () => {
        window.location = {
            href: 'http://localhost'
        };

        const stateError = () =>  Spotify.auth.extractState();

        expect(stateError).toThrow(/state not found/i);
    });
    test('throws error if url is http://localhost?state=abcdefgh12345678&state=abcdefgh12345678', () => {
        window.location = {
            href: 'http://localhost?state=abcdefgh12345678&state=abcdefgh12345678'
        };

        const stateError = () =>  Spotify.auth.extractState();

        expect(stateError).toThrow(/more than one state found/i);
    });
});
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
});