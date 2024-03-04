import { post } from "~/src/utils/apiMethods";
import apiUrl from "~/src/api/constants";

export const LoginAPI = async (data) => {
  return await post(apiUrl.get_login_url(), data);
};
