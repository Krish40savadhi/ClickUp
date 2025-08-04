import {forwardRef} from "react";


const ChildFrwdRef = forwardRef((props,ref) =>{
        return(
        <>
            <input  ref={ref} />
        </>
    );
});

export default ChildFrwdRef;
   