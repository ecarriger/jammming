import React from "react";
import auth from '../utilities/auth';

const Auth = ({setIsAuth}) => {
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        alert('This should submit auth request');
        setIsAuth(true);
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