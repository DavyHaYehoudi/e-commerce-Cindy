import React from "react";

const Groups = ({
  fields,
  handleChangeFields,
  handleAddTag,
  tags,
  collectionsStore,
  categoriesStore,
  tagsStore,
}) => {
  return (
    <div className="groups-section">
      <div className="group-field">
        <label htmlFor="collection">
          Collection<span className="asterix">*</span> :{" "}
        </label>
        <select
          id="collection"
          className="account-input"
          value={fields?.collection}
          onChange={(e) => handleChangeFields(e, "collection")}
        >
          <option value="">Choisir une collection</option>
          {collectionsStore &&
            collectionsStore.filter(collection=>!collection?.isArchived).map((collection) => (
              <option key={collection?._id} value={collection?._id}>
                {collection?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="group-field">
        <label htmlFor="category">
          Categorie<span className="asterix">*</span> :{" "}
        </label>
        <select
          id="category"
          className="account-input"
          value={fields?.category}
          onChange={(e) => handleChangeFields(e, "category")}
        >
          <option value="">Choisir une catégorie</option>
          {categoriesStore &&
            categoriesStore.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="group-field">
        <label htmlFor="tags">Tags : </label>
        <select
          id="tags"
          className="account-input"
          onChange={(e) =>
            handleAddTag(e, {
              _id: e.target.value,
              name: e.target.options[e.target.selectedIndex].text,
            })
          }
        >
          <option value="">Ajouter un tag</option>
          {tagsStore &&
            tagsStore
              .filter((tag) => !tags?.some((t) => t?._id === tag?._id))
              .map((tag) => (
                <option key={tag?._id} value={tag?._id}>
                  {tag?.name}
                </option>
              ))}
        </select>
      </div>
      <div className="group-field">
        <label htmlFor="type">
          Type<span className="asterix">*</span> :{" "}
        </label>
        <select
          id="type"
          className="account-input"
          value={fields?.type}
          onChange={(e) => handleChangeFields(e, "type")}
        >
          <option value="product">Produit</option>
          <option value="giftcard">Carte cadeau</option>
          <option value="service">Service</option>

        </select>
      </div>
    </div>
  );
};

export default Groups;
