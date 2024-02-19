import ReactPaginate from 'react-paginate'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { useMediaQuery, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import NextIcon from '../../assets/images/next_icon.svg'

export const Pagination = ({ numPages, paginationLabel = 'page', className = 'mt-9' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onPageChange = ({ selected }) => {
    const parsed = { ...queryString.parse(location.search), [paginationLabel]: selected + 1 }
    navigate({ search: queryString.stringify(parsed) })
  }

  return numPages !== 1 ? (
    <section className={`flex justify-center ${className}`}>
      <ReactPaginate
        previousLabel={
          <span className="flex items-center pr-3">
            <ReactSVG src={NextIcon} className="transform rotate-180 pl-3" /> Anterior
          </span>
        }
        nextLabel={
          <span className="flex items-center pl-3">
            Siguiente <ReactSVG src={NextIcon} className="pl-3" />
          </span>
        }
        breakLabel={<span className="gap">...</span>}
        pageCount={numPages}
        forcePage={queryString.parse(location.search)[paginationLabel] - 1 || 0}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={'disable'}
        pageClassName={'page'}
        activeClassName={'active'}
        activeLinkClassName={'active-link'}
        pageLinkClassName={'link'}
        pageRangeDisplayed={isMobileScreen ? 0 : 1}
        marginPagesDisplayed={isMobileScreen ? 0 : 1}
      />
    </section>
  ) : null
}

Pagination.propTypes = {
  numPages: PropTypes.number,
  paginationLabel: PropTypes.string,
  className: PropTypes.string
}
