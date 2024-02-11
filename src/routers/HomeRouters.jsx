import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { HomeTab } from '../components/ui/HomeTab'
import { ArticleDetail } from '../components/articles/ArticleDetail'

const HomeRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeTab />} />
    <Route path="/about" element={<HomeTab />} />
    <Route path="/articles/:slug" element={<ArticleDetail />} />
  </Routes>
)

export default HomeRoutes
