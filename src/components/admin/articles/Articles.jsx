import { ORDER_OPTIONS } from '../../../helpers/helpers.jsx'
import BoxTable from '../../ui/BoxTable.jsx'
import ArticlesTable from './ArticlesTable.jsx'
import useFilters from '../../../hooks/useFilters.jsx'


export const Articles = () => {
  const { onFilter, initialFilters, results } = useFilters('admin/api/articles.json', { sort: 'created_at desc' })

  const customOnFilter = values => {
    delete values.status
    onFilter({ ...values })
  }

  return (
    <BoxTable
      title='Articles'
      initialFilters={initialFilters}
      onFilter={customOnFilter}
      buttons={[
        {
          text: 'New Article',
          url: '/admin/articles/new',
          isActiveButton: results.total_count < results.institution?.num_max_gobuser,
          className: 'bg-white'
        }
      ]}
      sortOptions={ORDER_OPTIONS}
      values={results}
      searchPlaceholder="Search by title"
      displayTotal={true}
      searchFieldName="search_article"
      className="bg-gray-40 rounded"
    >
      <ArticlesTable articles={results.data || []} totalPages={results.total_pages} />
    </BoxTable>
  )
}
