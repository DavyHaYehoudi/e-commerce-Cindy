import React from "react";
import { formatPrice } from "../../helpers/utils/prices";
import useCartOffcanvas from "../../pages/MasterProduct/hooks/useCartOffcanvas";
import CartItem from "../../shared/CartItem";

const ShoppingCartContent = () => {
  const {
    cartStore,
    cartTotalAmount,
    handleClearCart,
  } = useCartOffcanvas();

  return (
    <div className="shoppingCart-content" data-testid="shoppingCart-content">
      {cartStore && cartStore.length > 0 ? (
        cartStore.map((product, i) => (
          <CartItem product={product} key={product?.productsId + i} />
        ))
      ) : (
        <p className="empty-cart-message">Le panier est vide</p>
      )}
      <div className="shoppingCart-total">
        TOTAL DES ARTICLES : <b>{formatPrice(cartTotalAmount)}</b>
      </div>
    </div>
  );
};

export default ShoppingCartContent;
