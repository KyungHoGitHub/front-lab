import {useState} from "react";

interface TestFormProps {
    onSubmit: (data: { title: string; dueDate: string }) => void;
    defaultValues?: { title: string, dueDate: string };
}

const TestForm: React.FC = ({
                                onSubmit,
                                defaultValues
                            }: TestFormProps) => {
    const [title, setTitle] = useState(defaultValues?.title ?? "");
    const [dueDate, setDueDate] = useState(defaultValues?.dueDate ?? "");
    return(
        <form onSubmit={(e)=> {e.preventDefault(); onSubmit({title, dueDate})}}>
            <input value={title} onChange={(e)=> setTitle(e.target.value)}/>
            <input  type="date" value={dueDate} onChange={(e)=> setDueDate(e.target.value)}/>
            <button type="submit">등록</button>
        </form>
    )
}
export default TestForm;