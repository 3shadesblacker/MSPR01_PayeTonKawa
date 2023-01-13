import React from 'react';
import './login.css';

const Login = () => {

    return (
        <>
            <h1>Paye Ton Kawa</h1>
            <div className='loginForm'>
                <h2>Identification</h2>
                <p>Afin de vous identifier sur l’application merci de renseigner votre adresse mail.</p>
                <input></input>
                <button>Envoyer mail    </button>
            </div>
        </>
    )
}

export default Login;