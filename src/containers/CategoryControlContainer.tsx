import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setCategory } from '../modules/categoryControl';
import CategoryControl from '../component/CategoryControl';
import { db } from '../config';

const CategoryControlContainer = () => {
    const category = useSelector((state: RootState) => state.categoryControl);
    const dispatch = useDispatch();

    console.log(category);
    const set = () => {
        db.collection('category').get()
            .then((data) => {
                data.forEach((doc) => {
                    dispatch(setCategory(doc.data().idx, doc.data().name))
                })
                
            })
    }

    return (
        <>
            {/* <CategoryControl 
        category={category} /> */}
            <button onClick={set}>버튼</button>
        </>
    )
}

export default CategoryControlContainer;