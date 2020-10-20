import React, { useState, useEffect, useRef } from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { db } from '../config';
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
        textAlign: 'center',
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
    }
}));


const Board = (props: any) => {
    const [pageCount, setPageCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCards([]);
    }, [props.match.params.idx])

    const classes = useStyles();

    useEffect(() => {                                       //카테고리 불러오기, redux 를 적용하고 나면 통합할 예정
        let docs: any = [];
        db.collection('category').get()
            .then((data) => {
                data.forEach((doc) => {
                    const a: Foo = {
                        name: doc.data().name,
                        idx: doc.data().idx
                    }
                    docs.push(a);
                })
                setCategory(docs);

            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    interface Foo {
        idx: number;
        name: string;
    }
    const LoadRecipe = () => {
        let docs: any = [];
        if (Number(props.match.params.idx) === 0) {
            db.collection('board')
                .orderBy('idx')
                .get()
                .then((data) => {
                    const last = data.docs.length - (pageCount * 9);
                    db.collection("board")
                        .orderBy('idx', 'desc')
                        .startAt(last)
                        .limit(12)
                        .get()
                        .then((data) => {
                            data.forEach((doc) => {
                                const check = cards.findIndex((i: any) => i.idx === doc.data().idx);
                                if (check === -1) {
                                    docs.push(doc.data());
                                }
                            })

                            setCards((prev) => prev.concat(docs));
                            setPageCount(prev => prev + 1);

                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
        }
        else {
            db.collection("board").where("category", "==", Number(props.match.params.idx))
                .get()
                .then((data) => {
                    const last = data.docs.length - (pageCount * 9);
                    db.collection("board")
                        .orderBy('idx', 'desc')
                        .startAt(last)
                        .limit(12)
                        .get()
                        .then((data) => {
                            data.forEach((doc) => {
                                const check = cards.findIndex((i: any) => i.idx === doc.data().idx);
                                if (check === -1) {
                                    docs.push(doc.data());
                                }
                            })

                            setCards((prev) => prev.concat(docs));
                            setPageCount(prev => prev + 1);

                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
        }
    }


    const callback = (entries: any, observer: any) => {
        if (entries[0].isIntersecting) {
            LoadRecipe();
        }
    }


    useEffect(() => {
        const ioOptions = {
            root: null,                //element | null = viewport
            threshold: 1
        }
        const target = document.querySelector('#target');
        const io = new IntersectionObserver(callback, ioOptions);
        io.observe(target!);

        return () => {
            io.disconnect();
        }
    }, [pageCount, props.match.params.idx])
    return (
        <>
            <div className={classes.top}>
                <div className={classes.category}>
                    {
                        category !== undefined ?
                            category.map((data: any) => {
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
                {cards !== undefined ?
                    cards.map((data: any, i: number) => {
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
                    }) : <CircularProgress />}
                <Fab component={Link} to="/write" className={classes.addButton}>
                    <AddIcon />
                </Fab>

                <div id="target" ></div>
            </Box>

        </>
    )
}
export default Board;