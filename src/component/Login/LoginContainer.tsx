import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config';
import Login from './Login';

const LoginContainer = (props:any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');

    const IDChange = (e: any) => {
        setEmail(e.target.value);
    }
    const PWChange = (e: any) => {
        setPassword(e.target.value);
    }
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            doLogin();
        }
    }
    const doLogin = async () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push('/board/0');
            })
            .catch((err) => {
                console.log(err.code, err.Mmssage);
            })
    }
    return(
        <>
        <Login 
        IDChange={IDChange}
        PWChange={PWChange}
        handleKeyPress={handleKeyPress}
        Login={doLogin}
        result={result}
        />
        </>
    )
}

export default LoginContainer;