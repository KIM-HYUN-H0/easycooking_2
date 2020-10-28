import React, { useState, useEffect, createRef, useRef } from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from '@material-ui/core/Button';

const Write = (props:any) => {
    
    const {setTitle, setCategory, setSource, SetRecipe, uploadImage, category, categories, content} = props;
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
                    onChange={(e: any) => setCategory(e.target.value)}
                >
                    {categories !== undefined ?
                        categories!.map((data: any) => {
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
                ref={content}
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