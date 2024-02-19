import { useState, useEffect } from 'react'
import { Article } from './Article.jsx'

export const ArticleList = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('https://jdebu.dev/backend/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error))
  }, [])

  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} title={article.title} body={article.body.body} slug={article.slug} listMode={true}/>
      ))}
    </div>
  );
};
