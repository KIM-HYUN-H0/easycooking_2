import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from '../config'
const useStyles = makeStyles((theme) => ({
    homebutton: {
        marginRight: theme.spacing(2),
    },
    flex: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "#AFDB9F",
        color: "white",
    },
}));

const Header = (props:any) => {
    const classes = useStyles();
    const [nickname, setNickname] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setNickname(user.email!);
            }
            else {
                setNickname('');
            }
        })
    }, [])

    const handleclick = (e: any) => {
        setAnchorEl(e.currentTarget)
    }
    const handleclose = () => {
        setAnchorEl(null);
    }
    const logout = () => {
        auth.signOut().then(() => {
            handleclose();
            props.history.push('/board')
        })
    }
    return (
        <div className={classes.flex}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton
                        component={Link}
                        to="/"
                        edge="start"
                        className={classes.homebutton}
                        color="inherit"
                        aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.flex}>내 냉장고를 부탁해</Typography>
                    <Button color="inherit">
                        {nickname === '' ?
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} >login</Link>
                            :
                            <>
                            {nickname} 님 안녕하세요.  
                                <Avatar
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={e => handleclick(e)}
                                >
                                    H
                                </Avatar>
                            </>
                        }
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleclose}
                    >
                        <MenuItem component={Link} to="/myrefri" onClick={handleclose}>내 냉장고</MenuItem>
                        <MenuItem component={Link} to="/info" onClick={handleclose}>내 정보</MenuItem>
                        <MenuItem component={Link} to="/" onClick={logout}>로그아웃</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header;