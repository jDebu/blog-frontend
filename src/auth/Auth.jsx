import React, { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { getJsonItemFromLocalStorage, setItemToLocalStorage } from '../helpers/helpers'

const AuthContext = createContext({ admin: {}, dispatch: () => {} })
const init = () => getJsonItemFromLocalStorage('adminData') || { logged: false }

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'Login':
      return {
        ...action.payload,
        logged: true
      }

    case 'Logout':
      return {
        logged: false
      }
    default:
      return state
  }
}

const Auth = ({ children }) => {
  const [admin, dispatch] = useReducer(reducer, {}, init)
  useEffect(() => {
    if (!admin || Object.keys(admin).length === 0) return
    setItemToLocalStorage('adminData', JSON.stringify(admin))
  }, [admin])

  return <AuthContext.Provider value={{ admin, dispatch }}>{children}</AuthContext.Provider>
}

Auth.propTypes = {
  children: PropTypes.element
}

export const useAuth = () => useContext(AuthContext)

export default Auth
