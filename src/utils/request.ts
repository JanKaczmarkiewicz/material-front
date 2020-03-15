type RequestOptions = {
  useAuthorizationToken?: boolean;
};

export default (query: string, requestOptions: RequestOptions = {}) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(requestOptions.useAuthorizationToken && {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    },
    body: JSON.stringify({ query })
  };
  return fetch(`http://localhost:1337/graphql`, options).then((res: Body) =>
    res.json()
  );
};
