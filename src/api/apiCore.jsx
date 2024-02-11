export const request = ({ url, ...options }) => {
  const onSuccess = (response) => response.json();
  const onError = (error) => Promise.reject(error);
  const rootUrl = import.meta.env.VITE_API_BASE;
  console.log(rootUrl);
  return fetch(`${rootUrl}${url}`, { ...options, headers: { 'Content-type': 'application/json' } })
    .then(onSuccess)
    .catch(onError);
};