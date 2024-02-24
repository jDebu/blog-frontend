import { useState, useEffect, createRef } from 'react'
import { Form, Field } from 'react-final-form'

import PropTypes from 'prop-types'
import { Button, CircularProgress, IconButton, Input, TextField } from '@mui/material'
import MdEditor  from '@uiw/react-md-editor'
import DeleteIcon from '@mui/icons-material/Delete'
import CodeMermaid from '../../ui/CodeMermaid.jsx'

export const ArticlesForm = ({ initialValues = {}, onSubmit, create }) => {
  const [bodyValue, setBodyValue] = useState(initialValues?.body?.body ?? '')
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true)
  const base = import.meta.env.VITE_API_BASE;
  const fileInputRef = createRef();

  const loadImages = async () => {
    try {
      const response = await fetch(`${base}/admin/api/images`);
      const json_response = await response.json();
      setImages(json_response);
    } catch (error) {
      console.error('Error loading images', error);
    } finally {
      setLoadingImages(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, [])

  const handleImageClick = (imageUrl, imageId) => {
    setBodyValue((prevBody) => `${prevBody}![Image_${imageId}](${imageUrl})`);
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);
      const options = {
        method: 'POST',
        body: formData,
      }

      const response = await fetch(`${base}/admin/api/images`, options)

      if (response.ok) {
        loadImages();
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }

  const handleImageDelete = async (imageId) => {
    try {
      const response = await fetch(`${base}/admin/api/images/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadImages();
      }
    } catch (error) {
      console.error('Error deleting image', error);
    }
  }

  const handleBodyChange = (value) => {
    setBodyValue(value);
  }

  const handleSubmit = (values) => {
    onSubmit({ ...values, body: bodyValue });
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      subscription={{ pristine: true, submitting: true, submitError: true, values: true }}
      autoComplete="off">
      {({ handleSubmit, submitError, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            render={({ input }) => (
              <TextField
                {...input}
                label="Title"
                fullWidth
                required
                margin="normal"
                focused
              />
            )}
          />
          <div className="mt-4">
            <label>Body:</label>
            <MdEditor
              value={bodyValue}
              onChange={handleBodyChange}
              height={300}
              previewOptions={{
                components: {
                  code: CodeMermaid
                }
              }}
            />
          </div>
          <div className="mt-4">
            <label>Available Images:</label>
            {loadingImages ? (
              <CircularProgress size={20} />
            ) : (
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                {images.map((image) => (
                  <div key={image.id} style={{ position: 'relative' }}>
                    <img
                      src={`${base.replace('/backend', '')}${image.url}`}
                      alt="Article Image"
                      style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`${base.replace('/backend', '')}${image.url}`, image.id)}
                    />
                    <IconButton
                      style={{ position: 'absolute', top: '0', right: '0' }}
                      onClick={() => handleImageDelete(image.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label>Upload Image:</label>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
          <div className="mt-4">
            <Field
              name="summary"
              render={({ input }) => (
                <TextField
                  {...input}
                  label="Summary"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  margin="normal"
                  focused
                />
              )}
            />
          </div>
          <div className="mt-4 mb-8">
            <label>Cover image:</label>
            <Field
              name="file"
              render={({ input }) => (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      input.onChange(event.target.files);
                    }}
                  />
                  <Input
                    type="text"
                    readOnly
                    value={input.value ? input.value[0].name : ''}
                    onClick={() => fileInputRef.current.click()}
                  />
                </>
              )}
            />

          </div>
          <div>
            <Button disabled={create?  pristine || submitting : false} variant="contained" type="submit" className="m-auto" fullWidth margin="normal">
              {create ? 'Create Article' : 'Save'}
            </Button>
          </div>
          {submitError && <div className="text-red-700 font-bold text-center">{submitError}</div>}
        </form>
      )}
    </Form>
  )
}
ArticlesForm.propTypes = {
  initialValues: PropTypes.object,
  create: PropTypes.bool,
  onSubmit: PropTypes.func
}
