import { post } from "./apiMethods";
import apiUrl from "./constants";

export const LoginAPI = async (data) => {
  return post(apiUrl.get_login_url(), data);
};
