import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardRecipe from "../CardRecipe/CardRecipe";
import { db } from '../../config';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    grid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 'auto',
        justifyContent: 'center'
    },
})
const Searchtitle = () => {

    const [search, setSearch] = useState<any>();
    const [result, setResult] = useState([]);
    const classes = useStyles();

    const keyPress = (e: any) => {
        if (e.key === 'Enter') {
            searchSubmit();
        }
    }
    const searchSubmit = () => {
        db.collection('board_title_search')
            .where('title', '==', search)
            .get()
            .then((datas) => {
                if (datas.size === 0) { console.log('결과없음') }
                datas.forEach(doc => {
                    doc.data().idx.map((a:number) => {
                        db.collection('board').where('idx', '==', a)
                        .get()
                        .then((realDocs) => {
                            realDocs.forEach((realdoc:any) => {
                                setResult(prev => prev.concat(realdoc.data()))
                            })
                        })
                    })
                });
            })
            .catch(err => { console.error(err) })

    }

    return (
        <>
            <Grid className={classes.grid}>
                <TextField id="standard-basic" label="요리명" name="search" onChange={e => setSearch(e.target.value)} onKeyPress={e => keyPress(e)} />
                <Button
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                    variant="contained" onClick={searchSubmit}>
                    검색
          </Button>
            </Grid>
            <Box className={classes.box}>
                {result !== undefined ?
                    result.map((data: any) => {
                        return (
                            <>
                                <CardRecipe
                                    idx={data.idx}
                                    title={data.title}
                                    author={data.author}
                                    date={data.date}
                                    view={data.view}
                                    like={data.like}
                                    thumbnail={data.thumbnail}
                                />
                            </>
                        )
                    })
                    :
                    null}
            </Box>
        </>
    )
}
export default Searchtitle;