import React from 'react';
import { screen } from '@testing-library/react';
import Cart from './Cart';
import { render } from '../../../../test/utils';
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { materials } from '../../../../constants/materials';
import { formatPrice } from '../../../../helpers/utils/prices';

const mockStore = configureStore([]);

describe('Cart Component', () => {
    const initialState = {
        product: {
          data: [
            {
              id: 1,
              reference: "QER2345OIJD",
              name: "Boucles d'oreilles",
              pricing: {
                currentPrice: 50,
              },
              image: "product-image.jpg",
            },
          ],
        },
      };
    
      const store = mockStore(initialState);
 
  it('should render cart item with correct information', () => {
    const productId = 1;
    const productCart = {
      material: 1,
    };

    render(
        <Cart productId={productId} productCart={productCart} />,{store}
    );

    // Assert that cart item is rendered with correct information
    expect(screen.getByTestId(`cart-item-${productId}`)).toBeInTheDocument();
    expect(screen.getByText(`Référence : ${initialState.product.data[0].reference}`)).toBeInTheDocument();
    expect(screen.getByText(`Nom : ${initialState.product.data[0].name}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Matériau : ${materials[1]}`))).toBeInTheDocument();
    expect(screen.getByText(`Prix : ${formatPrice(initialState.product.data[0].pricing.currentPrice)}`)).toBeInTheDocument();
  });
});
