import { useField } from 'react-final-form'

export const useCustomField = (name, config) => {
  const { input, meta } = useField(name, { ...config })
  const error = meta.error || meta.submitError
  const gotError = meta.touched && error && typeof error === 'string'

  return { input, meta, error, gotError }
}
