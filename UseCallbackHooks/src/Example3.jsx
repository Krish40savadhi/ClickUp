import { useCallback,useState,memo, useEffect } from "react";


function Fetcher(){
    const [data,setData]=useState(null)
    const fetchdata=useCallback(async()=>{
        console.log('Fetching data...only once');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data =await response.json();
        setData(data);
    },[]);

    useEffect(()=>{
        fetchdata();
    },[fetchdata]); // safe bcoz fetchdata reference is stable due to useCallback
    return <pre>{JSON.stringify(data,null,2)}</pre>
}

export default Fetcher;