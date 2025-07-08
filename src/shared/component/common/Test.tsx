import {useEffect, useState} from "react";
import './Test.css';


type ServerData ={
    message:string;
}

const Test =() =>{
    const [data, setData] = useState<ServerData| null>(null);
    const [loading, setLoaindg] = useState<boolean>(false);

    useEffect(() => {
        const fetchData= async ()=>{
            setLoaindg(true);

            setTimeout(()=>{
                const result: ServerData = {message: "test"};

                setData(result);
                setLoaindg(false);
            },1500)
        }
        fetchData();
    }, []);

    return (
        <div className={loading ? "loading-wrapper" : "loaded-wrapper"}>
            <h2>데이터 영역</h2>
            {loading ? (
                <p>로딩 중입니다...</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    )
}
export default Test;