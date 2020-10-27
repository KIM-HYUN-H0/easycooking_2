import React, { useState, useEffect, useRef } from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardRecipe from './Repeat/CardRecipe';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    box: {
        display : 'flex',
        flexWrap : 'wrap',
        flex : 'auto',
        justifyContent : 'center'
    },
    top: {
        marginTop: 10,
        textAlign: 'center'
    },
    page: {
        display: 'inline-block',
        marginTop: 50
    },
    category: {
        display: 'flex',
        justifyContent: 'space-around',
        borderBottom: '1px solid gray',
        maxWidth: '1024px',
        margin: 'auto',
        marginTop: theme.spacing(3),
        paddingBottom: theme.spacing(2)
    },
    categoryItems: {
        '&:hover': {
            backgroundColor: 'gray'
        }
    },
    addButton : {
        position : 'fixed',
        bottom : '100px',
        right : '50px',
        backgroundColor : '#AFDB9F',
        color : 'white'
    },
    progress : {
        position : 'fixed',
        top : '50%',
        left : '50%',
    }
}));


const Board = (props: any) => {
    const classes = useStyles();

    return (
        <>
        {props.isLoading ?
        <CircularProgress className={classes.progress}/>
        :
        null
        }
            <div className={classes.top}>
                <div className={classes.category}>
                    {
                        props.category.length ?
                            props.category.map((data: any) => {
                                return (
                                    <Link to={'/board/' + data.idx} className={classes.categoryItems} style={{ textDecoration: "none", color: 'black' }}>
                                        <Typography>{data.name}</Typography>
                                    </Link>
                                )
                            }) : null}
                </div>
            </div>
            {/* 레시피 부분 */}

            <Box className={classes.box}>
                {props.cards !== undefined ?
                    props.cards.map((data: any, i: number) => {
                        return (
                            <>
                                <CardRecipe
                                    idx={data.idx}
                                    title={data.title}
                                    author={data.author}
                                    date={data.date}
                                    view={data.view}
                                    like={data.like}
                                    hate={data.hate}
                                    thumbnail={data.thumbnail}
                                />
                            </>
                        )
                    }) : null}
                <Fab component={Link} to="/write" className={classes.addButton}>
                    <AddIcon />
                </Fab>

                <div id="target" ></div>
            </Box>

        </>
    )
}
export default Board;