import React, { useState, useEffect } from 'react'
import { Article } from './Article'

export const ArticleList = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('http://165.232.151.68:3000/api/articles')
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
