import React, {useState, useEffect} from 'react';
import { db } from '../config'
import firebase from 'firebase';
import Detail from '../component/Detail';

const DetailContainer = (props:any) => {
    const [data, setData] = useState<any>();
    const [doc, setDoc] = useState<any>(null);
    const [open, setOpen] = useState(0);

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
                    db.collection('board').doc(doc.id)
                        .update({ view: firebase.firestore.FieldValue.increment(1) })
                        .then((data) => {
                            setData(doc.data()!)
                            setDoc(doc.id!);
                        })
                })

            })
            .catch((err) => {
                console.error(err);
            })
    }

    const hate = () => {
        db.collection('board').doc(doc)
            .update({ hate: firebase.firestore.FieldValue.increment(1) })
            .then(() => { load() })
    }
    const like = () => {
        db.collection('board').doc(doc)
            .update({ like: firebase.firestore.FieldValue.increment(1) })
            .then(() => { load() })
    }

    const deleteContent = () => {
        alert('삭제되었습니다.');
        db.collection('board').doc(doc)
            .delete()
            .then(() => {
                console.log('delete')
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
        hate={hate}
        open={open}
        data={data}
        />
        </>
    )
}

export default DetailContainer;