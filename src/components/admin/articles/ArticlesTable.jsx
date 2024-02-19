import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import { IconButton } from '@mui/material'
import EditIcon from '../../../assets/images/edit_icon.svg'
import ViewIcon from '../../../assets/images/view_icon.svg'
import { Pagination } from '../../ui/Pagination.jsx'

const TableActions = ({ article }) => {
  return (
    <>
      <IconButton
        component={Link}
        to={`/admin/articles/${article.id}`}
        className="!p-0 hover:!bg-transparent"
        disableRipple
      >
        <img src={ViewIcon} alt="view-icon" />
      </IconButton>
      <IconButton
        component={Link}
        to={`/admin/articles/${article.id}/edit`}
        className="!p-0 !ml-5 hover:!bg-transparent"
        disableRipple
      >
        <img src={EditIcon} alt="edit-icon" />
      </IconButton>
    </>
  )
}

const ArticlesTable = ({ articles = [], totalPages = 0 }) => (
  <>
    <section className="overflow-x-auto overflow-y-hidden">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <Fragment key={article.id}>
              <tr>
                <td>{article.title}</td>
                <td className="text-right">
                  <TableActions article={article} />
                </td>
              </tr>
              <tr className="h-2"></tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
    <Pagination numPages={Math.ceil(totalPages)} paginationLabel="admin_page" className="mt-4" />
  </>
)

ArticlesTable.propTypes = {
  articles: PropTypes.array,
  totalPages: PropTypes.number
}

TableActions.propTypes = {
  article: PropTypes.object
}

export default ArticlesTable
