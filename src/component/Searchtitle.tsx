import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardRecipe from "./Repeat/CardRecipe";
import { db } from '../config';

const useStyles = makeStyles({
    grid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})
const Searchtitle = () => {
    const [search, setSearch] = useState();
    const [result, setResult] = useState();
    const classes = useStyles();

    const keyPress = (e: any) => {
        if (e.key === 'Enter') {
            searchSubmit();
        }
    }
    const searchSubmit = () => {
        db.collection('board')
        .where('title', '>=', search)
        .where('title', '<=', search + '\uf8ff')
        .get()
            .then((datas) => {
                
                datas.forEach(doc =>
                    console.log(doc.data()))
            })
            .catch(err => { console.error(err) })

    }

    return (
        <Grid className={classes.grid}>
            <TextField id="standard-basic" label="요리명" name="search" onChange={e => setSearch(e.target.value)} onKeyPress={e => keyPress(e)} />
            <Button
                style={{ marginTop: '20px', marginBottom: '20px' }}
                variant="contained" onClick={searchSubmit}>
                검색
          </Button>
        </Grid>
    )
}
export default Searchtitle;