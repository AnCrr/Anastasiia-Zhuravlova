import { getCookie } from "./cookies";

export const calcTotalPrice = (items) => {
  const prices = [];

  items.forEach((item) => {
    const count = item.count;
    item.prices.forEach((price) => {
      return price.currency.label === getCookie("activeCurrency")
        ? prices.push(price.amount * count)
        : null;
    });
  });
  const result = prices.reduce((sum, price) => (sum += price), 0);
  return Number(result.toFixed(2));
};

export const setCartToLs = (items) => {
  const json = JSON.stringify(items);
  localStorage.setItem("cart", json);
};

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items =
    data !== "undefined" && data !== "null" && data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items,
    totalPrice,
    isModalOpened: false,
  };
};

export const handleProuctInCart = (cart, product, operator) => {
  const foundProduct = cart?.find((cartItem) => {
    if (cartItem.id === product.id) {
      const isNeedChangeCount = cartItem.activeAttributes.every((attr) => {
        return product.activeAttributes.find(
          (item) => attr.id === item.id && attr.value === item.value
        );
      });
      if (isNeedChangeCount) {
        operator === true ? ++cartItem.count : --cartItem.count;
        return true;
      }
    }
  });

  if (!foundProduct) {
    cart.push({
      ...product,
      count: 1,
      activeAttributes: product.activeAttributes,
    });
  }
};
