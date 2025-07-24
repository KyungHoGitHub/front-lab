import {useState} from "react";
import {getUserList} from "../api/admin.ts";

export const useUserPage = () => {
    const [userList, setUserList] = useState()
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (searchBy: 'username' | 'userId', searchTerm: string) => {
        setLoading(true);

        try {
            const res = await getUserList(searchBy, searchTerm)

            const userData = res.data
                ? Array.isArray(res.data)
                    ? res.data
                    : [res.data]
                : [];
            console.log('------------L>', userData)
            setUserList(userData);


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return {userList, handleSearch,setUserList}
};