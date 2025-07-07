import React, {useEffect, useState} from "react";
import MemoList from "../features/memo/components/MemoList.tsx";
import SearchBar from "../shared/component/common/SearchBar.tsx";
import {getMomoList, searchMemos} from "../features/memo/api/memo.ts";
import GenericFormModal from "../features/test/components/GenericFormModal.tsx";
import MemoForm from "../features/memo/components/MemoForm.tsx";
import {useMemoModal} from "../features/memo/hooks/useMemoModal.ts";
import './Memo.css';

const Memo:React.FC =()=>{
    const [memos, setMemos] = useState([]);
    const {isOpen,openModal,closeModal} = useMemoModal();

    useEffect(() => {
        const fetchMemos = async () => {
            try {
                const data = await getMomoList();
                const notes = data.data.map((item, idx) => ({
                    ...item,
                    id: item.id ?? `temp-${idx}`,
                }));
                setMemos(notes);
            } catch (err) {
                console.error(err)
            } finally {
                // setLoading(false);
            }
        };
        fetchMemos();
    }, []);

    const handleSearch = async (searchBy: 'title' | 'description', searchTerm: string) => {
        try{
            const res = await searchMemos(searchBy,searchTerm);
            setMemos(res.data);
        }catch(error){

        }
    }

    return (
        <div className="memo-page-container">
            <div className="memo-controller-container">
            <GenericFormModal
                title="test"
                isOpen={isOpen}
                FormComponent={MemoForm}
                onClose={closeModal}
            />
            <SearchBar onSearch={handleSearch}/>
            <button className="memo-add-button" onClick={openModal}>메모 추가</button>
            </div>
            <MemoList memos={memos} setMemos={setMemos}/>
        </div>
    )
}
export default Memo;