import React, {useState} from "react";
import './SearchBar.css';
import {useTranslation} from "react-i18next";

type SelectOptionsItems ={
    label : string;
    value : string;
}
// searchBar parameter type 선언
interface SearchBarProps {
    onSearch: (searchBy: SearchField, searchTerm: string) => void;
    selectOptions : SelectOptionsItems[]
}

enum SearchField {
    TITLE = 'title',
    DESCRIPTION = 'description',
    USER_ID = 'userId',
    USER_NAME = 'username',
}

const SearchBar:React.FC<SearchBarProps> =({onSearch,selectOptions= []})=>{
    const {t} = useTranslation();
    // 검색 분류 기준
    const [searchBy, setSearchBy] = useState<SearchField>(SearchField.TITLE);

    // 검색어
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () =>{
        onSearch(searchBy,searchTerm)
    };

    return(
        <div className="search-container">
            <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as SearchField)}
            >
                {
                    selectOptions.map((item)=> (
                        <option value={item.value}>{item.label}</option>
                    ))
                }
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