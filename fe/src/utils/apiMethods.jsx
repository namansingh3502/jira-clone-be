import axios from "axios";

import { CSRFTokenGenerator } from "~/src/utils/csrfTokenGenerator";
import { getLocalstorage } from "~/src/utils/localstorageMethods";

const HEADERS = {
  "Content-Type": "multipart/form-data",
  "X-Requested-With": "XMLHttpRequest",
  "Cache-Control": "no-cache",
  Accept: "application/json",
};

const get = async (url) => await axios.get(url);

const _post = (url, requestBody, config) => {
  return axios.post(url, requestBody, config);
};

const post = async (url, body) => {
  let csrfToken = getLocalstorage("CSRF_TOKEN");
  if (csrfToken === null) {
    csrfToken = await CSRFTokenGenerator();
  }

  let config = {
    headers: {
      ...HEADERS,
      "X-CSRFToken": csrfToken,
    },
  };
  let requestBody = {
    ...body,
    csrfmiddlewaretoken: csrfToken,
  };
  let response = await _post(url, requestBody, config);

  return response;
};

export { get, post };
