
import { useState} from "react";

export const useAdminMenu = () => {
    const [openDropdown, setOpenDropdown] = useState<number |null>(null);


    const toggleDropdown = (key: number) => {
        console.log('key 값 ->',key)

        setOpenDropdown(openDropdown === key ? null : key );
        console.log('openDropDwon',openDropdown);
    };



    return {openDropdown, toggleDropdown}
};