export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const request = async (
  endpoint,
  { method = "GET", body = {}, headers = {} } = {}
) => {
  const accessToken = JSON.parse(localStorage.getItem("user") ?? "{}")?.token;

  return await (
    await fetch(`http://localhost:4000${endpoint}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
    })
  ).json();
};

