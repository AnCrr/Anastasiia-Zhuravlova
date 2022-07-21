export const setCartToLs = (items) => {
  const json = JSON.stringify(items);
  localStorage.setItem("cart", json);
};
