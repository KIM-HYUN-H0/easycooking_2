import React, { useState, useEffect } from 'react';
import { db } from '../../config';

const Test = () => {

    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [writelist2, setWritelist2] = useState([]);
    
    const test = () => {
        db.collection('board').get()
        .then((datas:any) => {
            let temp:any = [];
            datas.forEach((data:any) => {
                data.data().needs.map((need:string) => {
                    if(temp.indexOf(need.trim()) === -1) {
                        temp.push(need.trim())
                    }
                })                
            })
            setList(temp);
        })
    }

    const test2 = () => {
            db.collection('needs').doc('needs').set({'need' : list})
    }

    console.log(list);


    return (
        <>
            <button type="submit" onClick={test}>모든문서가져오기</button>
            <button type="submit" onClick={test2}>업로딩</button>
            {/* <button type="submit" onClick={test3}>업데이트</button>
            <button type="submit" onClick={test4}>업로드</button>
            <button type="submit" onClick={test5}>체크</button>
            <button type="submit" onClick={test6}>검색기능</button> */}
            {list.length > 0 ?
                list.map((data: any) => {
                    return (
                        <>
                            <div>{data}</div>
                        </>
                    )
                })
                : null}
        </>
    )
}
export default Test;