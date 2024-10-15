import React from "react";
import auth from '../utilities/auth';
import get from "../utilities/get";

const Auth = ({setAccessToken}) => {
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        let urlParams = window.location.href;
        if(urlParams.includes("access_token=")) {
            const returnedAccessToken = urlParams.match(/(?<=access_token=)(.*)(?=&token_type)/);
            console.log(returnedAccessToken[0]);
            setAccessToken(returnedAccessToken[0]);
        }
        else {
            window.location = auth();
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