import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../Container'
import { Article } from './Article'

export const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://165.232.151.68:3000/api/articles/${slug}`);
        if (!response.ok) {
          throw new Error('Error fetching article');
        }

        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="px-5 md:px-20 lg:px-2 flex items-center">
      <Article key={article.id} title={article.title} body={article.body.body} slug={article.slug} listMode={false}/>
    </Container>
  );
};
