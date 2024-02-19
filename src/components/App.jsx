import { AppRouter } from '../routers/AppRouter.jsx'
import Auth from '../auth/Auth.jsx'

const App = () => {
  return (
    <Auth>
      <AppRouter />
    </Auth>
  )
}

export default App
