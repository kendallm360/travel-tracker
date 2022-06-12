const fetchData = (apiName) => {
  return fetch(`http://localhost:3001/api/v1/${apiName}`)
    .then((response) => response.json())
    .then((data) => data);
  //   .catch(err)
};

const postData = (formData) => {
  let url = `http://localhost:3001/api/v1/trips`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export { fetchData, postData };
