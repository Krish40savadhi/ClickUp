import { useCallback } from "react";
import PropTypes from "prop-types";
import { useTasks } from "../context/TaskContent";
import { formatDistanceToNow } from 'date-fns';

function TaskCard({task,onEdit}){
    
    const {dispatch} = useTasks();
    const handleDragStart = (e)=>{
        e.dataTransfer.setData('taskId',task.id.toString());
        e.target.classList.add('opacity-50');
    }

    const handleDragEnd = useCallback((e) => {
        e.target.classList.remove('opacity-50');
    }, []);

    const handleDelete = useCallback(()=>{
        dispatch({type:"DELETE_TASK",payload:task.id});
    },[task.id,dispatch]);
    
    const daysleft=task.dueDate ? formatDistanceToNow(new Date(task.dueDate),{addSuffix:true}) : 'No Due Date';

    return(
        <div className="p-3 bg-white shadow rounded mb-2 flex justify-between"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        >
            <div>
                <h4 className="font-bold">{task.title}</h4>
                <p>{task.description}</p>
                <p className="text-sm text-grey-500">Due: {daysleft}</p>
            </div>
            <div className="space-x-2">
                <button onClick={()=> onEdit(task)} className="text-blue-500">Edit</button>
                <button onClick={handleDelete} className="text-red-500">Delete</button> 
            </div>
        </div>
    );
}

TaskCard.propTypes={
    task: PropTypes.object.isRequired,
    onEdit:PropTypes.func.isRequired
}
export default TaskCard;

