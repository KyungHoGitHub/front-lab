import React, {useState} from 'react';
import './Table.css';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdSort,
    MdFirstPage,
    MdChevronLeft,
    MdChevronRight,
    MdLastPage
} from 'react-icons/md';

export interface Column<T> {
    title: string;
    dataIndex: keyof T;
    render?: (value: any, record: T) => React.ReactNode;
    sorter?: (a: T, b: T) => number;
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

        const column = columns.find(col => col.dataIndex === sortState.key);
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

        if (sortState.key === key) {
            if (sortState.direction === 'asc') direction = 'desc';
            else if (sortState.direction === 'desc') direction = null;
            else direction = 'asc';
        }
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
                            <td key={colIndex} className="table-cell">
                                {column.render
                                    ? column.render(record[column.dataIndex], record)
                                    : String(record[column.dataIndex] ?? '')}
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