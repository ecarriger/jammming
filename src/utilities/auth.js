import { generateRandomString } from "./utils";

const auth = () => {
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
    
    return url;
};

export default auth;