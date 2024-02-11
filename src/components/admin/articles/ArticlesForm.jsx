import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'

import PropTypes from 'prop-types'
import { Button, CircularProgress, IconButton, TextField } from '@mui/material'
import MdEditor  from '@uiw/react-md-editor'
import DeleteIcon from '@mui/icons-material/Delete'
import CodeMermaid from '../../ui/CodeMermaid'

export const ArticlesForm = ({ initialValues = {}, onSubmit, create }) => {
  const [bodyValue, setBodyValue] = useState(initialValues?.body?.body ?? '')
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true)

  const loadImages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/api/images`);
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

      const response = await fetch(`http://localhost:3000/admin/api/images`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        loadImages();
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }

  const handleImageDelete = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/api/images/${imageId}`, {
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
                      src={image.url}
                      alt="Article Image"
                      style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(image.url, image.id)}
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
