import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from '../api/apiCore'

const fetchArticle = id => request({ url: `/admin/api/articles/${id}.json` })

const updateArticle =  data =>  request({ url: `/admin/api/articles/${data.id}.json`, body: JSON.stringify(data), method: 'PATCH' })

export const useArticleData = id => useQuery(['article', id], () => fetchArticle(id))

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation(updateArticle, {
    onSuccess: data => {
      queryClient.clear();
      queryClient.invalidateQueries(['article', data.id])
    }
  })
}
