import React, {useEffect, useState} from 'react';
import Register from './Register';
import { db, auth } from '../../config';

const RegisterContainer = (props:any) => {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [nickname, setNickname] = useState('');
    const [result, setResult] = useState('');

    const emailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const PWChange = (e: any) => {
        setPw(e.target.value);
    }
    const PW2Change = (e: any) => {
        setPw2(e.target.value);
    }
    const NICKChange = (e: any) => {
        setNickname(e.target.value);
    }
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            doRegister();
        }
    }
    const doRegister = () => {
        auth.createUserWithEmailAndPassword(email, pw)
            .then((result) => {
                return result.user?.updateProfile({
                    displayName : nickname
                })
            })
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                console.log(errCode, errMessage);
            })
    }

    return(
        <>
            <Register 
            emailChange={emailChange}
            PWChange={PWChange}
            PW2Change={PW2Change}
            NICKChange={NICKChange}
            handleKeyPress={handleKeyPress}
            Register={doRegister}
            result={result}
            />

        </>
    )
}

export default RegisterContainer;