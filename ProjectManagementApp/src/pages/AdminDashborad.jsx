import { useState, useEffect, useMemo } from 'react'
import Layout from '../components/Layout'
import { api } from '../services/api'
import { Link, Navigate } from 'react-router-dom'
import Table from '../components/Table'

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const load = async () => {
      try {
        setLoading(true)
        const [empres, projres, taskres] = await Promise.all([
          api.get('/employees'),
          api.get('/projects'),
          api.get('/tasks'),
        ])
        if (ignore) return
        setEmployees(empres.data || [])
        setProjects(projres.data || [])
        setTasks(taskres.data || [])
      } catch (e) {
        if (!ignore) setError(e?.message || 'Failed to load Dashboard')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  const taskCountByProject = useMemo(() => {
    const map = {}
    for (const t of tasks) map[t.projectId] = (map[t.projectId] || 0) + 1
    return map
  }, [tasks])

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-28 bg-white rounded-2xl shadow-sm animate-pulse" />
            <div className="h-28 bg-white rounded-2xl shadow-sm animate-pulse" />
          </div>
          <div className="h-64 bg-white rounded-2xl shadow-sm animate-pulse" />
          <div className="h-64 bg-white rounded-2xl shadow-sm animate-pulse" />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <p className="text-red-600">Failed to load dashboard: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-20 ">
        <div className="grid grid-cols-2 md:grid-clos-2 gap-6 ">
          <StatCard label="Total Projects" value={projects.length} />
          <StatCard label="Total Employees" value={employees.length} />
        </div>
        {/*aa Employees nu table */}
        <section className="bg-white p-6 rounded-2xl ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Employees</h2>
            <Link
              to="/employees/new"
              className="rounded-lg bg-gray-200 text-black font-bold text-sm px-4 py-2 hover:bg-gray-400"
            >
              Add New Employee
            </Link>
          </div>
          <Table
            columns={['Name', 'Email', 'Department', 'Role']}
            data={employees}
            renderRow={(p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 max-w-xl truncate text-gray-600">
                  {p.email}
                </td>
                <td className="px-4 py-3 text-gray-600">{p.department}</td>
                <td className="px-4 py-3  text-gray-600">{p.designation}</td>
              </tr>
            )}
          />
        </section>

        {/* Projects */}
        <section className="bg-white  p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Link
              to="/projects/new"
              className="rounded-lg bg-gray-200 text-black font-bold text-sm px-4 py-2 hover:bg-gray-400"
            >
              Add New Project
            </Link>
          </div>
          <Table
            columns={['Project Name', 'Description', 'Tasks']}
            data={projects}
            renderRow={(p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 max-w-xl truncate text-gray-600">
                  {p.description || '-'}
                </td>
                <td className="px-4 py-3  text-gray-600">{taskCountByProject[p.id] || 0} tasks</td>
              </tr>
            )}
          />
        </section>
      </div>
    </Layout>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl border-1 border-gray-300 p-6">
      <p className="text-lg text-left font-bold text-black-500">{label}</p>
      <p className="mt-2 text-4xl text-left font-semibold">{value}</p>
    </div>
  )
}