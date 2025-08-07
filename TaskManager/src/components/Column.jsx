import { useCallback } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContent";
import PropTypes from "prop-types";

export default function Column({title, tasks, onEdit}) {
    const { state, dispatch } = useTasks();

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('taskId'), 10);
        const task = state.tasks.find(t => t.id === taskId);
        
        if (task) {
            const newStatus = title.toLowerCase() === 'in progress' ? 
                'in-progress' : title.toLowerCase();
            
            dispatch({ 
                type: 'UPDATE_TASK', 
                payload: { ...task, status: newStatus }
            });
        }
    }, [dispatch, state.tasks, title]);

    return (
        <div 
            className="w-1/3 p-3 bg-gray-100 rounded-lg min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            {tasks.length === 0 ? 
                <p className="text-gray-500">No tasks yet</p> : 
                tasks.map((t) => (
                    <TaskCard 
                        key={t.id} 
                        task={t} 
                        onEdit={onEdit}
                    />
                ))
            }
        </div>
    );
}

Column.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired
};