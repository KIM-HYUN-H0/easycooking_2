import React, {useEffect, useState} from 'react';
import CardRecipe from './Repeat/CardRecipe';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import db from '../config';
import isEqual from 'lodash.isequal';
import { Link } from "react-router-dom";

const Recipe = (props:any) => {
    const [page,setPage] = useState(1);
    const [cards, setCards] = useState();
    useEffect(() => {
        db.collection("board").where("category","==",Number(props.idx))
        .get()
        .then((data) => {
            let docs:any = [];
            data.forEach((doc) => {
                docs.push(doc.data());
            })
            setCards(docs);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [page])

    return(
        <>
            
            {cards !== undefined ? 
            cards.map((data:any) => {
                return(
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
        </>
    )
}

export default Recipe;