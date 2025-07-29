import './NoticeList.css';
import React, {cloneElement, ReactElement, ReactNode, useState} from "react";
import notice from "../../../pages/Notice.tsx";
import * as FaIcons from "react-icons/fa";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronDown, FaChevronUp} from "react-icons/fa";

interface Notice {
    idx: string;
    category: string;
    title: string;
    createdAt: string;
    content: string;
}

interface NoticeListProps {
    className?: string;
    children?: ReactNode;
    notices?: Notice[];
}
interface NoticeListHeaderLineProps {
    children?: React.ReactNode;
}

interface NoticeCardProps {
    idx : string;
    category : string;
    title: string;
    createdAt : string;
    content: string;
    isActive?: boolean;
    onClick?: (id: string) => void;
}

interface NoticePageFooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange : (page: number) => void;
    children?: ReactNode;
}

const dynamicIcon  = (text: string) =>{
    const IconComponent = FaIcons[text as keyof typeof FaIcons];
    return IconComponent ? <IconComponent /> : null;
}

const NoticeList = ({className, children,notices=[]}: NoticeListProps) => {
    const [activeNoticeId, setActiveNoticeId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage -1) * itemsPerPage;
    const currentNotices = notices.slice(startIndex, startIndex  + itemsPerPage)
    const totalPages = Math.ceil(notices.length / itemsPerPage);
    return (
        <div className={`notice-list-container ${className}`}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                // NoticeListHeaderLine 처리
                if (child.type === NoticeListHeaderLine) {
                    return cloneElement(child as ReactElement, {});
                }

                // NoticePageFooter 처리
                if (child.type === NoticePageFooter) {
                    return (
                        <>
                            {notices.length > 0 &&
                                currentNotices.map((notice) => (
                                    <NoticeCard
                                        key={notice.idx}
                                        idx={notice.idx}
                                        category={notice.category}
                                        title={notice.title}
                                        createdAt={notice.createdAt}
                                        content={notice.content}
                                        isActive={notice.idx === activeNoticeId}
                                        onClick={setActiveNoticeId}
                                    />
                                ))}
                            {cloneElement(child as ReactElement<NoticePageFooterProps>, {
                                currentPage,
                                totalPages,
                                onPageChange: setCurrentPage,
                            })}
                        </>
                    );
                }

                // notices가 있으면 children의 NoticeCard 무시
                if (child.type === NoticeCard && notices.length > 0) {
                    return null;
                }

                return cloneElement(child as ReactElement<NoticeCardProps>, {
                    isActive: child.props.idx === activeNoticeId,
                    onClick: setActiveNoticeId,
                });
            })}
            {/* children에 NoticePageFooter가 없는 경우 currentNotices 렌더링 */}
            {notices.length > 0 &&
                !React.Children.toArray(children).some(
                    (child) => React.isValidElement(child) && child.type === NoticePageFooter
                ) &&
                currentNotices.map((notice) => (
                    <NoticeCard
                        key={notice.idx}
                        idx={notice.idx}
                        category={notice.category}
                        title={notice.title}
                        createdAt={notice.createdAt}
                        content={notice.content}
                        isActive={notice.idx === activeNoticeId}
                        onClick={setActiveNoticeId}
                    />
                ))}
        </div>
    );
};
const NoticeListHeaderLine = ({children}: NoticeListHeaderLineProps) => {
    return (
        <div className="notice-list-header">
            {children || <div className="header-line"/>}
        </div>
    )
}
const NoticeCard = ({ idx, category, title, createdAt, content, isActive, onClick }:NoticeCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        setIsOpen(!isOpen);
    };
    return (
        <div className={`notice-card ${isActive ? 'active' : ''}`} onClick={() => onClick?.(idx)}>
            <div className="notice-card-header">
                <span className="notice-category">{category}</span>
                <span className="notice-title">{title}</span>
                <button className="notice-toggle" onClick={toggleDropdown}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            <span className="notice-date">{createdAt}</span>
            {isOpen && <div className="notice-content"   dangerouslySetInnerHTML={{ __html: content }}></div>}
        </div>
    );
}

const NoticePageFooter = ({ currentPage, totalPages, onPageChange, children }:NoticePageFooterProps) => {
    const handleFirstPage = () => onPageChange(1);
    const handleLastPage = () => onPageChange(totalPages);
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // 페이지 번호 배열 생성 (최대 5개 페이지 버튼 표시)
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="notice-page-footer">
            {children || (
                <>
                    <button onClick={handleFirstPage} disabled={currentPage === 1}>
                        <FaAngleDoubleLeft />
                    </button>
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            className={page === currentPage ? 'active' : ''}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                        <FaAngleDoubleRight />
                    </button>
                </>
            )}
        </div>
    );
};


export {NoticeList,NoticeListHeaderLine, NoticeCard,NoticePageFooter };