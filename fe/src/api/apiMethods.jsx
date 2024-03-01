import axios from "axios";

const HEADERS = {
  "Content-Type": "application/x-www-forms-urlencoded",
  "X-Requested-With": "XMLHttpRequest",
  "Cache-Control": "no-cache",
  "X-CSRFToken": window["CSRF_TOKEN"],
  Accept: "application/json",
};
const get = (url, config) => {
  return axios.get(url, config);
};

const post = (url, body) => {
  const config = {
    header: HEADERS,
  };

  const requestBody = {
    ...body,
    csrfmiddlewaretoken: window["CSRF_TOKEN"],
  };

  return axios.post(url, requestBody, config);
};

export { get, post };
