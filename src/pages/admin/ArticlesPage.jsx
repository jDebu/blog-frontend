import React from 'react'
import { Container } from '../../components/Container'
import { Articles } from '../../components/admin/articles/Articles'

export const ArticlesPage = () => {
  return (
    <>
      <section className="justify-center py-12">
        <div className="md:mt-2 mt-24">
          <Articles />
        </div>
      </section>
    </>
  )
}
