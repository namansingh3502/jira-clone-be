const getLocalstorage = (key) => {
  const now = new Date();
  const time = now.getTime();

  const data = JSON.parse(localStorage.getItem(key));

  if (data && data.expirytime > time) {
    return data.value;
  } else {
    localStorage.removeItem(key);
  }
  return null;
};

const setLocalstorage = (key, value, ttl) => {
  const now = new Date();
  const time = now.getTime();

  const data = {
    value: value,
    expirytime: time + ttl,
  };

  localStorage.setItem(key, JSON.stringify(data));
};

const clearLocalstorage = () => localStorage.clear();

export { getLocalstorage, setLocalstorage, clearLocalstorage };
