const get_localstorage_item = (key) => {
  const now = new Date();
  const time = now.getTime();

  const data = JSON.parse(localStorage.getItem(key));

  if (data && data.expirytime < time) {
    return data.value;
  }
  return null;
};

const set_localstorage_item = (key, value, ttl) => {
  const now = new Date();
  const time = now.getTime();

  data = {
    value: value,
    expirytime: time + ttl,
  };

  localStorage.setItem(key, JSON.stringify(data));
};

export { get_localstorage_item, set_localstorage_item };
