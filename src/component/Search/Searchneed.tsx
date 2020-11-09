import React, {useEffect, useState} from 'react';
import { db } from '../../config';
import Button from "@material-ui/core/Button";

const Searchneed = () => {
    const [need, setNeed]:any = useState([]);

    const test = () => {
        db.collection('board').where('needs', 'in', ['김','밥','단무지','맛살','햄','계란지단','볶음김치','참기름','깨'])
        .get()
        .then((data:any) => {
            console.log(data);
            data.forEach((doc:any) => {
                console.log(doc.data());
            })
        })
    }
    const testset = () => {
        setNeed(['김','밥','단무지','맛살','햄','계란지단','볶음김치','참기름','깨'])
    }
    console.log(need);

    return (
        <>
            <Button onClick={testset} >제료셋</Button> 
            <Button onClick={test} >테스트</Button>
        </>
    )
}
export default Searchneed;