import React from 'react';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        marginTop: '500px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        textAlign : 'center'
    },
    tabs : {
        width : '100%',
        display : 'inline-block',
        maxWidth : '1024px',
    }
})

const Content = () => {
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.root}>
                <Tabs variant="fullWidth" className={classes.tabs}>
                    <Tab
                        component={Link}
                        to="/board/0"
                        icon={<MenuBookIcon />}
                        label="Recipe"
                    />
                    <Tab
                        component={Link}
                        to="/search"
                        icon={<SearchIcon />}
                        label="Search"
                    />
                </Tabs>
            </Paper>
        </>
    )
}

export default Content;