import React, {useState} from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Editor.css';
import axios from "axios";
import resourceClient from "../../api/resourceClient.ts";

interface EditorProps {
    data : string;
    setData : (data: string)=> void;
}
const Editor:React.FC = ({data, setData}:EditorProps)=>{
    const BASE_URL = 'http://localhost:8080';

    const createUploadAdapter = (loader: any) => {
        return {
            upload: async () => {
                const file = await loader.file;
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await resourceClient.post("editor/image-upload", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    // 응답은 { url: 'https://...' } 형식이어야 함
                    return {
                        default: response.data.default,
                    };
                } catch (error) {
                    console.error('Upload failed:', error);
                    throw error;
                }
            },

            abort: () => {
                // axios는 요청을 취소하려면 CancelToken 설정이 필요함
            },
        };
    };


    return (
        <div>

            <CKEditor
                editor={ClassicEditor}
                data={data}
                config={{
                    language: 'ko',
                }}
                onReady={(editor) => {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
                        createUploadAdapter(loader);
                }}
                onChange={(event, editor) => {

                    const data = editor.getData();
                    setData(data);
                    console.log('변경되는 데이터 확인',{event, editor, data});
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            {/*<div>*/}
            {/*    <h3>Output HTML</h3>*/}
            {/*    <div className="ck-content" dangerouslySetInnerHTML={{__html: data}}/>*/}
            {/*</div>*/}
        </div>
    )
}
export default Editor;