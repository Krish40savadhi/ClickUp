import { useMemo,useState } from "react";

const bigList=Array.from({length:1000},(_,i)=>`Item ${i}`);

export default function FilterList(){
    const [query,setQuery]=useState('');

    const filteredList = useMemo(()=>{
        return bigList.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    },[query]);

    return(
        <>
            <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search..."/>
            <ul>
                {filteredList.slice(0,50).map((item)=><li key={item}>{item}</li>)}
            </ul>
        </>
    );
}