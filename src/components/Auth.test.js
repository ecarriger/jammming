import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import Auth from './Auth';

const renderAuth = (
    auth = false, 
    setAuth = bool => auth = bool, 
    accessToken = 'abc123', 
    setAccessToken = token => accessToken = token, 
    setAccessTokenExpiration = () => {}
) => {
    render(<Auth 
        auth={auth}
        setAuth={setAuth}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setAccessTokenExpiration={setAccessTokenExpiration}
    />)
};

test('first test', () => {
    renderAuth();
});