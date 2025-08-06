import { forwardRef } from "react";

const TaskForm = forwardRef(({onSubmit,task},ref)=>{

    return(
        <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-2">
            <select name="status" 
               defaultValue={task?.status || "Select Status"} 
               className="border p-2">
               <option value="Select Status">Select Task Status</option>
               <option value="todo">ToDo</option>
               <option value="in-progress">In Progress</option>
               <option value="done">Done</option>
            </select>
            <input
             name="title" 
             defaultValue={task?.title || ""}
             placeholder="Task Title"
             className="border p-2"   
            />
            <textarea name="description" 
            defaultValue={task?.description || ""}
            placeholder="Description"
            className="border p-2"
            />
            <input type="date"
            name="dueDate"
            defaultValue={task?.dueDate || ""}
            className="border p-2"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
        </form>
    );
});     


export default TaskForm;