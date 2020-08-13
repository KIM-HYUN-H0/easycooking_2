import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {db, dbs} from '../config'
import { Editor } from "@toast-ui/react-editor";
import axios from 'axios';
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from '@material-ui/core/Button';

const Write = () => {
    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState();
    const [content, setContent] = useState('');
    const [needs, setNeeds] = useState('');
    const [sauce, setSauce] = useState('');
    const [source, setSource] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const SetRecipe = () => {
        const RecipeData = {
            author: '',
            title: title,
            category: category,
            content: '',
            needs: [],
            sauce: [],
            source: source,
            thumbnail: '',
            view : 0,
            like : 0,
            hate : 0
        }
        db.collection('board').add(RecipeData)
            .then((res) => {
                console.log('complete, ', res);
            })
            .catch((err) => {
                console.error(err);
            })
    }
    
    interface Foo {
        idx: number;
        name: string;
    }

    useEffect(() => {
        let docs: any = [];
        db.collection('category').get()
            .then((data) => {
                data.forEach((doc) => {
                    const a: Foo = {
                        name: doc.data().name,
                        idx: doc.data().idx
                    }
                    docs.push(a);
                })
                setCategories(docs);

            })
            .catch((err) => {
                console.error(err);
            })
    }, [])


    return (
        <>
            <TextField
                fullWidth
                style={{ margin: 'auto' }}
                label="요리 이름"
                onChange={e => setTitle(e.target.value)} />

            <FormControl
                fullWidth
                style={{ margin: 'auto' }}
            >
                <InputLabel>요리 종류</InputLabel>
                <Select
                value={category}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e:any) => setCategory(e.target.value)}
                >
                    {categories !== undefined ?
                        categories.map((data: any) => {
                            return (
                                <MenuItem value={data.idx}>
                                    {data.name}
                                </MenuItem>
                            )
                        }) : null}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="출처도 적어주세요 !"
                onChange={e => setSource(e.target.value)} />
            <Editor
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                placeholder="가장 마지막 사진이 썸네일로 자동저장됩니다."
                toolbarItems={["image"]}
                // ref={editorRef}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                        const upload = await uploadImage(blob);
                        callback(upload, 'alt text');
                        return false;
                    },
                }}
            />
            <Button variant="outlined" onClick={SetRecipe}>작성</Button>

        </>
    )
}
export default Write;