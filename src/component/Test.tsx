
import React, {useEffect} from 'react';
import db from '../config';

const Test = () => {

    useEffect(() => {
        db.collection('category').add({
            name : '부침류'
        })
        .then((doc) => {
            console.log('성공', doc.id)
        })
        .catch((err) => {
            console.error(err);
        })
    })
    return(
        <>
        Test
        </>
    )
}
export default Test;