
import { useState} from "react";

export const useAdminMenu = () => {
    const [openDropdown, setOpenDropdown] = useState<string |null>(null);


    const toggleDropdown = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key );
    };



    return {openDropdown, toggleDropdown}
};