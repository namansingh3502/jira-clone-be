const apiUrl = {
  get_token_URL: () => "/api/auth/token",
  get_login_url: () => "/api/auth/login/",
  get_register_url: () => "/api/auth/register/",
  get_token_refresh_url: () => "/api/auth/token/refresh",
  get_account_activation_link: (uidb64, token) =>
    `/api/auth/activate/${uidb64}/${token}`,
};

export default apiUrl;
