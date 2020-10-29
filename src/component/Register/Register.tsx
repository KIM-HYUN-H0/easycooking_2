
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#AFDB9F',
        color: 'white',
        marginTop : theme.spacing(2),
    },
    avatar: {
        backgroundColor : theme.palette.secondary.main
    },
    paper : {
        display : 'flex',
        alignItems : 'center',
        flexDirection : 'column',
        marginTop : theme.spacing(3)
    }
}));

const Register = (props: any) => {
    const classes = useStyles();
    const {emailChange, PWChange, PW2Change, NICKChange, handleKeyPress, Register, result} = props;
    return (
        <Container maxWidth="xs" className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">Sign Up</Typography>
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