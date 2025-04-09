import React, {useState} from 'react';
import './Table.css';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdSort,
} from 'react-icons/md';

export interface Column<T> {
    title: string;
    dataIndex: keyof T;
    render?: (value: any, record: T) => React.ReactNode;
    sorter?: (a: T, b: T) => number;
    onCellClick?: (record: T) => void;
}

export interface TableProps<T> {
    columns: Column<T>[];
    dataSource: T[];
}

const Table = <T, >(props: TableProps<T>): React.ReactElement => {
    const {columns, dataSource} = props;

    const [sortState, setSortState] = useState<{
        key: keyof T | null;
        direction: 'asc' | 'desc' | null;
    }>({key: null, direction: null});

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10); // 기본값 10으로 변경

    const sortedData = React.useMemo(() => {
        if (!sortState.key || !sortState.direction) return [...dataSource];

        // dataIndex 가 userName

        const column = columns.find(col => col.dataIndex === sortState.key);

        // 정렬 속성값이 없으면 데이터 그대로 리턴
        if (!column?.sorter) return [...dataSource];

        const sorted = [...dataSource].sort(column.sorter);

        return sortState.direction === 'desc' ? sorted.reverse() : sorted;
    }, [dataSource, sortState, columns]);


    const paginatedData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handleSort = (column: Column<T>) => {
        if (!column.sorter) return;

        const key = column.dataIndex;
        let direction: 'asc' | 'desc' | null = 'asc';

        // 테이블에 th 헤더에 컬럼중 title 이름 dataIndex 인 userName을 클리갛면
        // key = 'userName'; 선택한  컬럼이 userName 인 경우
        if (sortState.key === key) {
            // 현재 정렬이 오름차순이면
            if (sortState.direction === 'asc') direction = 'desc';
            else if (sortState.direction === 'desc') direction = null;
            else direction = 'asc';
        }

        // 클릭시 key 컬럼인덱스 , 정렬순서 셋 해준다
        setSortState({key, direction});
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const getSortIcon = (column: Column<T>) => {
        const isActive = sortState.key === column.dataIndex;
        if (!isActive) return <MdSort/>;
        if (sortState.direction === 'asc') return <MdArrowUpward/>;
        if (sortState.direction === 'desc') return <MdArrowDownward/>;
        return <MdSort/>;
    };

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className={`table-header ${column.sorter ? 'sortable' : ''}`}
                            onClick={() => handleSort(column)}
                            style={{cursor: column.sorter ? 'pointer' : 'default'}}
                        >
                            {column.title}
                            {column.sorter && (
                                <span className="sort-indicator">{getSortIcon(column)}</span>
                            )}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((record, rowIndex) => (
                    <tr key={rowIndex} className="table-row">
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className={`table-cell ${column.onCellClick ? 'clickable' : ''}`}
                                onClick={() => column.onCellClick && column.onCellClick(record)} // 클릭 이벤트 추가
                                style={{ cursor: column.onCellClick ? 'pointer' : 'default' }} // 클릭 가능 시 커서 변경
                            >
                                {column.render
                                    ? column.render(record[column.dataIndex], record)
                                    : String(record[column.dataIndex] ?? '')}
                                {column.onCellClick && <span className="detail-text">상세보기</span>} {/* 호버 시 표시 */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이징 UI */}
            <div className="pagination">
                <div className="rows-per-page">
                    <label>Rows per page:</label>
                    <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="page-controls">
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        ›
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;