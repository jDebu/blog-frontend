import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

export const PublicRoute = ({ isAuthenticated, children, redirect = '/home' }) =>
  !isAuthenticated ? children : <Navigate to={redirect} />

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.element.isRequired,
  redirect: PropTypes.string
}
