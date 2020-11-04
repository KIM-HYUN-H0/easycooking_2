import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles({
    box: {
        marginTop: 10,
        marginLeft: 10
    },
    root: {
        width: 300,
        '&:hover': {
            opacity: 0.5
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    date: {
        fontSize: 15,
        color: 'gray'
    },
    author: {
        fontSize: 20,
        marginLeft: 10
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center'
    }
})

const CardRecipe = (props: {
    idx: number,
    title: string,
    author: string,
    date: string,
    view: number,
    like: number,
    thumbnail: string,

}) => {
    const { idx, title, author, date, view, like, thumbnail } = props;
    const classes = useStyles();
    const doLike = () => {
        console.log('like')
    }
    return (
        <>
            <Box className={classes.box} m={0} >
                <Card className={classes.root}>
                    <Link to={"/board/detail/" + idx} style={{ textDecoration: 'none', color: 'black' }}>
                        <CardHeader titleTypographyProps={{ variant: 'h6' }} title={`${title}`} />
                        {thumbnail === '' ?
                            null
                            :
                            <CardMedia
                                className={classes.media}
                                image={thumbnail}
                                title={title}
                                style={{ border: '1px solid gray' }}
                            ></CardMedia>}

                        <CardContent className={classes.wrapper}>
                            <FaceIcon />
                            <Typography className={classes.author}>{author}</Typography>
                        </CardContent>

                        <CardActions disableSpacing>
                            <IconButton onClick={doLike} color="inherit" aria-label="add to favorites">
                                <ThumbUpAltIcon />
                                <Typography>{like}</Typography>
                            </IconButton>

                            <IconButton color="inherit" aria-label="view">
                                {/* <VisibilityIcon /> */}
                                <Typography>조회수 {view}</Typography>
                            </IconButton>

                        </CardActions>
                    </Link>
                </Card>
            </Box>
        </>
    )
}
export default CardRecipe;