import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './components/App.jsx'
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.css'
import './assets/stylesheets/application.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
})

const root = createRoot(document.getElementById('root'))

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
