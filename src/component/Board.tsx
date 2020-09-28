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
import Pagination from '@material-ui/lab/Pagination';

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
    }
}));


const Board = (props: any) => {
    const [pageCount, setPageCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(0);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleopen = () => {
        setOpen(1);
    }
    const handleclose = () => {
        setOpen(0);
        
    }
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
        let docs:any = [];
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
                                const check = cards.findIndex((i:any) => i.idx === doc.data().idx);
                                if(check === -1) {
                                    docs.push(doc.data());
                                }
                            })
                            
                            setCards((prev) => prev.concat(docs));  
                            setPageCount(prev => prev+1);
                            
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
                                const check = cards.findIndex((i:any) => i.idx === doc.data().idx);
                                if(check === -1) {
                                    docs.push(doc.data());
                                }
                            })
                            
                            setCards((prev) => prev.concat(docs));  
                            setPageCount(prev => prev+1);
                            
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
        }
    }


    const callback = (entries: any, observer: any) => {
        if(entries[0].isIntersecting) {
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
                <Button style={{ color: "#b8dea8" }} onClick={handleopen}>
                    Category
                </Button>
                <Modal
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    open={Boolean(open)}
                    onClose={handleclose}
                    aria-labelledby="CategoryModal"
                    aria-describedby="Category"
                >
                    <>
                        <div className={classes.modal}>
                            {
                                category !== undefined ?
                                    category.map((data: any) => {
                                        return (
                                            <Link to={'/board/' + data.idx} style={{ textDecoration: "none", color: 'black' }} onClick={handleclose}>
                                                <Typography>{data.name}</Typography>
                                            </Link>
                                        )
                                    }) : null}
                        </div>
                    </>
                </Modal>
                <Button component={Link} to="/write" variant="outlined">글쓰기</Button>
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
                    <div id="target" ></div>
            </Box>

        </>
    )
}
export default Board;