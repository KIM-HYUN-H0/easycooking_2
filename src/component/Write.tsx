import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import db from '../config'
import { Editor } from "@toast-ui/react-editor";

const Write = () => {

    // const uploadImage = (blob:any) => {
    //     let formData = new FormData();
    //     formData.append("image", blob);
    //     return axios("http://localhost:3001/board/imageupload", {
    //         method: "POST",
    //         data: formData,
    //         headers: { "Content-type": "multipart/form-data" },
    //     }).then((response) => {
    //         if (response.data) {
    //             if (this.state.thumbnailcheck === 0) {
    //                 this.setState({
    //                     thumbnailchekc: 1,
    //                     thumbnail: response.data,
    //                 });
    //             }
    //             return response.data;
    //         }
    //         throw new Error("Server or network error");
    //     });
    // }

    // onAddImageBlob = (blob:any, callback) => {
    //     uploadImage(blob)
    //         .then((response:any) => {
    //             if (!response) {
    //                 throw new Error("Validation error");
    //             } else callback(response, "alt text");
    //         })
    //         .catch((error:any) => {
    //             console.log(error);
    //         });
    // }


    return (
        <>
            <TextField
                fullWidth
                style={{ margin: 'auto' }}
                label="요리 이름" />

            <FormControl
                fullWidth
                style={{ margin: 'auto' }}
            >
                <InputLabel>요리 종류</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    <MenuItem value="dd">
            "dddd"
          </MenuItem>
            </Select>
            </FormControl>

            <TextField
                fullWidth
                label="출처도 적어주세요 !" />
            {/* <Editor
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                placeholder="가장 마지막 사진이 썸네일로 자동저장됩니다."
                toolbarItems={["image"]}
                // hooks={{
                //     addImageBlobHook: async (blob, callback) => {
                //         const upload = await uploadImage(blob);
                //         callback(upload, "alt text");
                //         return false;
                //     },
                // }}
            /> */}

        </>
    )
}
export default Write;