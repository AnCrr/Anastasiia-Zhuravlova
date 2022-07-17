import { client, Query, Field } from "@tilework/opus";
client.setEndpoint("http://localhost:4000/");

const productsFields = [
  "id",
  "name",
  "inStock",
  "gallery",
  "description",
  "category",
  "brand",
];

const currencyList = ["label", "symbol"];

const attrList = ["name", "type"];

const attrItemsList = ["displayValue", "value"];

// export const getCat = async () => {
//   const query = new Query("categories", true)
//     .addField("name")
//     .addField(
//       new Field("products").addField(new Field("prices").addField("amount"))
//     );

//   const result = await client.post(query);
//   // const arr = result.categories.map((item) => console.log(item.products));
//   //   console.log(result.categories);
// };

export const fetchProductsData = (title) => {
  const query = new Query("category", true)
    .addArgument("input", "CategoryInput", { title: title })
    .addField(
      new Field("products")
        .addFieldList(productsFields)
        .addField(
          new Field("prices")
            .addField("amount")
            .addField(new Field("currency").addFieldList(currencyList))
        )
        .addField(
          new Field("attributes")
            .addFieldList(attrList)
            .addField(new Field("items").addFieldList(attrItemsList))
        )
    );
  return client.post(query);
};

// export const fetchProductId = () => {
//   const query = new Query("product", true)
//     .addArgument("id", "String!", "apple-imac-2021")
//     .addField("prices")
//     .addField(new Field("amount"));
//   return client.post(query);
// };

export const fetchCategoryName = () => {
  const query = new Query("categories", true).addField("name");
  return client.post(query);
};

export const fetchCurrencies = () => {
  const query = new Query("currencies", true).addFieldList(currencyList);
  return client.post(query);
};
