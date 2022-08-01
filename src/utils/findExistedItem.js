export const findExistedItem = (cart, product) => {
  const foundProduct = cart.find((cartItem) => {
    if (cartItem.id === product.id) {
      const isNeedCountUp = cartItem.attrs.every((attr) => {
        // console.log(attr.id);
        return product.attrs.find(
          (item) => attr.id === item.id && attr.value === item.value
        );
      });
      //   console.log(isNeedCountUp);
      if (isNeedCountUp) {
        --cartItem.count;
        return true;
      }
    }
  });
};
