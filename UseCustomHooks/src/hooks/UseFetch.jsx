import { useState ,useEffect} from "react";

function useFetch(url){
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
        const fetchdata =async()=>{
            const response =await fetch(url);
            const result = await response.json();
            setData(result);
            setIsLoading(false);
        }
        fetchdata();
    },[url]);

    return {data,isLoading};  
}


export default function UseFetch(){
    const {data,isLoading}=useFetch("https://jsonplaceholder.typicode.com/users");

    return(
        <>
        <h1>UseFetch:</h1>
        {isLoading? <p>loading...</p>:
                    <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>
        }
        </>
    );
}