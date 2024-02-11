import React from 'react'
import { Form } from 'react-final-form'

import PropTypes from 'prop-types'

import AutoSave from '../AutoSave'
import SearchField from '../fields/SearchField'
import SelectField from '../fields/SelectField'
import { Button } from '@mui/material'

const classNames = [
  'mx-9',
  'pt-9',
  'pb-6',
  'flex items-end justify-center md:justify-between',
  'flex-wrap md:flex-nowrap',
  'border-b border-gray-300 border-solid'
]

const BoxTable = ({
  title,
  description,
  children,
  initialFilters,
  onFilter,
  buttons = [],
  sortOptions,
  sortByName = 'sort',
  values,
  searchFieldName,
  searchPlaceholder = 'Buscar por nombre o ID',
  className,
  displayTotal = false,
  displayHeader = true,
  displaySort = true
}) => {
  return (
    <div className={className}>
      <Form onSubmit={onFilter} initialValues={initialFilters}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {displayHeader && (
              <section className={classNames.join(' ')}>
                <article className="flex flex-col pb-4 md:pb-0">
                  <h2 className="md:text-left w-full md:w-auto font-bold text-2xl">{title}</h2>
                  {description && <p className="mb-2 md:mb-0 pt-4">{description}</p>}
                </article>
                {buttons.length && (
                  <article className="flex flex-col-reverse md:flex-row content-end md:items-center justify-end w-full md:w-auto">
                    {buttons?.map((button, index) => (
                      <Button
                        key={index}
                        href={button.url}
                        variant="contained"
                        fullWidth
                      >
                        {button.text}
                      </Button>
                    ))}
                  </article>
                )}
              </section>
            )}
            <AutoSave debounce={1000} save={onFilter} />
            <section className="p-9">
              <article className="flex justify-between flex-wrap md:flex-nowrap">
                <SearchField
                  name={searchFieldName}
                  placeholder={searchPlaceholder}
                  containerClassName="w-full mb-4 md:mb-0 max-w-72"
                />
                {displaySort && (
                  <SelectField
                    size="full"
                    name={sortByName}
                    label="Ordenar por:"
                    orientation="horizontal"
                    containerClassName="mt-2 md:mt-0"
                    parentClassName="md:w-90"
                    options={sortOptions}
                    margin="none"
                  />
                )}
              </article>
              <article className="flex justify-center flex-wrap">
                {displayTotal && (
                  <p className="font-medium mr-auto mb-6 mt-9">Resultados encontrados: {values.total_count}</p>
                )}
                <div className="w-full">{children}</div>
              </article>
            </section>
          </form>
        )}
      </Form>
    </div>
  )
}

export default BoxTable

BoxTable.propTypes = {
  options: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  initialFilters: PropTypes.object,
  onFilter: PropTypes.func,
  buttons: PropTypes.array,
  sortOptions: PropTypes.array,
  sortByName: PropTypes.string,
  values: PropTypes.object,
  searchFieldName: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  className: PropTypes.string,
  displayTotal: PropTypes.bool,
  displayHeader: PropTypes.bool,
  displaySort: PropTypes.bool,
  showInstitution: PropTypes.bool
}
