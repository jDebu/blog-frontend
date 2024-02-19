import { FORM_ERROR } from 'final-form'
import { ArticlesForm } from './ArticlesForm.jsx'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../Container.jsx'
import { useState } from 'react'

const formValues = {
  title: '',
  content: ''
}

export const ArticleNew = () => {
  const [initialValues, setInitialValues] = useState(formValues)
  const navigate = useNavigate()
  const onSubmit = async values => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
    
      const response = await fetch('https://jdebu.dev/backend/admin/api/articles', options)
      const jsonResponse = await response.json()
      if (!response.ok) {
        return { [FORM_ERROR]: jsonResponse.error}
      }

      navigate('/admin/articles')
      
    } catch (error) {
      return { [FORM_ERROR]: `Ocurrió un error: ${error}` }
    }
  }
  return (
    <>
      <Container className="px-20 pt-14 pb-18">
        <p className="mb-7.5 font-bold text-4xl">Create Article </p>
        <ArticlesForm initialValues={initialValues} onSubmit={onSubmit} create />
      </Container>
    </>
  )
}
