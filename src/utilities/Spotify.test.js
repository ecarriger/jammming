import Spotify from "./Spotify";

//mock sessionStorage for tests
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem: (...args) => mockGetItem(...args),
    setItem: (...args) => mockSetItem(...args),
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

describe('auth requestAccessToken tests', () => {
    test('sessionStorage is called to set Spotify state', () => {
        Spotify.auth.requestAccessToken();

        expect(mockSetItem).toHaveBeenCalled();
    });
});
describe('auth checkUrlForAccessToken tests', () => {
    test('returns false if http://localhost/', () => {
        delete window.location;
        window.location = {
            href: "http://localhost/"
        };
        
        const accessTokenIsInUrl = Spotify.auth.checkUrlForAccessToken();

        expect(accessTokenIsInUrl).toBe(false);
    });
    test('returns true if http://localhost?access_token=abc123 is in url', () => {
        delete window.location;
        window.location = {
            href: "http://localhost?access_token=abc123"
        };

        const accessTokenIsInUrl = Spotify.auth.checkUrlForAccessToken();

        expect(accessTokenIsInUrl).toBe(true);
    });
});
describe('auth extractAccessToken tests', () => {
    test('returns abc123 if ?access_token=abc123 is in url', () => {
        delete window.location;
        window.location = {
            href: "http://localhost?access_token=abc123"
        };
        const accessToken = Spotify.auth.extractAccessToken();

        expect(accessToken).toBe('abc123');
    });
    test('returns abc123 if ?access_token=abc123&token_type is in url', () => {
        delete window.location;
        window.location = {
            href: "http://localhost?access_token=abc123&token_type"
        };

        const accessToken = Spotify.auth.extractAccessToken();

        expect(accessToken).toBe('abc123');
    });
    test('throws error if token not found', () => {
        delete window.location;
        window.location = {
            href: "http://localhost?token_type=abc123"
        };

        const shouldError = () => Spotify.auth.extractAccessToken();

        expect(shouldError).toThrow(/no token found/i);
    });
    test('throws error if more than one token found', () => {
        delete window.location;
        window.location = {
            href: "http://localhost?access_token=abc123&access_token=xyz890&"
        };

        const shouldError = () => Spotify.auth.extractAccessToken();

        expect(shouldError).toThrow(/more than one token found/i);
    });
});
