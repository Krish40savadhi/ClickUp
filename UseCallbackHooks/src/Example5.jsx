import { useCallback, useEffect } from "react";

function throttle(func,limit) {
    let lastCall=0;
    return (...args) => {
        const now = Date.now();
        if(now - lastCall >=limit){
            lastCall = now;
            func(...args);
        }
    };
}


export default function Throttling(){
    const logscroll = useCallback(throttle(()=>{
        console.log('Scroll event logged',window.scrollY);
    },500),[]);

    useEffect(() => {
        window.addEventListener('scroll',logscroll);
        return()=>{
            window.removeEventListener("scroll",logscroll);
        }
    },[logscroll]);


    return(
        <div style={{height: '200vh'}}>
            Scroll Me!!! and check the console
        </div>
    )
}