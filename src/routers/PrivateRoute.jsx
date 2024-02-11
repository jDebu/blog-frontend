import React from 'react'
import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

export const PrivateRoute = ({ isAuthenticated, children, redirect = '/' }) => {
  return isAuthenticated ? children : <Navigate to={redirect} />
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.element.isRequired,
  redirect: PropTypes.string
}
