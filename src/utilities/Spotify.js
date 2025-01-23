const get = async (url, accessToken) => {
    try{
        const response = 
        await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
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
    catch(e) {
        console.log(e);
        throw e;
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
    catch(e) {
        console.log(e);
        throw e;
   }
};
const Spotify = {
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
            throw e;
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
            throw e;
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
            throw e;
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
            throw e;
        }
    }
};

export default Spotify;