import { Container } from '../components/Container.jsx'
import { ArticleList } from '../components/articles/ArticleList.jsx'

export const HomePage = () => {
  return (
    <Container className="px-5 md:mt-2">
      <section className="justify-center py-12">
        <div className="md:mt-2 mt-24">
          <ArticleList />
        </div>
      </section>
    </Container>
  )
}