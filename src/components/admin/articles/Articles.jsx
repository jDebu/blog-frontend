import React from 'react'

import { ORDER_OPTIONS } from '../../../helpers/helpers'
import BoxTable from '../../ui/BoxTable'
import ArticlesTable from './ArticlesTable'
import useFilters from '../../../hooks/useFilters'


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
