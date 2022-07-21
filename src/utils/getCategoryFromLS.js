export const getCategoryFromLS = () => {
  const data = localStorage.getItem("category");
  //   const items = data ? JSON.parse(data) : [];

  return {
    category: data,
  };
};
