import { useTasks } from '../context/TaskContent'
import Column from '../components/Column'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import { useState, useRef, useMemo } from 'react'
import TaskStats from '../components/Statictics'
import { useCallback } from 'react'

export default function Boards() {
  const { state, dispatch } = useTasks()
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [idLoading, setIsLoading] = useState(false)
  const formref = useRef()

  const tasksByStatus = useMemo(
    () => ({
      todo: state.tasks.filter((t) => t.status === 'todo'),
      inProgress: state.tasks.filter((t) => t.status === 'in-progress'),
      done: state.tasks.filter((t) => t.status === 'done'),
    }),
    [state.tasks],
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData(formref.current)
      let status = data.get('status')
      if (status === 'Select Status') status = 'todo'
      const newTask = {
        id: editing?.id || Date.now(),
        title: data.get('title'),
        description: data.get('description'),
        status,
        dueDate: data.get('dueDate'),
      }
      dispatch({ type: editing ? 'UPDATE_TASK' : 'ADD_TASK', payload: newTask })
    } finally {
      setIsLoading(false)
      setShowModal(false)
    }
  }

  return (
    <div className="p-5">
        <TaskStats/>
          <div className="mt-4 mb-6">
        <button
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          + Add Task
        </button>
      </div>
    <div className="flex gap-5">
      <Column
        title={'Todo'}
        tasks={tasksByStatus.todo}
        onEdit={useCallback((t) => {
          setEditing(t)
          setShowModal(true)
        },[])}
      />
      <Column
        title={'In Progress'}
        tasks={tasksByStatus.inProgress}
        onEdit={useCallback((t) => {
            setEditing(t)
            setShowModal(true)
        },[])}
        />
      <Column
        title={'Done'}
        tasks={tasksByStatus.done}
        onEdit={useCallback((t) => {
          setEditing(t)
          setShowModal(true)
        },[])}
        />
      {showModal && (
          <Modal onClose={() => setShowModal(false)}>
          <TaskForm ref={formref} onSubmit={handleSubmit} task={editing} />
        </Modal>
      )}
    </div>
      </div>
  )
}
