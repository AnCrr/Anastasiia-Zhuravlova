import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items).toFixed(2);

  return {
    items: items,
    totalPrice,
    opened: false,
  };
};
