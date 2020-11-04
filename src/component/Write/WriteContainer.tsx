import React, {useEffect, useState, createRef} from 'react';
import { db, dbs } from '../../config'
import Write from './Write';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setCategory } from '../../modules/categoryControl';

const WriteContainer = () => {

    const nickname = useSelector((state: RootState) => state.userControl.nickname);
    const content: any = createRef();
    const [title, setTitle] = useState('');
    const [needs, setNeeds] = useState('');
    const [sauce, setSauce] = useState('');
    const [category, selectCategory] = useState('');
    const [source, setSource] = useState('');
    
    const categories = useSelector((state: RootState) => state.categoryControl);
    const dispatch = useDispatch();

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }               //https://stackoverflow.com/questions/105034/how-to-create-guid-uuid 고유한값

    const uploadImage = (blob: any) => {
        return dbs
            .child(uuidv4())
            .put(blob)
            .then(async (snapshot) => {
                let returnURL = '';
                await snapshot.ref.getDownloadURL().then((URL) => {
                    returnURL = URL;
                })
                return returnURL;
            })
    }

    const SetRecipe = () => {
        const content_true = content.current.getInstance().getHtml();
        const thumb = content_true.match(/http([^>\"']+)/g);
        let idx = 0;
        db.collection('autoIncrement').where('field', '==', 'board')
            .get().then((data: any) => {
                data.forEach((doc: any) => {
                    idx = doc.data().count
                })
            })
            .then(() => {
                const RecipeData = {
                    author: nickname,
                    title: title,
                    category: category,
                    content: content_true,
                    needs: [],
                    sauce: [],
                    source: source,
                    thumbnail: thumb.length === null ? '' : thumb[thumb.length-1],
                    view: 0,
                    like: 0,
                    hate: 0,
                    date : firebase.firestore.FieldValue.serverTimestamp(),
                    idx: idx
                }
                db.collection('board').add(RecipeData)
                    .then((res) => {
                        console.log('complete, ', res);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .then(() => {
                db.collection('autoIncrement').doc('board')
                    .update({ count: firebase.firestore.FieldValue.increment(1) })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (!categories.length) {
            db.collection('category').get()
                .then((data) => {
                    data.forEach((doc) => {
                        dispatch(setCategory(doc.data().idx, doc.data().name))
                    })
                })
        }
    }, [])

    return(
        <>
            <Write
            setTitle={setTitle}
            setCategory={selectCategory}
            setSource={setSource}
            SetRecipe={SetRecipe}
            uploadImage={uploadImage}
            category={category}
            categories={categories}
            content={content}
             />
        </>
    )
}

export default WriteContainer;