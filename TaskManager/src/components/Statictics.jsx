import { useMemo } from 'react';
import { useTasks } from '../context/TaskContent';

export default function TaskStats() {
  const { state } = useTasks();
  
  const stats = useMemo(() => ({
    total: state.tasks.length,
    todo: state.tasks.filter(t => t.status === 'todo').length,
    inProgress: state.tasks.filter(t => t.status === 'in-progress').length,
    done: state.tasks.filter(t => t.status === 'done').length
  }), [state.tasks]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm">Total Tasks</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm">To Do</h3>
        <p className="text-2xl font-bold text-blue-500">{stats.todo}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm">In Progress</h3>
        <p className="text-2xl font-bold text-yellow-500">{stats.inProgress}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm">Completed</h3>
        <p className="text-2xl font-bold text-green-500">{stats.done}</p>
      </div>
    </div>
  );
}