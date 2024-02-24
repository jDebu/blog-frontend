import { useState, useEffect } from 'react'
import { Article } from './Article.jsx'

export const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const base = import.meta.env.VITE_API_BASE

  useEffect(() => {
    fetch(`${base}/api/articles`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error))
  }, [])

  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} title={article.title} body={article.body.body} slug={article.slug} summary={article.summary} coverImage={article.cover_image} listMode={true}/>
      ))}
    </div>
  );
};
