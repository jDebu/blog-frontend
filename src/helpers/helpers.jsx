import { useLocation } from "react-router-dom"
import queryString from 'query-string'

export const truncateText = (text, maxLength) => (text.length > maxLength ? `${text.slice(0, maxLength)}...` : text)
export const setItemToLocalStorage = (key, value) => localStorage.setItem(key, value)
export const getItemFromLocalStorage = key => localStorage.getItem(key)
export const getJsonItemFromLocalStorage = key => JSON.parse(getItemFromLocalStorage(key))
export const removeItemFromLocalStorage = keys => keys.map(key => localStorage.removeItem(key))
export const isAdminRoute =  /^\/admin(?:\/|$)/.test(location.pathname)
export const isDetailRoute =  /^\/articles(?:\/|$)/.test(location.pathname)
export const isArticleDetailRoute = /^\/articles\/.*$/.test(window.location.pathname);
export const getFirstLetter = (name = '') => (name.match(/[a-z]/i).length > 0 ? name.match(/[a-z]/i)[0].toUpperCase() : '')
export const fieldWidthSizes = {
  full: 'w-full',
  '5xl': 'sm:max-w-xl',
  '4xl': 'sm:max-w-lg',
  '3xl': 'sm:max-w-md',
  '2xl': 'sm:max-w-sm',
  xl: 'sm:max-w-xs',
  lg: 'sm:max-w-64',
  md: 'sm:max-w-48'
}
export const urlSearchParamsData = () => {
  const { search } = useLocation()
  return queryString.parse(search)
}
export const ORDER_OPTIONS = [
  { value: 'created_at desc', label: 'Most recent' },
  { value: 'created_at asc', label: 'Oldest first' }
]
