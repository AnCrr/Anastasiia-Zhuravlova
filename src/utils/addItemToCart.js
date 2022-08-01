import { reduceAttrs } from "./reduceAttrs";

export const addItemToCart = (cart, product) => {
  //   console.log(product);
  //   const attributes = reduceAttrs(product.attributes);
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
        ++cartItem.count;
        return true;
      }
    }
  });

  if (!foundProduct) {
    cart.push({ ...product, count: 1, attrs: product.attrs });
  }
};

// let cart = [
//   {
//     id: "macbook 2020",
//     count: 1,
//     attrs: [
//       {
//         id: "Capacity",
//         value: "256GB",
//       },
//       {
//         id: "With USB 3 ports",
//         value: "No",
//       },
//     ],
//   },
//   {
//     id: "macbook 2020",
//     count: 1,
//     attrs: [
//       {
//         id: "Capacity",
//         value: "512GB",
//       },
//       {
//         id: "With USB 3 ports",
//         value: "No",
//       },
//     ],
//   },
// ];

// const existedMac = {
//   id: "macbook 2020",
//   count: 1,
//   attrs: [
//     {
//       id: "Capacity",
//       value: "512GB",
//     },
//     {
//       id: "With USB 3 ports",
//       value: "No",
//     },
//   ],
// };
// const notExistedMac = {
//   id: "macbook 2020",
//   count: 1,
//   attrs: [
//     {
//       id: "Touch ID in keyboard",
//       value: "No",
//     },
//     {
//       id: "With USB 3 ports",
//       value: "No",
//     },
//   ],
// };
// const notExistedMac2 = {
//   id: "macbook 2020",
//   count: 1,
//   attrs: [
//     {
//       id: "Touch ID in keyboard",
//       value: "No",
//     },
//     {
//       id: "With USB 3 ports",
//       value: "No",
//     },
//   ],
// };

// const macBookNew = {
//   id: "macbook 2022",
//   count: 1,
//   attrs: [
//     {
//       id: "Capacity",
//       value: "512GB",
//     },
//     {
//       id: "With USB 3 ports",
//       value: "Yes",
//     },
//     {
//       id: "Touch ID in keyboard",
//       value: "No",
//     },
//   ],
// };

// const addToCart = (cart, product) => {
//   const sameId = cart.reduce((accum, cartItem) => {
//     if (cartItem.id === product.id) {
//       accum.push(cartItem);
//     }
//     return accum;
//   }, []);
//   const arrayOfBool = [];
//   for (const sameIdItem of sameId) {
//     const diffArray = product.attrs.filter((attr1) => {
//       return !sameIdItem.attrs.some((attr2) => {
//         return attr1.id === attr2.id && attr1.value === attr2.value;
//       });
//     });
//     // на каждый sameIdItem возвращает массив с непохожими атрибутами

//     if (diffArray.length <= 0) {
//       sameIdItem.count++;
//       arrayOfBool.push(true);
//     } else {
//       arrayOfBool.push(false);
//     }
//   }

//   const ifExists = arrayOfBool.includes(true);
//   if (!ifExists) {
//     cart.push(product);
//   }
//   return cart;
// };

// // console.log("step 1", addToCart(cart, existedMac));
// // console.log("step 2", addToCart(cart, notExistedMac));
// // console.log("step 3", addToCart(cart, notExistedMac2));
// // console.log("step 4", addToCart(cart, macBookNew));

// export default {};

// // добавить то, что есть - увеличивается каунт, добавлять новое - пушить в массив
// // ещё раз добавлять продукт из второго шага, чтоб его каунт увеличился
// // добавляю абсолютно новый продукт
