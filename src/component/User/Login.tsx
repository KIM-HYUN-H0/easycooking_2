import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { db, auth } from '../../config';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#AFDB9F',
        color: 'white',
        marginTop : theme.spacing(2),
    },
    avatar: {
        backgroundColor : theme.palette.secondary.main
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop : theme.spacing(3)
    },
    grid : {
        marginTop : theme.spacing(2)
    }

}));

const Login = (props: any) => {
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
            <Container maxWidth="xs" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">Sign In</Typography>
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
                <Grid container className={classes.grid}>
                    <Grid item xs>
                        <Link to="/wait" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            <Typography>비밀번호 찾기</Typography>
                </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        <Typography>회원가입</Typography>
                </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default Login;