
import React, {useState, useEffect} from 'react';
import {db} from '../../config';

const Test = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        test();
    }, [])
    const test = () => {
        setCount(prev => prev+1);
    }

    useEffect(() => {
        console.log(count);
    }, [count])

    useEffect(() => {
        setInterval(() => {
            console.log(count);
        },300)
    }, [])
    
    return(
        <>
        <button type="submit" onClick={(e:any) => test()}>dd</button>
        </>
    )
}
export default Test;