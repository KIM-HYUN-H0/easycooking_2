
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { db, auth } from '../../config';

const useStyles = makeStyles((theme) => ({
    button : {
        backgroundColor : '#AFDB9F',
        color : 'white'
      }
}));

const Register = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [nickname, setNickname] = useState('');
    const [result, setResult] = useState('');

    const emailChange = (e:any) => {
        setEmail(e.target.value)
    }
    const PWChange = (e:any) => {
        setPw(e.target.value);
    }
    const PW2Change = (e:any) => {
        setPw2(e.target.value);
    }
    const NICKChange = (e:any) => {
        setNickname(e.target.value);
    }
    const handleKeyPress = (e:any) => {
        if(e.key === "Enter") {
            Register();
        }
    }
    const Register = () => {
        auth.createUserWithEmailAndPassword(email, pw)
        .then(() => {
            db.collection('users').doc(auth.currentUser!.uid)
            .set({
                nickname : nickname,
                email : email
            })
        })
        .catch(err => {
            const errCode = err.code;
            const errMessage = err.message;
            console.log(errCode, errMessage);
        })
    }

    const classes = useStyles();
    return (
        <Container maxWidth="xs">
            <div>회원가입</div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Email"
                label="E-mail"
                name="Email"
                autoComplete="Email"
                autoFocus
                onChange={(e) => emailChange(e)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={(e) => PWChange(e)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={(e) => PW2Change(e)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="nickname"
                label="Nickname"
                onChange={(e) => NICKChange(e)}
                onKeyPress={(e) => handleKeyPress(e)}
            />
            <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => Register()}
            >
                로그인
          </Button>
            {result}
        </Container>
    )
}
export default Register;