import React, {useState} from "react";
import {MemoFormData} from "../types/memo.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import {createMemo} from "../api/memo.ts";
import {jwtDecode} from "jwt-decode";
import "./MemoForm.css";
import {useForm} from "react-hook-form";
import {memoTitleValidation} from "../../../shared/utill/validation/validationRules.ts";

interface MemoFormProps {
    onSubmit: (data: { title: string, dueDate: string }) => void;
    defaultValues?: { title: string, dueDate: string };
}

const MemoForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {token} = useAuth();

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({})

    const onSubmit = async (data: MemoFormData) => {
        setLoading(true);
        try {
            const decoded = jwtDecode(token);
            const formData = {
                ...data,
                createUserIdx: decoded.userIdx
            }
            const res = await createMemo(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (

        <form className="postit-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">제목</label>
            <input
                type="text"
                id="title"
                placeholder="제목을 입력하세요"
                {...register("title", memoTitleValidation)}
            />
            <label htmlFor="content">내용</label>
            <textarea
                id="content"
                rows={5}
                {...register("content")}
            />
            <button type="submit" className="postit-form-button">
                저장
            </button>
        </form>

    )
}
export default MemoForm;