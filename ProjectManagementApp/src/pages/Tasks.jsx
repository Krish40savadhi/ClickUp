import { useForm, Controller } from 'react-hook-form'
import { api } from '../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Select, Spin, DatePicker } from 'antd'
import dayjs from 'dayjs'

export default function Tasks() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      assigneeId: [],
      status: '',
      priority: '',
      duedate: '',
    },
  })
  const [employees, SetEmployees] = useState([])
  const [submitError, setSubmitError] = useState('')
  const [isloading, SetIsloading] = useState('')
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadError, setLoadError] = useState('')

  const navigate = useNavigate()
  const { Option } = Select

  useEffect(() => {
    let mounted = true
    async function loademployees() {
      try {
        setLoadingEmployees(true)
        const res = await api.get('/employees')
        if (!mounted) return
        SetEmployees(res.data || [])
      } catch (error) {
        if (!mounted) return
        setLoadError(error?.message || 'Failed to load Employees')
      } finally {
        if (!mounted) return
        setLoadingEmployees(false)
      }
    }
    loademployees()
    return () => {
      mounted = false
    }
  }, [])

  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      const payload = {
        title: data.name.trim(),
        description: data.description,
        assigneeId:data.assignedEmployeeIds,
        status:data.status,
        priority: data.priority,
        duedate: data.duedate,
      }
      await api.post('/tasks',payload)
      navigate('/tasks')
    } catch (error) {
        setSubmitError(error?.message || "Failed to Add Task")
    }
  }

  return (
    <div className="main-container">
      <div className="flex justify-between mt-7">
        <h3 className=" text-3xl font-extrabold">Add New Tasks</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-[448px] flex flex-col gap-6">
          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Task Name
            </label>
            <input
              type="text"
              placeholder="Enter Task name"
              {...register('name', { required: 'Emplpoyee name Required' })}
              className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-left h-[32px] text-lg font-medium  pb-[8px]">
              Description
            </label>
            <div className=" h-[144px]">
              <textarea
                {...register('description', {
                  required: 'Task Description Required',
                })}
                className="w-full h-[144px]  border rounded-2xl border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-left h-[24px] text-lg font-medium mb-2">
              Assign Employees
            </label>

            {loadingEmployees ? (
              <Spin size="small" className="text-gray-500" />
            ) : (
              <Controller
                name="assignedEmployeeIds"
                control={control}
                render={({ field }) => (
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Select employee's"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    className="custom-select w-full"
                    optionLabelProp="label"
                  >
                    {employees.map((emp) => (
                      <Option key={emp.id} value={emp.id} label={emp.name}>
                        <div className="flex flex-col">
                          <span className="font-medium">{emp.name}</span>
                          <span className="text-xs text-gray-500">
                            {emp.email}
                          </span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </div>

          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Status"
                  className="w-full"
                >
                  <Option value="todo">To Do</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="done">Done</Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Proirity"
                  className="w-full"
                >
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Due Date
            </label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null} // ✅ Ensure dayjs object
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString() : null)
                  } // Save ISO string
                  className="w-full h-[56px] rounded-2xl border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Select Due Date"
                />
              )}
            />
          </div>
        </div>

        <div className="w-full flex  justify-end gap-3 px-5 py-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-[40px] w-[84px] px-4 rounded-2xl font-bold bg-gray-100 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2.5 px-4 rounded-2xl bg-gray-200 text-black font-bold text-sm disabled:opacity-60"
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
