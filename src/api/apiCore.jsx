export const request = ({ url, ...options }) => {
  const onSuccess = (response) =>  {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  };
  const onError = (error) => Promise.reject(error);
  const rootUrl = import.meta.env.VITE_API_BASE;
  return fetch(`${rootUrl}${url}`, { ...options, headers: { 'Content-type': 'application/json' } })
    .then(onSuccess)
    .catch(onError);
};
