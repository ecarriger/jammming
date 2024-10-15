import { generateRandomString } from "./utils";

const auth = (stateKey) => {
    var client_id = '7549faaac87744f98288992bdaadfbde';
    var redirect_uri = 'http://localhost:3000/auth';

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope = 'playlist-modify-private playlist-modify-public';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
};

export default auth;