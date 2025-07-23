import {useState} from "react";
import {getUserList} from "../api/admin.ts";

export const useUserPage = () => {
    const [userList, setUserList] = useState()
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (searchBy: 'username' | 'userId', searchTerm: string) => {
        setLoading(true);

        try {
            const res = await getUserList(searchBy, searchTerm)
            setUserList(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return {userList, handleSearch}
};