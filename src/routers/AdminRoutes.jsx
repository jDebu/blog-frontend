import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeTab } from '../components/ui/HomeTab'
import { ArticleNew } from '../components/admin/articles/ArticleNew'
import { ArticleEdit } from '../components/admin/articles/ArticleEdit'

export const AdminRoutes = () => (
  <Routes>
    <Route path="home" element={<HomeTab />} />
    <Route path="articles" element={<HomeTab />} />
    <Route path="articles/new" element={<ArticleNew />} />
    <Route path="articles/:id/edit" element={<ArticleEdit />} />
    <Route path="*" element={<Navigate to="home" replace />} />
  </Routes>
)
