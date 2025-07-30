import {useState} from "react";
import Editor from "../../../shared/component/editors/Editor.tsx";
import './NoticeModals.css';
import resourceClient from "../../../shared/api/resourceClient.ts";

interface NoticeModalsProps {
    isOpen: boolean;
    onClose :  () => void;
}
enum NoticeCategory {
    RELEASE = 'release',
    BASIC = 'basic',
    BUG_FIX = 'bug_fix',
}

const NoticeModals = ({isOpen, onClose}:NoticeModalsProps) =>{
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<NoticeCategory>(NoticeCategory.BASIC);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const options: Record<NoticeCategory,string> ={
        [NoticeCategory.RELEASE] : '릴리스',
        [NoticeCategory.BASIC] : '일반',
        [NoticeCategory.BUG_FIX] : '버그개선',
    }

    const noticeCategoryOptions = Object.entries(options).map(
        ([value, label]) => ({
            value: value as NoticeCategory,
            label,
        })
    );

    const handleSubmit = async ()=>{
        setLoading(true);

        const formData = {
            title: title,
            category: category,
            content: content,
        }
        try{
            const response = await resourceClient.post("notice", formData, {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            });

        }catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }
    const handleClose = ()=>{
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="notice-modal-overlay" onClick={onClose}>
            <div className="notice-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="notice-modal-header">
                    <h2>공지사항 작성</h2>

                    <div className="modal-footer">
                        <button onClick={handleSubmit}>생성</button>
                        <button onClick={handleClose}>닫기</button>
                    </div>
                </div>
                <div className="notice-modal-body">
                    <div className="notice-form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="공지사항 제목"
                        />
                    </div>
                    <div className="notice-form-group">
                        <label htmlFor="category">분류</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {noticeCategoryOptions.map((item)=>(
                                <option key={item.label} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="notice-form-group">
                        <label htmlFor="content">내용</label>
                           <Editor
                           data={content}
                           setData={setContent}
                           />
                    </div>
                </div>
                {/*<div className="modal-footer">*/}
                {/*    <button onClick={handleClose}>생성</button>*/}
                {/*    <button onClick={handleClose}>닫기</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )

}
export default NoticeModals;