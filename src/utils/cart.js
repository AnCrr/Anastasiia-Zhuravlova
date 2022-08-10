import { getCookie } from "./cookies";

export const calcTotalPrice = (products) => {
  const currency = getCookie("activeCurrency");
  const result = products.reduce((accum, product) => {
    const currentPrice = product.prices.find(
      (price) => price.currency.label === currency
    );
    accum += currentPrice.amount * product.count;
    return accum;
  }, 0);

  return Number(result.toFixed(2));
};

export const setCartToLs = (products) => {
  localStorage.setItem("cart", JSON.stringify(products));
};

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};

export const isNeedChangeCount = (cartItem, product) => {
  return cartItem.activeAttributes.every((attr) => {
    return product.activeAttributes.find(
      (item) => attr.id === item.id && attr.value === item.value
    );
  });
};

export const addProduct = (cart, product) => {
  const isProductExistInCart = cart.some((cartItem) => {
    if (cartItem.id === product.id) {
      if (isNeedChangeCount(cartItem, product)) {
        ++cartItem.count;
        return true;
      }
    }
  });

  if (!isProductExistInCart) {
    cart.push({
      ...product,
      count: 1,
      activeAttributes: product.activeAttributes,
    });
  }
};

export const removeProduct = (cart, product) => {
  for (let index = 0; index < cart.length; index++) {
    const cartItem = cart[index];

    if (cartItem.id === product.id) {
      if (isNeedChangeCount(cartItem, product)) {
        --cartItem.count;
      }

      if (cartItem.count < 1) {
        cart.splice(index, 1);
      }

      break;
    }
  }
};

export const calcTotalCount = (items) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
