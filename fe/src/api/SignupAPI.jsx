import { post } from "./apiMethods";
import apiUrl from "./constants";

export const LoginAPI = async (data) => {
  const res = await post(apiUrl.get_register_url(), data);
};
