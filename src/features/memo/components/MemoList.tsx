// src/components/MemoList/MemoList.tsx
import React, {useEffect, useRef, useState} from 'react';
import { Reorder } from 'framer-motion';

import './MemoList.css';
import Memo from "./Memo.tsx";
import {getMomoList} from "../api/memo.ts";
// 메모 데이터 타입 정의 (Memo 컴포넌트와 일치)
interface MemoData {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const MemoList: React.FC = () => {

    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dummyMemos: MemoData[] = [
        {
            id: 1,
            title: '첫 번째 메모',
            content: '이것은 첫 번째 메모의 내용입니다.',
            createdAt: '2024.12',
        },
        {
            id: 2,
            title: '두 번째 메모',
            content: '두 번째 메모는 좀 더 긴 내용을 포함할 수 있습니다. 테스트용입니다.',
            createdAt: '2024.12',
        },
        {
            id: 3,
            title: '세 번째 메모',
            content: '세 번째 메모입니다.',
            createdAt: '2024.12',
        },
        {
            id: 4,
            title: '세 번째 메모',
            content: '세 번째 메모입니다.',
            createdAt: '2024.12',
        },
    ]
    const [memos, setMemos] = useState([]);
    // 메모 목록 가져오기
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

    // 메모 삭제 처리
    // const handleDelete = async (id: number) => {
    //     try {
    //         await deleteMemo(id);
    //         setMemos(memos.filter((memo) => memo.id !== id));
    //     } catch (err) {
    //         setError('메모 삭제에 실패했습니다.');
    //     }
    // };

    // 메모 수정 처리 (임시: 수정 폼은 별도로 구현 필요)
    // const handleEdit = (id: number) => {
    //     alert(`메모 ID ${id} 수정 (구현 필요)`);
    //     // 실제로는 수정 폼을 띄우고 updateMemo 호출
    // };

    // if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div ref={containerRef} className="memo-list-container">
            <Reorder.Group
                axis="x"
                values={memos}
                onReorder={(newOrder) => {
                    console.log('재정렬 후 memos:', newOrder);
                    setMemos(newOrder);
                }}
                className="memo-list"
            >
                {memos.map((memo, index) => (
                    memo ? (
                        <Reorder.Item
                            key={memo.id}
                            value={memo}
                            drag="x"
                            dragConstraints={containerRef}
                            dragElastic={0.1}
                            dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                            whileDrag={{scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', opacity: 1}}
                            onDragStart={() => console.log(`드래그 시작: 메모 ID ${memo.id}`)} // 디버깅
                            onDragEnd={() => console.log('드래그 종료')}
                        >
                            <Memo
                                memo={memo}
                                // onEdit={handleEdit}
                                // onDelete={handleDelete}
                                index={index}
                            />
                        </Reorder.Item>
                    ) : null
                ))}
            </Reorder.Group>
        </div>
    );
};

export default MemoList;