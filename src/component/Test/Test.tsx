import React, { useState, useEffect } from 'react';
import { db } from '../../config';

const Test = () => {

    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [writelist2, setWritelist2] = useState([]);
    const test = () => {
        db.collection('board').get()
            .then((datas) => {
                let titles: any = [];
                datas.forEach((data) => {
                    let a = data.data().title.split(' ');
                    titles.push({ title: a, idx: data.data().idx });
                })
                setList(titles);
            })
    }
    const test2 = () => {
        let result: any = [];
        list.map((data: any) => {
            for (let i = 0; i < data.title.length; i++) {
                for (let j = 0; j < data.title[i].length; j++) {       //start
                    for (let k = j + 1; k <= data.title[i].length; k++) {
                        result.push({ title: data.title[i].slice(j, k), idx: data.idx });
                    }
                }
            }
        })
        setList2(result);

    }
    const test3 = () => {
//title : '', idx : [] 형태로 만들어야한다
        let writelist:any = [];
        list2.map((data:any) => {
            const index = writelist.findIndex((a:any) => a.title === data.title);
            if(index !== -1) {
                if(writelist[index].idx.indexof(data.idx) === -1) {
                    writelist[index].idx.push(data.idx);
                }
            }
            else {
                writelist.push({title : data.title, idx : [data.idx]})
            }
        })
        console.log(writelist);
        setWritelist2(writelist);
    }
    const test4 = () => {
        writelist2.map((data:any) => {
            db.collection('board_title_search').add(data)
            .then((result:any) => {
                console.log('성공', result)
            })
            .catch((err) => { console.error(err)})
        })
    }
    const test5 = () => {
        db.collection('board_title_search').get()
        .then((data) => {
            console.log(data.size);
        })
    }

    return (
        <>
            <button type="submit" onClick={test}>제목가져오기</button>
            <button type="submit" onClick={test2}>제목나누기</button>
            <button type="submit" onClick={test3}>업데이트</button>
            <button type="submit" onClick={test4}>업로드</button>
            <button type="submit" onClick={test5}>체크</button>
            {list.length > 0 ?
                list.map((data: any) => {
                    return (
                        <>
                            <div>{data.title}, {data.idx}</div>
                        </>
                    )
                })
                : null}
        </>
    )
}
export default Test;