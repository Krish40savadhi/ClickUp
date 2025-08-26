import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react'
import { loginRequest } from '../services/auth'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  status: 'idle',
}

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        status: action.payload?.user ? 'authenticated' : 'idle',
      }
    case 'LOGIN_START':
      return { ...state, status: 'Loading' }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
      }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const raw = localStorage.getItem('auth')
      if (!raw) return init
      const parsed = JSON.parse(raw)
      return {
        ...initial,
        user: parsed.user || null,
        token: parsed.token || null,
        status: parsed.user ? 'authenticated' : 'idle',
      }
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ user: state.user, token: state.token }),
    )
  }, [state.user, state.token])

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await loginRequest(email, password) // { user, token }
      dispatch({ type: 'LOGIN_SUCCESS', payload: res })
      return res
    } catch (err) {
      // normalize error shape as needed
      dispatch({
        type: 'LOGIN_ERROR',
        payload: { message: err?.message || 'Login failed' },
      })
      throw err
    }
  }, [])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('auth')
  }

  const isAuthenticated = Boolean(state.user && state.token)
  const hasRole = useCallback(() => {
    return state?.user?.role === 'admin'
  }, [state.user])

  const value = {
    ...state,
    login,
    logout,
    isAuthenticated,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
