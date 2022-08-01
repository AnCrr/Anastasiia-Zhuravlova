export const showAttributes = (attributes, attrs) => {
  attributes.map((attribute, index) => {
    const current = attrs.find((attr) => attr.id === attribute.id);
    // console.log(current);
    console.log(attribute);
    const items = attribute.values?.map((value, index) => {
      if (attribute.name === "Color") {
        return (
          <div
            key={index}
            className={`attributes__color-wrapper ${
              value === current.value ? "active" : ""
            }`}
          >
            <div
              style={{
                backgroundColor: value,
              }}
              className="attributes__color-item"
            ></div>
          </div>
        );
      }
      return (
        <div key={index}>
          <div
            className={`attributes__item ${
              value === current.value ? "active" : ""
            }`}
          >
            {value}
          </div>
        </div>
      );
    });

    return (
      <div key={index}>
        <div className="attributes--name">{attribute.name}</div>
        <div className="attributes__items">{items}</div>
      </div>
    );
  });
};
