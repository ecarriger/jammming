import React from "react";
import auth from '../utilities/auth';
import get from "../utilities/get";

const Auth = ({setIsAuth}) => {
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        let clientToken = '';

        const clientTokenRequestUrl = auth();

        clientToken = get(clientTokenRequestUrl);

        

        if(clientToken.length > 0) {
            setIsAuth(true);
        }
    };

    return (
        <section id="auth">
            <form onSubmit={handleAuthSubmit}>
                <input type="submit" />
            </form>
        </section>
    );
};

export default Auth;