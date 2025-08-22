import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import Table from '../components/Table'

export default function ProjectsDetails() {
  const { id } = useParams()
  const [project, SetProject] = useState([])
  const [task, SetTask] = useState([])
  const [assignees, SetAssignees] = useState([])
  const navigate = useNavigate()
  const authuser = localStorage.getItem('auth')
  const user = JSON.parse(authuser).user

  useEffect(() => {
    async function loadData() {
      try {
        const prores = await api.get(`/projects/${id}`)
        SetProject(prores.data || [])

        const taskres = await api.get(`/tasks?projectId=${id}`)
        const tasks = taskres.data || []
        if (user.role === 'admin') {
          SetTask(tasks)
        } else {
          const userId = String(user.id)

          const includesUser = (field) => {
            if (field == null) return false
            if (Array.isArray(field)) {
              return field.some((id) => String(id) === userId)
            }
            return String(field) === userId
          }

          const emptasks = (tasks || []).filter((t) => {
            includesUser(t.assigneeId)
          })
          SetTask(emptasks)
        }

        const assigneeIds = tasks.flatMap((t) => {
          if (Array.isArray(t.assigneeId)) {
            return t.assigneeId
          } else if (t.assigneeId) {
            return [t.assigneeId]
          }
          return []
        })

        const uniqueIds = [...new Set(assigneeIds)]
        if (uniqueIds.length === 0) {
          console.warn('No valid assigneeIds found in tasks.')
          return
        }

        const assignee = await Promise.all(
          uniqueIds.map((id) =>
            api.get(`/employees/${id}`).then((res) => res.data),
          ),
        )

        SetAssignees(assignee)
      } catch (error) {
        console.log('Error loading data:', error?.message)
      }
    }

    loadData()
  }, [])

  function getAssigneename(assigneeId) {
    if (!assigneeId || (Array.isArray(assigneeId) && assigneeId.length === 0)) {
  return "No assignees";
}

    if (Array.isArray(assigneeId)) {
      const names = assigneeId.map((id) => {
        const assignee = assignees.find((a) => a.id == id)
        return assignee ? assignee.name : 'Unknown'
      })
      return names.join(', ')
    }
    const assignee = assignees.find((a) => a.id == assigneeId)
    return assignee ? assignee.name : 'Unknown'
  }

  return (
    <div>
      <div className="w-full h-[105px] flex flex-row justify-between">
        <div className="w-[503px] h-[73px] text-left">
          <h1 className="h[40px] mb-4 text-3xl">Project : {project.name}</h1>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
        <div className="flex flex-row pt-8 pb-8  pr-4 align-middle gap-9">
          <button className="bg-gray-200 rounded-2xl pr-4 pl-4 pt-1 pb-1 text-black ">
            Edit Project
          </button>
          <button
            className="bg-gray-200 rounded-2xl pr-4 pl-4 pt-1 pb-1 text-black"
            onClick={() => navigate('/tasks')}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="text-left text-lg font-bold mt-4 mb-2">
        <h1>Assigned Employees</h1>
      </div>
      <div className="text-left text-lg font-bold mt-3 mb-3">
        <div className="flex flex-row">
          <img src="" alt="" className="h-11 w-11" />
          <img src="" alt="" className="h-11 w-11" />
          <img src="" alt="" className="h-11 w-11" />
          <img src="" alt="" className="h-11 w-11" />
        </div>
      </div>
      <div className="mt-5 mb-3 text-left text-lg flex flex-row justify-between ">
        <div>
          <h1>Tasks</h1>
        </div>
        <div className="flex flex-row pr-4 align-middle gap-5">
          <button className="bg-gray-200 rounded-lg pr-4 pl-4 pt-1 pb-1 text-black">
            Not Started
          </button>
          <button className="bg-gray-200 rounded-lg pr-4 pl-4 pt-1 pb-1 text-black">
            In Progress
          </button>
          <button className="bg-gray-200 rounded-lg pr-4 pl-4 pt-1 pb-1 text-black">
            Completed
          </button>
        </div>
      </div>
      <div>
        <Table
          columns={['Tasks', 'Assignee', 'Due Date', 'Status']}
          data={task}
          renderRow={(t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{t.title}</td>
              <td className="px-4 py-3 text-gray-600">
                {getAssigneename(t.assigneeId)}
              </td>
              <td className="px-4 py-3 text-gray-600">{t.duedate}</td>
              <td className="px-4 py-5">
                <span className="block w-full py-1.5 px-2 rounded-lg bg-[#F0F2F5]">
                  {t.status}
                </span>
              </td>
            </tr>
          )}
        ></Table>
      </div>
      <div className="mt-4 text-left">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => navigate('/tasks')}
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded-lg">
          Delete Project
        </button>
        <button
          className="px-4 py-2 bg-[#0D80F2] rounded-lg"
          onClick={() => navigate('/projects')}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
