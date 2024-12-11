// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import { rest } from 'msw';

//mock Spotify API
const handlers = [
    rest.get('/api/me', (req, res, ctx) => {
        const accessToken = req.headers.get('Authorization');
        if(accessToken !== 'Bearer abc123') {
            return res(
                ctx.status(401)
            )
        }
        return res(
            ctx.json({
                id: '123'
            })
        );
    }),
    rest.get('/api/search', (req, res, ctx) => {
        return res(
            ctx.json({
                tracks: {
                    items: [{
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
                }
            })
        );
    }),
    rest.post('/api/users/*/playlists', (req, res, ctx) => {
        return res(
            ctx.json({
                id: '456',
                name: 'My playlist name'
            })
        )
    }),
    rest.post('/api/playlists/*/tracks', (req, res, ctx) => {
        return res(
            ctx.json({
                snapshot_id: '789'
            })
        )
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
