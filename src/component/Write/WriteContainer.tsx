import React, { useEffect, useState, createRef } from 'react';
import { db, dbs } from '../../config'
import Write from './Write';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setCategory } from '../../modules/categoryControl';
import { boardReset } from '../../modules/boardControl';

const WriteContainer = (props: any) => {

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
                    source: source,
                    thumbnail: thumb === null ? '' : thumb[thumb.length - 1],
                    view: 0,
                    like: 0,
                    hate: 0,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    idx: idx
                }
                db.collection('board').add(RecipeData)
                    .then((res) => {
                        let words: any = [];
                        RecipeData.title.split(' ').map((word) => {
                            for (let i = 0; i < word.length; i++) {
                                for (let j = i + 1; j <= word.length; j++) {
                                    if (words.findIndex((a:any) => a.title === word.slice(i, j)) === -1) {
                                        words.push({ title: word.slice(i, j), idx: RecipeData.idx })
                                    }
                                }
                            }
                        })
                        words.map((word: any) => {
                            db.collection('board_title_search').where('title', '==', word.title)
                                .get()
                                .then((result: any) => {
                                    if (result.size > 0) {
                                        result.forEach((b: any) => {
                                            db.collection('board_title_search').doc(b.id)
                                                .update({ idx: [...b.data().idx, word.idx] })
                                            console.log('넣었어')
                                        })
                                    }
                                    else {
                                        db.collection('board_title_search')
                                            .add({ title: word.title, idx: [word.idx] })
                                        console.log('새로만들었어')
                                    }
                                })
                        })
                        dispatch(boardReset());
                        // props.history.push('/board/0');
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

    return (
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