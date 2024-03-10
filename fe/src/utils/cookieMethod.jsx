const setCookie = (key, value, path, ttl) => {
  document.cookie = `${key}=${value};path=${path};expires=${expire}`;
};

export { setCookie };
