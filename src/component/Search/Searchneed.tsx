import React, {useEffect, useState} from 'react';
import { db } from '../../config';
import Button from "@material-ui/core/Button";

const Searchneed = () => {
    const [need, setNeed]:any = useState([]);

    const test = () => {
        db.collection('board').where('needs', 'array-contains', need)
        .get()
        .then((data:any) => {
            console.log(data);
            data.forEach((doc:any) => {
                console.log(doc.data());
            })
        })
    }

    return (
        <>
            <Button onClick={test} >테스트</Button>
        </>
    )
}
export default Searchneed;