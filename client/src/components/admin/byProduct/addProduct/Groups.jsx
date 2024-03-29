import React from "react";

const Groups = ({
  fields,
  handleChangeFields,
  collectionsStore,
  categoriesStore,
  tagsStore,
}) => {
  return (
    <div className="groups-section">
      <div className="group-field">
        <label htmlFor="collection">Collection : </label>
        <select
          id="collection"
          className="account-input"
          value={fields?.collection}
          onChange={(e) => handleChangeFields(e, "collection")}
        >
          <option value="">Choisir une collection</option>
          {collectionsStore &&
            collectionsStore.map((collection) => (
              <option key={collection?._id} value={collection?._id}>
                {collection?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="group-field">
        <label htmlFor="category">Categorie : </label>
        <select
          id="category"
          className="account-input"
          value={fields?.category}
          onChange={(e) => handleChangeFields(e, "category")}
        >
          <option value="">Choisir une catégorie</option>
          {categoriesStore &&
            categoriesStore.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="group-field">
        <label htmlFor="tags">Tags : </label>
        <select
          id="tags"
          className="account-input"
          value={fields?.tags}
          onChange={(e) => handleChangeFields(e, "tags")}
        >
          <option value="">Choisir un ou plusieurs tags</option>
          {tagsStore &&
            tagsStore.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Groups;
