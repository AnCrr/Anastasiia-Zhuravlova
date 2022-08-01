export const findCorrectPrice = (priceArr, currency) => {
  priceArr.map((price, index) => {
    return (
      price.currency.label === currency && (
        <p key={index}>
          {price.currency.symbol}
          {price.amount}
        </p>
      )
    );
  });
};
