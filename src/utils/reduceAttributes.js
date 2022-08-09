export const reduceAttributes = (attributes) => {
  return attributes.reduce((accum, attribute) => {
    let result = {};
    result = { id: attribute.id, name: attribute.name, values: [] };
    attribute.items.map((item) => result.values.push(item.value));
    accum.push(result);
    return accum;
  }, []);
};
