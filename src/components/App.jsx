import React from 'react'
import { AppRouter } from '../routers/AppRouter'
import Auth from '../auth/Auth'

const App = () => {
  return (
    <Auth>
      <AppRouter />
    </Auth>
  )
}

export default App
