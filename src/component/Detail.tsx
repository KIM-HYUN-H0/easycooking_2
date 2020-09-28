import React, { useState, useEffect } from 'react';
import { Viewer } from "@toast-ui/react-editor";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { db } from '../config'
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import firebase from 'firebase';
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
    box: {
        textAlign: 'center',
    },
    root: {
        width: '100%',
        display: 'inline-block',
        maxWidth: '1000px',
        minWidth: '350px'
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    modal: {
        position: "absolute",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign : 'center'
    },
}));

const Detail = (props: any) => {
    const [data, setData] = useState<any>();
    const [doc, setDoc] = useState<any>(null);
    const [open, setOpen] = useState(0);

    useEffect(() => {
        load();
    }, [])

    const handleopen = () => {
        setOpen(1);
    }
    const handleclose = () => {
        setOpen(0);
    }

    const load = () => {
        db.collection('board').where('idx', '==', Number(props.match.params.idx))
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    db.collection('board').doc(doc.id)
                        .update({ view: firebase.firestore.FieldValue.increment(1) })
                        .then((data) => {
                            setData(doc.data()!)
                            setDoc(doc.id!);
                        })
                })

            })
            .catch((err) => {
                console.error(err);
            })
    }

    const hate = () => {
        db.collection('board').doc(doc)
            .update({ hate: firebase.firestore.FieldValue.increment(1) })
            .then(() => { load() })
    }
    const like = () => {
        db.collection('board').doc(doc)
            .update({ like: firebase.firestore.FieldValue.increment(1) })
            .then(() => { load() })
    }

    const deleteContent = () => {
        alert('삭제되었습니다.');
        db.collection('board').doc(doc)
            .delete()
            .then(() => {
                console.log('delete')
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const classes = useStyles();
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <span>
                    <Button onClick={deleteContent}>
                        수정
                    </Button>
                </span>
                <span>
                    <Button onClick={handleopen}>
                        삭제
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
                                <div><Typography>정말로 삭제하시겠습니까?</Typography></div>
                                <Button onClick={deleteContent}>예</Button>
                                <Button onClick={handleclose}>아니요</Button>
                            </div>
                        </>

                    </Modal>
                </span>
            </div>
            {data !== undefined ?
                (
                    <>
                        <Box className={classes.box} m={0}>
                            <Card className={classes.root}>
                                <CardHeader title={data.title} subheader={'날짜'} />
                                <CardMedia
                                    className={classes.media}
                                    image={data.thumbnail}
                                    title={data.title}
                                    style={{ border: "1px solid gray" }}
                                ></CardMedia>
                                <CardContent>
                                    <Typography>{data.author} 요리사</Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>출처 {data.source}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton color="inherit" aria-label="view">
                                        <VisibilityIcon />
                                        <Typography>{data.view}</Typography>
                                    </IconButton>
                                    <IconButton
                                        onClick={like}
                                        color="secondary"
                                        aria-label="add to favorites"
                                    >
                                        <ThumbUpAltIcon />
                                        <Typography>{data.like}</Typography>
                                    </IconButton>
                                    <IconButton
                                        onClick={hate}
                                        color="primary"
                                        aria-label="share"
                                    >
                                        <ThumbDownIcon />
                                        <Typography>{data.hate}</Typography>
                                    </IconButton>
                                </CardActions>
                                <CardContent>
                                    <hr />
                                    <div id="viewer">
                                        <Viewer initialValue={data.content} />
                                    </div>
                                </CardContent>
                            </Card>
                        </Box>
                    </>
                ) : null}

        </>
    )
}
export default Detail;