export const reduceAttrs = (attributes) => {
  return attributes.reduce((accum, attribute) => {
    const obj = {};
    obj.id = attribute.id;
    obj.name = attribute.name;
    obj.values = [];
    // if (Object.keys(attribute).length >= 4) {

    attribute.items.map((item) => obj.values.push(item.value));
    // }

    accum.push(obj);
    return accum;
  }, []);
};
