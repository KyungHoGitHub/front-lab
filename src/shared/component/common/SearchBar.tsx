import React, {useState} from "react";
import './SearchBar.css';
import {useTranslation} from "react-i18next";
// searchBar parameter type 선언
interface SearchBarProps {
    onSearch: (searchBy: 'title' | 'description', searchTerm: string) => void;
}

const SearchBar:React.FC<SearchBarProps> =({onSearch})=>{
    const {t} = useTranslation();
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
                <option value='title'>{t('work_space.todo.table_searchBar.option_title')}</option>
                <option value='description'>{t('work_space.todo.table_searchBar.option_content')}</option>
            </select>
            <input
                type="text"
                placeholder={t('work_space.todo.table_searchBar.input_placeholder')}
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}/>
            <button onClick={handleSearchClick}>{t('work_space.todo.table_searchBar.button')}</button>
        </div>
    );
};
export default SearchBar;