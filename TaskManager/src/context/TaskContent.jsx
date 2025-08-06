import { useEffect } from "react";
import { useContext,createContext,useReducer } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

function taskReducer(state, action) {
    switch(action.type){
        case "ADD_TASK":
            return {tasks:[...state.tasks,action.payload]};
        case "DELETE_TASK":
            return {tasks:state.tasks.filter(t=>t.id!=action.payload)};
        case "UPDATE_TASK":
            return {tasks:state.tasks.map(t=>t.id===action.payload.id ? action.payload : t)};
        default:
            return state;
    }
}

export function TaskProvider({children}){
    const [state,dispatch]=useReducer(taskReducer,initialState);
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(state.tasks));
    },[state.tasks])
    return(
        <TaskContext.Provider value={{state,dispatch}}>{children}</TaskContext.Provider>
    );
}

export const useTasks=()=> useContext(TaskContext);