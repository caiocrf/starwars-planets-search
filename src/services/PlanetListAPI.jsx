const planetListAPI = async () => {
  const api = 'https://swapi.dev/api/planets';
  const response = await fetch(api);
  const result = await response.json();
  result.results.forEach((ele) => delete ele.residents);
  return result.results;
};

export default planetListAPI;
