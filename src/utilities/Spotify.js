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
const post = async (url, data, accessToken) => {
    const dataJSON = JSON.stringify(data);
    const request = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: dataJSON
    }    
    try{
        const response = await fetch(url, request);
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

            window.localStorage.setItem('state', state);
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
        },
        extractExpiration: () => {
            const returnedExpiration = 15; //window.location.href.match(/(?<=expires_in=)(\d*)(?=&state)/);
            const expDate = new Date();
            expDate.setSeconds(expDate.getSeconds() + Number(returnedExpiration[0]));
            return expDate;
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
    
    postNewPlaylist: async (playlistName, userId, accessToken) => {
        //Using relative path with proxy server during development 
        const base = '/api';
        const midpoint = '/users/';
        const endpoint = '/playlists';
        const url = base + midpoint + userId + endpoint;

        const body = {name: playlistName, public: false};

        const results = await post(url, body, accessToken);
        return results;
    },
    postTracksToPlaylist: async (playlistID, trackUrisToSave, accessToken) => {
        //Using relative path with proxy server during development 
        const base = '/api';
        const midpoint = '/playlists/';
        const endpoint = '/tracks'
        const url = base + midpoint + playlistID + endpoint;

        const body = {"uris": trackUrisToSave};

        const results = await post(url, body, accessToken);
        return results;
    }
};
export default Spotify;