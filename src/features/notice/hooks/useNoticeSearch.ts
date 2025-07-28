import {useState} from "react";
import {searchNotice} from "../api/notice.ts";

const useNoticeSearch =()=>{
    const [searchSelect, setSearchSelect] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (searchBy : string ,searchTerm : string) =>{
        setLoading(true);
        try{
            const res  = await searchNotice(searchBy,searchTerm);

        }catch (e){
            console.log(e);
        } finally {
          setLoading(false);
        }
    }

    return{searchSelect,setSearchSelect,searchInput,setSearchInput, handleSearch,loading};
}
export default useNoticeSearch;