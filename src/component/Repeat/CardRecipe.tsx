import React, { useRef } from "react";
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
import axios from "axios";

const useStyles = makeStyles({
    box: {
        marginTop : 10,
        marginLeft : 10
    },
    root: {
        width: 300,
        '&:hover' : {
            opacity:0.5
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
})

const CardRecipe = (props: {
    idx : number,
    title : string,
    author : string,
    date : string,
    view : number,
    like : number,
    hate : number,
    thumbnail : string,
    
}) => {
    const { idx, title, author, date, view, like, hate, thumbnail} = props;
    const classes = useStyles();
    const doLike = () => {
        console.log('like')
    }
    const doHate = () => {
        console.log('hate');
    }
    return (
        <>
            <Box className={classes.box} m={0} >
                <Card className={classes.root}>
                    <Link to={"/board/detail/" + idx} style={{ textDecoration: 'none', color : 'black' }}>
                        <CardHeader titleTypographyProps={{variant:'h6' }} title={title} subheader={date} />
                        <CardMedia
                            className={classes.media}
                            image={thumbnail}
                            title={title}
                            style={{ border: '1px solid gray' }}
                        ></CardMedia>
                        <CardContent>
                            <Typography>{author} 요리사</Typography>
                        </CardContent>
                    </Link>
                    <CardActions disableSpacing>
                        <IconButton color="inherit" aria-label="view">
                            <VisibilityIcon />
                            <Typography>{view}</Typography>
                        </IconButton>
                        <IconButton onClick={doLike} color="secondary" aria-label="add to favorites">
                            <ThumbUpAltIcon />
                            <Typography>{like}</Typography>
                        </IconButton>
                        <IconButton onClick={doHate} color="primary" aria-label="share">
                            <ThumbDownIcon />
                            <Typography>{hate}</Typography>
                        </IconButton>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}
export default CardRecipe;