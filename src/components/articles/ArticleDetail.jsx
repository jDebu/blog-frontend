import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../Container.jsx'
import { Article } from './Article.jsx'
import { request } from '../../api/apiCore.jsx';

export const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await request({url: `/api/articles/${slug}`});
        console.log(response)
        if (!response.id) {
          throw new Error('Error fetching article');
        }
        setArticle(response);
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
