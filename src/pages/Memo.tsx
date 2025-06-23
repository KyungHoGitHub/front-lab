import React, {useEffect, useState} from "react";
import MemoList from "../features/memo/components/MemoList.tsx";
import SearchBar from "../shared/component/common/SearchBar.tsx";
import {getMomoList, searchMemos} from "../features/memo/api/memo.ts";

const Memo:React.FC =()=>{
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        const fetchMemos = async () => {
            try {
                const data = await getMomoList();
                const notes = data.data.map((item, idx) => ({
                    ...item,
                    id: item.id ?? `temp-${idx}`,
                }));
                console.log('노트 값~!~~!@@~!@',notes)
                setMemos(notes);
            } catch (err) {
                setError('메모를 불러오지 못했습니다.');
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
        <>
            <SearchBar onSearch={handleSearch}/>
            <MemoList memos={memos} setMemos={setMemos}/>
    </>
    )
}
export default Memo;