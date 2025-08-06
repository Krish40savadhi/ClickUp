import TaskCard from "./TaskCard";


export default function Column({title,tasks,onEdit}){
    return(
        <div className="w-1/3 p-3">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            {tasks.length === 0?<p>No Task's Yet!</p>: tasks.map((t)=><TaskCard key={t.id} task={t} onEdit={onEdit}/>)}
        </div>
    );
}   