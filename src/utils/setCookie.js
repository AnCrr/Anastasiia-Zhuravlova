export const setCookie = (name, value) => {
  // const d = new Date();
  // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  // let expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + ";secure";
};
