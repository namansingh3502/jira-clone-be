import { get } from "~/src/utils/apiMethods";
import apiUrl from "~/src/api/constants";

import { set_localstorage_item } from "~/src/utils/localstorageMethods";

const fetch_csrf_token = async () => {
  const response = await get(apiUrl.get_token_URL());
  return response.data.token;
};

export const CSRFTokenGenerator = async () => {
  const token = await fetch_csrf_token();
  set_localstorage_item("CSRF_TOKEN", token, 60 * 60);
  return token;
};
