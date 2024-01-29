import React from 'react';
import { screen } from '@testing-library/react';
import Wishlist from './Wishlist';
import { render } from '../../../../test/utils';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { materials } from '../../../../constants/materials';
import { formatPrice } from '../../../../helpers/utils/prices';

const mockStore = configureStore([]);

describe('Wishlist Component', () => {
  const initialState = {
    product: {
      data: [
        {
          _id: 1,
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

  it('should render wishlist item with correct information', () => {
    const productId = 1;
    const productCart = {
      material: 1,
      addDate:"2024-04-11 12:15"

    };

    render(
      <Wishlist productId={productId} productCart={productCart} />,
      { store }
    );

    // Assert that wishlist item is rendered with correct information
    expect(
      screen.getByTestId(`wishlist-item-${productId}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`: ${initialState.product.data[0].reference}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`: ${initialState.product.data[0].name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`: ${materials[1]}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `: ${formatPrice(
          initialState.product.data[0].pricing.currentPrice
        )}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(": 11/04/2024 12:15")).toBeInTheDocument()
  });
});
