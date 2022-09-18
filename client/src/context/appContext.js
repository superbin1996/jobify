import axios from 'axios'
import React, { useReducer, useContext } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT_USER, TOGGLE_SIDEBAR } from "./actions"
import reducer from './reducer'

const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('userLocation')
const token = localStorage.getItem('token')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      console.log(response);
      const {
        user, token, location
      } = response.data
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data: { user, token, location } } = await axios.post(`/api/v1/auth/login`, currentUser)
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token, location } })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  const addUserToLocalStorage = ({ user, location, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('userLocation', userLocation)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('userLocation')
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser =()=>{
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }
  
  return (
    <AppContext.Provider
      value={{ 
        ...state, 
        displayAlert, 
        registerUser, 
        loginUser, 
        addUserToLocalStorage, 
        removeUserFromLocalStorage, 
        toggleSidebar, 
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


const AppContext = React.createContext()
const useAppContext = () => {
  // return `value` of AppContext.Provider
  return useContext(AppContext)
}

export { initialState, AppProvider, useAppContext }
