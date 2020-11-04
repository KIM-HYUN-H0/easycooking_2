import React, {useState, useEffect} from 'react';
import { db } from '../../config'
import firebase from 'firebase';
import Detail from './Detail';
import { boardReset } from '../../modules/boardControl';
import { useDispatch } from 'react-redux';

const DetailContainer = (props:any) => {
    const [data, setData] = useState<any>();
    const [doc, setDoc] = useState<any>(null);
    const [open, setOpen] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        load();
    }, [])

    const handleopen = () => {
        setOpen(1);
    }
    const handleclose = () => {
        setOpen(0);
    }

    const load = () => {
        db.collection('board').where('idx', '==', Number(props.match.params.idx))
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    console.log(doc.data());
                    db.collection('board')
                        .doc(doc.id)
                        .update({ view: firebase.firestore.FieldValue.increment(1) })
                        .then((data2) => {
                            setData(doc.data()!)
                            setDoc(doc.id!);
                        })
                })

            })
            .catch((err) => {
                console.error(err);
            })
    }

    const like = () => {
        db.collection('board').doc(doc)
            .update({ like: firebase.firestore.FieldValue.increment(1) })
            .then(() => { load() })
    }

    const deleteContent = () => {
        db.collection('board').doc(doc)
            .delete()
            .then(() => {
                dispatch(boardReset());
                props.history.push('/board/0');
            })
            .catch((err) => {
                console.error(err);
            })
    }


    return(
        <>
        <Detail 
        deleteContent={deleteContent}
        handleopen={handleopen}
        handleclose={handleclose}
        like={like}
        open={open}
        data={data}
        />
        </>
    )
}

export default DetailContainer;