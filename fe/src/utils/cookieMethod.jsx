const setCookie = (key, value, path, ttl) => {
  today = new Date();
  var expire = new Date();
  expire.setTime(today.getTime() + ttl);

  document.cookie = `${key}=${value};path=${path};expires=${expire}`;
};

export { setCookie };
