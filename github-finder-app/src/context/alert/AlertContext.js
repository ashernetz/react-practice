import { createContext, useState, useReducer } from 'react'
import AlertReducer from './AlertReducer'
import { REMOVE_ALERT, SET_ALERT } from './constants'
import { flipTwo, curry } from '../../utilities/functionUtils'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null
  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    })
    setTimeout(() => {
      removeAlert()
    }, 3000)
  }

  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    })
  }

  const displayError = curry(flipTwo(setAlert))('error')

  return (
    <AlertContext.Provider value={{ alert: state, setAlert, displayError }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
