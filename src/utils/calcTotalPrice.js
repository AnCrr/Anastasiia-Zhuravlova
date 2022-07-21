import { getCookie } from "./getCookie";

export const calcTotalPrice = (items) => {
  // console.log("items", items);
  const prices = [];
  items.forEach((item) => {
    const count = item.count;
    item.prices.forEach((price) => {
      // console.log(price);
      return price.currency.label === getCookie("activeCurrency")
        ? prices.push(price.amount * count)
        : null;
    });
  });

  return prices.reduce((sum, price) => (sum += price), 0);
};
