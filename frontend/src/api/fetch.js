import { API_URL } from "./config";

const getHeaders = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
};

export const post = async (destination, body) => {
  const headers = getHeaders();
  const result = await fetch(`${API_URL}${destination}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (result.ok) {
    return result.json();
  }

  // eslint-disable-next-line no-throw-literal
  throw { error: result.status };
};
