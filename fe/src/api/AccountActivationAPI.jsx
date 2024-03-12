import { get } from "~/src/utils/apiMethods";
import apiUrl from "~/src/api/constants";

export const AccountActivationAPI = async (uidb64, token) => {
  return await get(apiUrl.get_account_activation_link(uidb64, token));
};
