import React, { useState, useEffect } from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { db } from '../config';
import CardRecipe from './Repeat/CardRecipe';
import Box from "@material-ui/core/Box";

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
    top : {
        marginTop : 10,
        textAlign : 'center'
    }
}));
//수정 요망. useeffect 쓰지말고 usestate에 한번에 넣기
const Board = (props: any) => {
    const [page, setPage] = useState(1);

    const [cards, setCards] = useState();

    const [open, setOpen] = useState(0);
    const [category, setCategory] = useState();
    const handleopen = () => {
        setOpen(1);
    }
    const handleclose = () => {
        setOpen(0);
    }

    const classes = useStyles();

    interface Foo {
        idx: number;
        name: string;
    }

    useEffect(() => {
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

    useEffect(() => {
        if (Number(props.match.params.idx) === 0) {
            db.collection("board").orderBy('idx', 'desc')
                .get()
                .then((data) => {
                    let docs: any = [];
                    data.forEach((doc) => {
                        docs.push(doc.data());
                    })
                    setCards(docs);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            db.collection("board").where("category", "==", Number(props.match.params.idx))
                .get()
                .then((data) => {
                    let docs: any = [];
                    data.forEach((doc) => {
                        docs.push(doc.data());
                    })
                    setCards(docs);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [props.match.params.idx])


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
                                        <Link to={'/board/' + data.idx} style={{ textDecoration: "none" }} onClick={handleclose}>
                                            {data.name}
                                        </Link>
                                    )
                                }) : null}
                    </div>
                </>
            </Modal>
            <Button component={Link} to="/write" variant="outlined">글쓰기</Button>
        </div>
            {/* 레시피 부분 */ }
    <Box className={classes.box}>
        {cards !== undefined ?
            cards.map((data: any) => {
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
    </Box>
        </>
    )
}
export default Board;