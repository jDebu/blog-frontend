import { useNavigate, useParams } from 'react-router-dom'

import { FORM_ERROR } from 'final-form'

import { Container } from '../../Container.jsx'
import { ArticlesForm } from './ArticlesForm.jsx'
import { useArticleData, useUpdateArticle } from '../../../hooks/useArticles.jsx'

export const ArticleEdit = () => {
  const { id } = useParams()
  const { data: article } = useArticleData(id)
  const { mutate: patchArticle } = useUpdateArticle()
  const navigate = useNavigate()

  const onSubmit = async values => {
    try {
      await patchArticle(values)
      navigate('/admin/articles')
    } catch (error) {
      return { [FORM_ERROR]: 'Ocurrió un error al editar el usuario.' }
    }
  }

  if (!article) return

  return (
    <>
      <Container className="px-20 pt-14 pb-18">
        <p className="mb-7.5 font-bold text-4xl">Edit Article </p>
        <ArticlesForm
          initialValues={{
            ...article
          }}
          onSubmit={onSubmit}
        />
      </Container>
    </>
  )
}
