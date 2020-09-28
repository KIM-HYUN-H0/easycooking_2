import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {db, auth} from '../../config';


const useStyles = makeStyles((theme) => ({
    button : {
        backgroundColor : '#AFDB9F',
        color : 'white'
      }

}));

const Login = (props:any) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');

    const IDChange = (e:any) => {
        setEmail(e.target.value);
    }
    const PWChange = (e:any) => {
        setPassword(e.target.value);
    }
    const handleKeyPress = (e:any) => {
        if(e.key === "Enter") {
            Login();
        }
    }
    const Login = async () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            props.history.push('/board/0');
        })
        .catch((err) => {
            console.log(err.code, err.Mmssage);
        })
    }

    const classes = useStyles();
    
    return (
        <>
            <Container maxWidth="xs">
                <Typography component="h1" variant="h5">로그인하기</Typography>
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
                    onChange={(e) => IDChange(e)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => PWChange(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
                <Button
                    className={classes.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => Login()}
                >
                    로그인
            </Button>
                {result}
                <Grid container>
                    <Grid item xs>
                        <Link to="/wait" style={{ color: 'black', textDecoration: 'none' }}>
                            비밀번호 찾기
                </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>
                            회원가입
                </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default Login;