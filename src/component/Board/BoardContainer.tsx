import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { loadRecipe, boardReset } from '../../modules/boardControl';
import { setCategory } from '../../modules/categoryControl';
import Board from './Board';
import { db } from '../../config';


const BoardContainer = (props: any) => {
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [endCheck, setEndCheck] = useState(true);


    const board = useSelector((state: RootState) => state.boardControl);
    const category = useSelector((state: RootState) => state.categoryControl);
    const dispatch = useDispatch();


    const callback = (entries: any, observer: any) => {
        if (entries[0].isIntersecting) {
            LoadRecipe();
        }
    }

    useEffect(() => {
        const ioOptions = {
            root: null,                //element | null = viewport
            threshold: 1
        }
        const target = document.querySelector('#target');
        const io = new IntersectionObserver(callback, ioOptions);
        io.observe(target!);

        return () => {
            io.disconnect();
        }
    }, [pageCount, props.match.params.idx])

    useEffect(() => {
        if (!category.length) {
            db.collection('category').get()
                .then((data) => {
                    data.forEach((doc) => {
                        dispatch(setCategory(doc.data().idx, doc.data().name))
                    })
                })
        }
    }, [])

    const LoadRecipe = () => {
        if (endCheck) {
            setLoading(true);
            if (Number(props.match.params.idx) === 0) {
                db.collection('board')
                    .orderBy('idx')
                    .get()
                    .then((data) => {

                        const last = pageCount === 0 ? data.docs[data.docs.length-1].data().idx : pageCount;
                        //pagecount는 idx와 정비례하지만 limit는 비어있는건 그냥 스킵하기때문에 .. 고로 last변수를 수정하는게맞다.
                        //pagecount를 밑에서 재정의해주고, pagecount가 0일때는 last변수를 사용할 수 있게 
                        db.collection("board")
                            .orderBy('idx', 'desc')
                            .startAt(last)
                            .limit(12)
                            .get()
                            .then((data) => {
                                let datas: any = [];
                                data.forEach((doc) => {
                                    if(board.findIndex((a:any) => a.idx === doc.data().idx) === -1) {
                                        datas.push(doc.data())
                                    }
                                })
                                dispatch(loadRecipe(datas));
                                if(data.docs[data.docs.length-1].data().idx === 0) {
                                    setEndCheck(false);
                                }
                                else {
                                    setPageCount(data.docs[data.docs.length-1].data().idx - 1);
                                }
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                    })
            }
            else {                                              //수정필요 where랑 orderby가 같이안먹힘
                db.collection("board").where("category", "==", Number(props.match.params.idx))
                    .get()
                    .then((data) => {
                        const last = pageCount === 0 ? data.docs[data.docs.length-1].data().idx : pageCount;
                        db.collection("board")
                            .where("category", "==", Number(props.match.params.idx))
                            .orderBy('idx', 'desc')
                            .startAt(last)
                            .limit(12)
                            .get()
                            .then((data) => {
                                let datas: any = [];
                                if(data.size === 0) {
                                    setEndCheck(false)
                                }
                                else {
                                    data.forEach((doc) => {
                                        if(board.findIndex((a:any) => a.idx === doc.data().idx) === -1) {
                                            datas.push(doc.data())
                                        }
                                    })
                                    dispatch(loadRecipe(datas));
                                    if(data.docs[data.docs.length-1].data().idx === 0) {
                                        setEndCheck(false);
                                    }
                                    else {
                                        setPageCount(data.docs[data.docs.length-1].data().idx - 1);
                                    }
                                }
                                
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                    })
            }
        }
    }
    const boardResets = () => {
        dispatch(boardReset());
        setEndCheck(true);
        setPageCount(0);
        
    }
    return (
        <>
            <Board 
            cards={board} 
            isLoading={loading} 
            category={category} 
            boardReset={boardResets}
            />
        </>
    )
}

export default BoardContainer;