import React from 'react'
import { Container } from '../components/Container'
import { ArticleList } from '../components/articles/ArticleList'

export const HomePage = () => {
  return (
    <Container className="px-5 md:px-20 md:mt-2">
      <section className="justify-center py-12">
        <div className="md:mt-2 mt-24">
          <ArticleList />
        </div>
      </section>
    </Container>
  )
}