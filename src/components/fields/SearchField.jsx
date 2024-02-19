import { useField } from 'react-final-form'
import { ReactSVG } from 'react-svg'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import SearchIcon from '../../assets/images/search_icon.svg'

const SearchField = ({ name, placeholder = 'Buscar', containerClassName = 'sm:max-w-84' }) => {
  const { input } = useField(name, { parse: a => a })

  return (
    <section
      className={clsx(
        'flex items-center border-2 border-gray-850 rounded mb-6 py-2.5 px-4 w-full bg-white',
        containerClassName
      )}
    >
      <input placeholder={placeholder} className="w-full placeholder-gray-550 focus:outline-none" {...input} />
      <button className="flex">
        <ReactSVG src={SearchIcon} />
      </button>
    </section>
  )
}

export default SearchField

SearchField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  containerClassName: PropTypes.string
}
