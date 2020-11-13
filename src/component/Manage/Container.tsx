import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db } from '../../config'
import Needs from './Needs';
import Category from './Category';

const Container = () => {

    const [list, setList] = useState([]);                   //재료

    useEffect(() => {
        db.collection('board').get()
            .then((datas: any) => {
                let temp: any = [];
                datas.forEach((data: any) => {
                    data.data().needs.map((need: string) => {
                        if (temp.indexOf(need.trim()) === -1) {
                            temp.push(need.trim())
                        }
                    })
                })
                setList(temp);
            })
    }, [])

    return (
        <>
            <Needs list={list} />  
        </>
    )
}

export default Container;