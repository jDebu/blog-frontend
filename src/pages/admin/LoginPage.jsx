import React from 'react'
import { Form, Field } from 'react-final-form'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Container } from '../../components/Container'
import { FORM_ERROR } from 'final-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/Auth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const onSubmit = async values => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
    
      const response = await fetch('https://jdebu.dev/backend/admin/sessions.json', options)
      const jsonResponse = await response.json()
      if (!response.ok) {
        return { [FORM_ERROR]: jsonResponse.error}
      }

      dispatch({ type: 'Login', payload: { ...jsonResponse } })

      navigate('/admin/home')
      
    } catch (error) {
      return { [FORM_ERROR]: `Ocurrió un error: ${error}` }
    }
  }
  return (
    <Container className="px-5 md:px-20">
      <div className="pt-8 md:pt-14 pb-14 md:pb-18">
        <div className="md:text-center pb-7.5 md:pb-10">
          <p className="font-black pt-4 md:pt-5">Blog</p>
        </div>
        <div className="m-auto max-w-xl">
          <div className="p-6 md:p-9 border border-blue-200 shadow-auth-register">
            <h2 className="md:text-center pb-6 md:pb-7.5 font-bold text-xl md:text-2xl">
              Sign in
            </h2>
            <Form onSubmit={onSubmit}>
              {({ handleSubmit, submitError, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        label="Email"
                        fullWidth
                        required
                        margin="normal"
                        focused
                      />
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        focused
                      />
                    )}
                  />
                  {submitError && (
                    <div className="text-red-750 font-normal leading-5 text-base text-center pb-4 -mt-1">
                      {submitError}
                    </div>
                  )}
                  <div className="flex justify-center mt-2">
                    <Button disabled={pristine || submitting} variant="contained" type="submit" className="m-auto" fullWidth margin="normal">
                      Sign in
                    </Button>
                  </div>
                  <div className="text-center my-4">
                    Social Links
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}
