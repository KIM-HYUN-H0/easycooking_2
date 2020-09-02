
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    button : {
        backgroundColor : '#AFDB9F',
        color : 'white'
      }
}));

const Register = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [nickname, setNickname] = useState('');
    const [result, setResult] = useState('');

    const IDChange = (e:any) => {
        setId(e.target.value)
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
        console.log('register');
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
                id="username"
                label="ID"
                name="username"
                autoComplete="id"
                autoFocus
                onChange={(e) => IDChange(e)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
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
                label="password"
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