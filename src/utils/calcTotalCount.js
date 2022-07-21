export const calcTotalCount = (items) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
