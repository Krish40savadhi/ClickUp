import { useState } from 'react'
import { api } from '../services/api'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Select, Tooltip, notification } from 'antd'

export default function EmployeeNew() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      department: '',
      role:undefined,
    },
    shouldFocusError: true,
  })
  const [submitError, setSubmitError] = useState()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        department: data.department,
        designation: data.role,
      }
      await api.post('/employees', payload)
      reset()
      notification.success({
        message: 'Success',
        description: 'Employee Added Successfully!!',
        placement: 'topRight',
        duration: 3,
      })

      //   navigate('/employees')
    } catch (error) {
      setSubmitError(error?.message || 'Failed to Add Employee.')
    }
  }

  return (
    <div className="main-container">
      <div className="flex justify-between mt-7">
        <h3 className=" text-3xl font-extrabold">Add New Employee</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-[448px] flex flex-col gap-6">
          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Name
            </label>
            <Tooltip
              title={
                <span className="text-red-600">{errors.name?.message}</span>
              }
              color="#fff"
              open={!!errors.name}
              placement="right"
            >
              <input
                type="text"
                placeholder="Enter Employee's full name"
                {...register('name', { required: 'Employee name Required' })}
                className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
              />
            </Tooltip>
          </div>
          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Email
            </label>
            <Tooltip
              title={
                <span className="text-red-600">{errors.email?.message}</span>
              }
              color="#fff"
              open={!!errors.email}
              placement="right"
            >
              <input
                type="text"
                placeholder="Enter Employee's email address"
                {...register('email', {
                  required: 'Employee email Required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
              />
            </Tooltip>
          </div>
          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Department
            </label>
            <input
              type="text"
              placeholder="Enter Employee's department"
              {...register('department')}
              className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-left font-medium text-lg mb-2">
              Role
            </label>
            {/* <input
              type="text"
              placeholder="Enter Employee's role"
              {...register('role')}
              className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
            /> */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select Employee's role"
                  value={field.value}
                  onChange={field.onChange}
                  className="custom-select w-full"
                >
                  <Select.Option value="Employee">Employee</Select.Option>
                  <Select.Option value="Admin">Admin</Select.Option>
                </Select>
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
            {isSubmitting ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  )
}
