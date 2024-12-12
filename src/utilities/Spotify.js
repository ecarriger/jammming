import { generateRandomString } from "./utils";

const get = async (url, accessToken) => {
    try{
        const response = 
        await fetch(url, {
            headers: {
                method: 'GET',
                Authorization: 'Bearer ' + accessToken
            }
        });
        if(response.ok) {
            const json = await response.json();
            return json;
        }
        else {
            throw new Error(`GET response status ${response.status}: ${response.statusText}`);
        }
    }
    catch(error) {
        console.log(error);
        throw error;
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
        else {
            throw new Error(`GET response status ${response.status}: ${response.statusText}`);
        }
    }
    catch(error) {
        console.log(error);
        throw error;
   }
};
const Spotify = {
    auth: {
        requestAccessToken: () => {
            const client_id = '7549faaac87744f98288992bdaadfbde';
            const redirect_uri = 'http://localhost:3000';

            const state = generateRandomString(16);
            sessionStorage.setItem('state', state);
            const showDialog = true;
            const scope = 'playlist-modify-private';

            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            url += '&show_dialog=' + encodeURIComponent(showDialog);

            window.location = url;
        },
        checkUrlForAccessToken: () => {
            const browserUrl = window.location.href;
            return browserUrl.includes("access_token=");
        },
        extractAccessToken: () => {
            const returnedAccessToken = window.location.href.match(/(?<=access_token=)([\w-]*)(?=(&|$))/g);
            if(!returnedAccessToken || !returnedAccessToken[0]) {
                throw new Error('No token found in url');
            }
            else if(returnedAccessToken.length > 1) {
                throw new Error('More than one token found in url');
            }

            return returnedAccessToken[0];
        },
        extractExpiration: () => {
            const returnedExpiration = window.location.href.match(/(?<=expires_in=)(\d*)(?=(&|$))/g);
            if(!returnedExpiration || !returnedExpiration[0]) {
                throw new Error('Expiration not found in url');
            }
            else if(returnedExpiration.length > 1) {
                throw new Error('More than one expiration found in url');
            }
            const expDate = new Date();
            expDate.setSeconds(expDate.getSeconds() + Number(returnedExpiration[0]));
            return expDate;
        },
        extractState: () => {
            const returnedState = window.location.href.match(/(?<=state=)[\w\d]{16}/g);
            if(!returnedState || !returnedState[0]) {
                throw new Error('State not found in url');
            }
            else if(returnedState.length > 1) {
                throw new Error('More than one state found in url');
            }
            return returnedState[0];
        }
    },
    getTracks: async (query, accessToken) => {
        //Using relative path with proxy server during development 
        const base = process.env.REACT_APP_API_ROOT + '/api';
        const endpoint = '/search';
        const urlQuery = '?type=track&q=' + encodeURIComponent(query);
        //http://localhost/api/search/?type=track&q=*
        const url = base + endpoint + urlQuery

        try {
            const results = await get(url, accessToken);
            return results;
        }
        catch(e) {
            console.log(e);
            throw new Error(e.message);
        }     
    },
    getUserId: async (accessToken) => {
        //Using relative path with proxy server during development 
        const base = process.env.REACT_APP_API_ROOT + '/api';
        const endpoint = '/me';
        //http://localhost/api/me
        const url = base + endpoint;

        try {
            const results = await get(url, accessToken);
            return results;
        }
        catch(e) {
            console.log(e);
            throw new Error(e.message);
        }
    },
    postNewPlaylist: async (playlistName, userId, accessToken) => {
        //Using relative path with proxy server during development 
        const base = process.env.REACT_APP_API_ROOT + '/api';
        const midpoint = '/users/';
        const endpoint = '/playlists';
        const url = base + midpoint + userId + endpoint;
        //http://localhost/api/users/*/playlists
        const body = {name: playlistName, public: false};

        try {
            const results = await post(url, body, accessToken);
            return results;
        }
        catch(e) {
            console.log(e);
            throw new Error(e.message);
        }
    },
    postTracksToPlaylist: async (playlistID, trackUrisToSave, accessToken) => {
        //Using relative path with proxy server during development 
        const base = process.env.REACT_APP_API_ROOT + '/api';
        const midpoint = '/playlists/';
        const endpoint = '/tracks'
        //http://localhost/api/playlists/*/tracks
        const url = base + midpoint + playlistID + endpoint;

        const body = {"uris": trackUrisToSave};

        try {
            const results = await post(url, body, accessToken);
            return results;
        }
        catch(e) {
            console.log(e);
            throw new Error(e.message);
        }
    }
};
export default Spotify;