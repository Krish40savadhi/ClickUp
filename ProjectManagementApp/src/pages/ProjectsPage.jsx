import { useEffect, useState, useMemo } from 'react'
import { api } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../components/Table'
import { useAuth } from '../context/Authcontext'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { isAuthenticated,user } = useAuth()
  if (!isAuthenticated || !user) {
    navigate('/login')
  }
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [projRes, taskRes] = await Promise.all([
          api.get('/projects'),
          api.get('/tasks'),
        ])
        if (user.role === 'admin') {
          setProjects(projRes.data)
          setTasks(taskRes.data)
        } else {
          const userId = user?.id

          const includesUser = (field) => {
            if (field == null) return false
            const u = String(userId)

            if (Array.isArray(field)) {
              return field.some((id) => String(id) === u)
            }
            // scalar (number/string)
            return String(field) === u
          }

          const employeeProjects = (projRes.data || []).filter((p) =>
            includesUser(p.employeeIds),
          )

          const employeeTasks = (taskRes.data || []).filter((t) =>
            includesUser(t.assigneeId),
          )

          setProjects(employeeProjects)
          setTasks(employeeTasks)
        }
      } catch (err) {
        setError(err.message || 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const taskCountByProject = useMemo(() => {
    const map = {}
    for (const t of tasks) map[t.projectId] = (map[t.projectId] || 0) + 1
    return map
  }, [tasks])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        {user.role === 'admin' && (
          <Link
            to="/projects/new"
            className="rounded-lg bg-gray-200 text-black font-bold text-sm px-4 py-2 hover:bg-gray-400"
          >
            New Project
          </Link>
        )}
      </div>
      <Table
        columns={['Project Name', 'Description', 'Tasks', 'Actions']}
        data={projects}
        renderRow={(p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">{p.name}</td>
            <td className="px-4 py-3 max-w-xl truncate text-gray-600">
              {p.description || '-'}
            </td>
            <td className="px-4 py-3">{taskCountByProject[p.id] || 0} tasks</td>
            <td className="px-4 py-3">
              <Link to={`/projects/${p.id}`}>View</Link>
            </td>
          </tr>
        )}
      />
    </div>
  )
}
