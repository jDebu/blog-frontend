import React from 'react'

import PropTypes from 'prop-types'

import { useCustomField } from '../../hooks/useCustomField'
import { FormHelperText } from '@mui/material'

const Error = ({ name, className }) => {
  const { error, gotError } = useCustomField(name, {
    subscription: { touched: true, error: true, submitError: true }
  })

  return gotError ? (
    <FormHelperText error className={`${className} !mt-0 !text-base !tracking-normal`}>
      {error}
    </FormHelperText>
  ) : null
}

export default Error

Error.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
}
