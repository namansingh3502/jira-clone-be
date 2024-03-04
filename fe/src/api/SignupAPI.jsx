import { post } from "~/src/utils/apiMethods";
import apiUrl from "~/src/api/constants";

export const SignupAPI = async (data) => {
  return post(apiUrl.get_register_url(), data);
};
