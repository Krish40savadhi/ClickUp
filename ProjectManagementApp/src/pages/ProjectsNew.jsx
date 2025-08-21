import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { api } from '../services/api'
import { Select, Spin } from 'antd'

export default function ProjectsNew() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      assignedEmployeeIds: [],
    },
  })

  const [employees, setEmployees] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()
  const { Option } = Select
  useEffect(() => {
    let mounted = true
    async function loadEmployees() {
      try {
        setLoadingEmployees(true)
        const res = await api.get('/employees')
        if (!mounted) return
        setEmployees(res.data || [])
      } catch (err) {
        if (!mounted) return
        setLoadError(err?.message || 'Failed to load employees')
      } finally {
        if (!mounted) return
        setLoadingEmployees(false)
      }
    }
    loadEmployees()
    return () => {
      mounted = false
    }
  }, [])

  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      const payload = {
        name: data.name.trim(),
        description: data.description?.trim() || '',
        assignedEmployeeIds: (data.assignedEmployeeIds || []).map((id) =>
          Number(id),
        ),
      }

      await api.post('/projects', payload)
      navigate('/projects')
    } catch (err) {
      setSubmitError(err?.message || 'Failed to create project')
    }
  }

  return (
    <Layout>
      <div className="min-h-[735px]  flex justify-center items-start">
        <div
          className="w-[960px] max-w-[960px] h-[695px] bg-white rounded-2xl pt-[20px] pb-[20px] ml-[160px] mr-[160px]"
          aria-label="Create Project artboard"
        >
          <div className="pt-[20px] h-full">
            <div className="w-full h-[72px] flex items-center justify-between pt-[20px]">
              <div className="w-full min-w-[288px] flex items-center">
                <h1 className="text-2xl font-extrabold pb-7 leading-tight">
                  Create Project
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full max-w-[448px] flex flex-col gap-6">
                <div>
                  <label className="block text-left text-lg font-medium mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Project Name"
                    {...register('name', {
                      required: 'Project name is required',
                    })}
                    className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <div>
                    <label className="block text-left h-[32px] text-lg font-medium  pb-[8px]">
                      Description
                    </label>
                    <div className="w-[448px] h-[144px]">
                      <textarea
                        {...register('description')}
                        className="w-full h-[144px]  border rounded-2xl border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring"
                      />
                    </div>
                  </div>
                </div>

                <div>
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
                            placeholder="Enter employee's"
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                            className="custom-select w-full"
                            optionLabelProp="label"
                          >
                            {employees.map((emp) => (
                              <Option
                                key={emp.id}
                                value={emp.id}
                                label={emp.name}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {emp.name}
                                  </span>
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
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-3 px-5 py-5">
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
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>

              {submitError && (
                <p className="mt-2 text-sm text-red-600">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
