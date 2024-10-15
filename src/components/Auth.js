import React from "react";

const Auth = () => {
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        alert('This should submit auth request');
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