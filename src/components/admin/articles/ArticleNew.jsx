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

  const base = import.meta.env.VITE_API_BASE;
  const [initialValues, setInitialValues] = useState(formValues)
  const navigate = useNavigate()
  const onSubmit = async values => {
    try {
      console.log(values)
      const formData = new FormData();
    
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('file', values.file[0]);

      console.log(formData)

      const options = {
        method: 'POST',
        body: formData,
      };
    
      const response = await fetch(`${base}/admin/api/articles`, options)
      const jsonResponse = await response.json()
      if (!jsonResponse?.id) {
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
