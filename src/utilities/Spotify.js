import { generateRandomString } from "./utils";

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
        let url = 'https://api.spotify.com/v1/search?q=';
        url += encodeURIComponent(query);
        url += '&type=track';

        try{
            const response = await fetch(url, {
                headers: {
                    method: 'GET',
                    Authorization: 'Bearer ' + accessToken
                }
              });
            if(response.ok) {
                const json = await response.json();
                console.log(json);
                return json;
            }
        }
        catch(error) {
            console.log(error);
       }
        
    },
    post: async () => {

    }
};
export default Spotify;