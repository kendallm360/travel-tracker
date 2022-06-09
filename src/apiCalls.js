const fetchData = (apiName) => {
  return fetch(`http://localhost:3001/api/v1/${apiName}`)
    .then((response) => response.json())
    .then((data) => data);
  //   .catch(err)
};

export { fetchData };
