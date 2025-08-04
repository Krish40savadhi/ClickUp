import {useReducer} from "react";
import "./App.css";

export default function UseReduc(){
    const forcount = {count:0};
    const formultiple = {name:"",email:"",errors:{}};
    const togglemodal = {isOpen:false};

    function countreducer(state,action){
        switch (action.type){
            case 'inc':
                return {count:state.count+1};
            case 'dec':
                return {count:state.count-1};
            case 'res':
                return forcount;
            default:
                return state;
        }
    };

    function multiplereducer(state,action){
            switch(action.type){
                case 'update':
                    return{
                        ...state,[action.field]:action.value,
                    }
                    
                    case 'seterror':
                        return{
                            ...state,errors:action.errors,
                        }
                    default:
                        return state;    
                };
            };

    function modalreducer(state,action){
             switch (action.type) {
                case "open": return{isOpen:true};
                case "close": return{isOpen:false};
                default: return state;
            }

    }

    function Counter(){
        const [state,dis]=useReducer(countreducer,forcount);
        const [st,formdis]=useReducer(multiplereducer,formultiple);
        const [modalstate,modaldispatch]=useReducer(modalreducer,togglemodal);

            function handlechange(e){
              formdis({type:"update",   //dispatch call krti vakhate....
                field:e.target.name,
                value:e.target.value
              });
        }
        function handlesubmit(e){
            e.preventDefault();
            const errors={};
            if(!st.email.includes('@')) errors.email='Invalid mail';
            formdis({type:"seterror",errors});
        }
        function Modal(){
            return(
                <>
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button  className="close-button" onClick={()=>{modaldispatch({type:"close"})}}>X</button>
                        </div>
                    </div>
                </>
            );
        }


        return(
            <>
            <div>
                (1) Counter
                <h2>Count : {state.count}</h2>
                <button onClick={()=>{dis({type:'dec'})}}>-</button>
                <button onClick={()=>{dis({type:'inc'})}}>+</button>
                <button onClick={()=>{dis({type:'res'})}}>Reset</button>
            </div><br />
            <div>
                (2)Enter name and Email
                <form onSubmit={handlesubmit}>
                    <input type="text" name="name" value={st.name} placeholder="Enter Name" onChange={handlechange}/>
                    <input type="text" name="email" value={st.email} placeholder="Enter Email" onChange={handlechange}/>
                    {st.errors.email && <p>{st.errors.email}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
               <div>
                (3)Toggle Modal
               {modalstate.isOpen && <Modal> 
                    <h3>Modal opened</h3>
                </Modal>}
                <button onClick={()=>{modaldispatch({type:"open"})}}>Open Modal</button>
            </div>
            </>
        );
    }

    return(
        <>
          <Counter/>
        </>
    );
}