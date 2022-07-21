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

const attrList = ["id", "name"];

const attrItemsList = ["displayValue", "value"];

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

export const fetchCategoryName = () => {
  const query = new Query("categories", true).addField("name");
  return client.post(query);
};

export const fetchCurrencies = () => {
  const query = new Query("currencies", true).addFieldList(currencyList);
  return client.post(query);
};

export const fetchProductById = (id) => {
  const query = new Query("product", true)
    .addArgument("id", "String!", id)
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
    );
  return client.post(query);
};
