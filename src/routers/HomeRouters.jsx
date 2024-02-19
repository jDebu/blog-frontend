import { Route, Routes } from 'react-router-dom'

import { HomeTab } from '../components/ui/HomeTab.jsx'
import { ArticleDetail } from '../components/articles/ArticleDetail.jsx'

const HomeRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeTab />} />
    <Route path="/about" element={<HomeTab />} />
    <Route path="/articles/:slug" element={<ArticleDetail />} />
  </Routes>
)

export default HomeRoutes
