import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main : {
        width : '100%',
        marginTop : 30,
        maxWidth : '1024px',
        margin : 'auto',
        display : 'block'
    }
})

const Main = () => {
    const classes = useStyles();
    return(
        <>
            <img className={classes.main}
            src="https://www.thespruceeats.com/thmb/ZnWDXm0VjfY2wy25ocFqZccy5YY=/2164x1217/smart/filters:no_upscale()/freshvegetablesAlexRaths-4c1ea186a88e4fd7b95283eee614600c.jpg"></img>
        </>
    )
}

export default Main;