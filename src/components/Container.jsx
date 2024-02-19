import clsx from 'clsx'
import PropTypes from 'prop-types'

export const Container = ({ className, ...props }) => {
  return <div className={clsx('container mx-auto', className)} {...props} />
}

Container.propTypes = {
  className: PropTypes.string
}
