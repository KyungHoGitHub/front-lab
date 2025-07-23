
import { useState} from "react";

export const useAdminMenu = () => {
    const [openDropdown, setOpenDropdown] = useState<number |null>(null);


    const toggleDropdown = (key: number) => {


        setOpenDropdown(openDropdown === key ? null : key );

    };



    return {openDropdown, toggleDropdown}
};