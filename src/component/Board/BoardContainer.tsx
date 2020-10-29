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
                        console.log(data);
                        const last = data.docs.length - (pageCount * 9);
                        db.collection("board")
                            .orderBy('idx', 'desc')
                            .startAt(last)
                            .limit(12)
                            .get()
                            .then((data) => {
                                let datas: any = [];
                                if (data.docs.length === 0) {
                                    setEndCheck(false);
                                }
                                data.forEach((doc) => {
                                    datas.push(doc.data())
                                })
                                dispatch(loadRecipe(datas));
                                setPageCount(prev => prev + 1);
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                    })
            }
            else {
                db.collection("board").where("category", "==", Number(props.match.params.idx))
                    .get()
                    .then((data) => {
                        const last = data.docs.length - (pageCount * 9);
                        db.collection("board")
                            .where("category", "==", Number(props.match.params.idx))
                            .orderBy('idx', 'desc')
                            .startAt(last)
                            .limit(12)
                            .get()
                            .then((data) => {
                                let datas: any = [];
                                if (data.docs.length === 0) {
                                    setEndCheck(false);
                                }
                                data.forEach((doc) => {
                                    datas.push(doc.data())
                                })
                                dispatch(loadRecipe(datas));
                                setPageCount(prev => prev + 1);
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