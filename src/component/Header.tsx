import React from 'react';
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

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        component="a"
                        href="/"
                        edge="start"
                        className={classes.homebutton}
                        color="inherit"
                        aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.flex}>내 냉장고를 부탁해</Typography>
                    <Button color="inherit">login</Button>
                    <Menu
                        open={Boolean(false)}>
                        <MenuItem>ㅋㅋ</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header;