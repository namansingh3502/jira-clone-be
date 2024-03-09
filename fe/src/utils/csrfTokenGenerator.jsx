import { get } from "~/src/utils/apiMethods";
import apiUrl from "~/src/api/constants";

import { setLocalstorage } from "~/src/utils/localstorageMethods";
import { setCookie } from "~/src/utils/cookieMethod";

const fetch_csrf_token = async () => {
  const response = await get(apiUrl.get_token_URL());
  return response.data.token;
};

export const CSRFTokenGenerator = async () => {
  const token = await fetch_csrf_token();
  const tokenTTL = process.env.CSRF_TOKEN_TTL;
  setLocalstorage("CSRF_TOKEN", token, tokenTTL);
  // setCookie("csrftoken", token, "/", tokenTTL)
  return token;
};
