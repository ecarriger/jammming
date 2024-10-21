import { generateRandomString } from "./utils";

const get = async (url, accessToken) => {
    try{
        const response = await fetch(url, {
            headers: {
                method: 'GET',
                Authorization: 'Bearer ' + accessToken
            }
        });
        if(response.ok) {
            const json = await response.json();
            return json;
        }
    }
    catch(error) {
        console.log(error);
   }
};

const Spotify = {
    auth: {
        requestAccessToken: () => {
            const client_id = '7549faaac87744f98288992bdaadfbde';
            const redirect_uri = 'http://localhost:3000';

            const state = generateRandomString(16);

            localStorage.setItem('state', state);
            const scope = 'playlist-modify-private';

            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);

            window.location = url;
        },
        checkUrlForAccessToken: () => {
            const browserUrl = window.location.href;
            return browserUrl.includes("access_token=");
        },
        extractAccessToken: () => {
            const returnedAccessToken = window.location.href.match(/(?<=access_token=)(.*)(?=&token_type)/);
            return returnedAccessToken[0];
        }
    },
    getTracks: async (query, accessToken) => {
        //Using relative path with proxy server during development 
        const base = '/api';
        const endpoint = '/search';
        const url = base + endpoint + '?type=track&q=' + encodeURIComponent(query);

        const results = await get(url, accessToken);
        return results;      
    },
    getUserId: async (accessToken) => {
        //Using relative path with proxy server during development 
        const base = '/api';
        const endpoint = '/me';
        const url = base + endpoint;

        const results = await get(url, accessToken);
        return results;
    },
    post: async (url, accessToken) => {
        try{
            const response = await fetch(url, {
                headers: {
                    method: 'POST',
                    Authorization: 'Bearer ' + accessToken
                }
            });
            if(response.ok) {
                const json = await response.json();
                return json;
            }
        }
        catch(error) {
            console.log(error);
       }
    },
    postNewPlaylist: async (playlistName, accessToken) => {

    },
    postTracksToPlaylist: async (playlistName, trackUrisToSave, accessToken) => {

    }
};
export default Spotify;