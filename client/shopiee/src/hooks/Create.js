export const useCreate = async (url, data) => {
  let err = '';
  let isLoading = false;

  const requestOpt = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOpt);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    err = error.message;
  } finally {
    isLoading = true;
  }

  return { err, isLoading };
};
