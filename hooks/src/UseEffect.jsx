import React, { useEffect, useState } from "react";

export default function UseEff() {
  useEffect(() => {
    console.log("(1) [] means for the first time");
  }, []);

      useEffect(() => {
    const interval = setInterval(() => {
        console.log('(2)Tick every second');
    }, 1000);

    return () => {
        clearInterval(interval);
        console.log('(2)Interval cleared on unmount');
    };
    }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const userRes = await fetch(`https://api.github.com/users/krishpatel-40`);
      const user = await userRes.json();
      console.log("(3)Using an api response: ",user);
    };
    fetchdata();
  }, []);

  useEffect(()=>{
    function handleResize(){
        console.log("(4)Window resized:",window.innerWidth);
    }
        window.addEventListener('resize',handleResize);
        return()=>{
            window.removeEventListener('resize',handleResize);
        };
  },[]);

  const [count,setCount]=useState(0);

  useEffect(()=>{
    console.log("(5) count is : ",count)
  },[count]);

  useEffect(()=>{
    console.log("(6)without dependency array");
  });

    return(
        <>
            <button onClick={(e)=>{setCount(count+1)}}>Dependency useEffect :{count}</button>
        </>
    );
}
