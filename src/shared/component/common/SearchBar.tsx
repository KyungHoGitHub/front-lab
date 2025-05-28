import React, {useState} from "react";
import './SearchBar.css';
// searchBar parameter type 선언
interface SearchBarProps {
    onSearch: (searchBy: 'title' | 'description', searchTerm: string) => void;
}

const SearchBar:React.FC<SearchBarProps> =({onSearch})=>{

    // 검색 분류 기준
    const [searchBy, setSearchBy] = useState<'title'|'description'>('title');

    // 검색어
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () =>{
        onSearch(searchBy,searchTerm)
    };

    return(
        <div className="search-container">
            <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as 'title' | 'description')}
            >
                <option value='title'>제목</option>
                <option value='description'>내용</option>
            </select>
            <input
                type="text"
                placeholder="검색어입력"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}/>
            <button onClick={handleSearchClick}>검색</button>
        </div>
    );
};
export default SearchBar;