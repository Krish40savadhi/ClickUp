import { useForm, Controller } from 'react-hook-form'
import { api } from '../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Select, Spin, DatePicker,Tooltip ,notification} from 'antd'
import dayjs from 'dayjs'

export default function Tasks() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
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
        description: data.description?.trim() || '',
        assigneeId: data.assignedEmployeeIds,
        status: data.status,
        priority: data.priority,
        duedate: data.dueDate,
      }
      await api.post('/tasks', payload);
      reset();
      notification.success({
        message:'Success',
        description:'Task Added Successfully!!',
        placement:'topRight',
        duration:3
          });
      // navigate('/tasks')
    } catch (error) {
      setSubmitError(error?.message || 'Failed to Add Task')
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
            <Tooltip
              title={
                <span className="text-red-600">{errors.name?.message}</span>
              }
              open={!!errors.name}
              color="#fff"
              placement="right"
            >
              <input
                type="text"
                placeholder="Enter Task name"
                {...register('name', { required: 'Task name is required' })}
                className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
              />
            </Tooltip>
          </div>
          <div>
            <label className="block text-left h-[32px] text-lg font-medium  pb-[8px]">
              Description
            </label>
            <div className=" h-[144px]">
              <textarea
                {...register('description')}
                placeholder="Enter Description (optional)"
                className="w-full h-[144px] border rounded-2xl border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring"
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
                rules={{ required: 'Please assign at least one employee' }}
                render={({ field }) => (
                  <Tooltip
                    title={
                      <span className="text-red-600">
                        {errors.assignedEmployeeIds?.message}
                      </span>
                    }
                    open={!!errors.assignedEmployeeIds}
                    color="#fff"
                    placement="right"
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Select employees"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                      optionLabelProp="label"
                    >
                      {employees.map((emp) => (
                        <Select.Option
                          key={emp.id}
                          value={emp.id}
                          label={emp.name}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{emp.name}</span>
                            <span className="text-xs text-gray-500">
                              {emp.email}
                            </span>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Tooltip>
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
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <Tooltip
                  title={
                    <span className="text-red-600">
                      {errors.status?.message}
                    </span>
                  }
                  open={!!errors.status}
                  color="#fff"
                  placement="right"
                >
                  <Select
                    placeholder="Select status"
                    allowClear
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full h-[56px]"
                  >
                    <Select.Option value="todo">To Do</Select.Option>
                    <Select.Option value="in-progress">
                      In Progress
                    </Select.Option>
                    <Select.Option value="done">Done</Select.Option>
                  </Select>
                </Tooltip>
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
              rules={{ required: 'Priority is required' }}
              render={({ field }) => (
                <Tooltip
                  title={
                    <span className="text-red-600">
                      {errors.priority?.message}
                    </span>
                  }
                  open={!!errors.priority}
                  color="#fff"
                  placement="right"
                >
                  <Select
                    placeholder="Select priority"
                    allowClear
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                  >
                    <Select.Option value="high">High</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="low">Low</Select.Option>
                  </Select>
                </Tooltip>
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
              rules={{ required: 'Due date is required' }}
              render={({ field }) => (
                <Tooltip
                  title={
                    <span className="text-red-600">
                      {errors.dueDate?.message}
                    </span>
                  }
                  open={!!errors.dueDate}
                  color="#fff"
                  placement="right"
                >
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    className="w-full h-[56px] rounded-2xl border border-gray-300 px-3 py-2 text-sm"
                    placeholder="Select due date"
                    style={{ width: '100%' }}
                  />
                </Tooltip>
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
