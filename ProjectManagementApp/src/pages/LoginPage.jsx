import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/Authcontext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const { login } = useAuth(); 
const [serverError, setServerError] = useState("");
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    setServerError("");
    try {
      const { user } = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/employee", { replace: true });
    } catch (e) {
      setServerError(e.message || "Login failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <a href="/" className="absolute left-6 top-5 flex items-center gap-2">
        <img
          src="https://cdn.prod.website-files.com/66c5b29662fc6ac27b54a965/66c5d861d60462d91e3e1111_sarvadhi-logo.svg"
          alt="Sarvadhi"
          className="h-10 w-10"
        />
        <span className="font-semibold">Sarvadhi</span>
      </a>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-center">Welcome Back!!</h1>
        <p className="text-sm text-center text-gray-500 mt-1">
          Admin and Employee login
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 4, message: 'Min 4 chars' },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
