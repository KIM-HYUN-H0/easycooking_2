import React, { useState, useEffect } from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Recipe from './Recipe';
import db from '../config';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
//수정 요망. useeffect 쓰지말고 usestate에 한번에 넣기
const Board = (props: any) => {
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

    return (
        <>
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
                                    console.log('zz')
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
            <Recipe idx={props.match.params.idx}/>
        </>
    )
}
export default Board;