import { materials } from "../constants/materials";
import { orderStep } from "../constants/orderStep";

export const userMock = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "07 22 90 87 44",
  address: "12 rue Charles De Gaulle, 27 000 Lyon",
  notesClient: null,
  wishlist: [
    {
      productId: 1,
      material: materials[2].name,
    },
    {
      productId: 5,
      material: materials[0].name,
    },
  ],
  cart: [
    {
      productId: 2,
      material: materials[1].name,
      quantity: 2,
    },
    {
      productId: 8,
      material: materials[3].name,
      quantity: 1,
    },
  ],
  orders: [
    {
      id: 1,
      date: "2023-03-10 10:20",
      step: orderStep[2].name,
      totalAmount: "€150",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 4,
          quantity: 2,
          material: materials[1].name,
          productActions: {
            exchange: false,
            refund: true,
            credit: "Avoir N 45698TUIRUG79847",
          },
        },
      ],
    },
    {
      id: 2,
      date: "2023-03-07 11:40",
      step: orderStep[1].name,
      totalAmount: "€250",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 14,
          quantity: 1,
          material: materials[0].name,
          productActions: {
            exchange: false,
            refund: true,
            credit: "Avoir N 45698TUIRUG79847",
          },
        },
      ],
    },
    {
      id: 3,
      date: "2023-03-10 22:20",
      step: orderStep[0].name,
      totalAmount: "€150",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 16,
          quantity: 1,
          material: materials[3].name,
          productActions: {
            exchange: false,
            refund: true,
            credit: "Avoir N 45698TUIRUG79847",
          },
        },
        {
          productId: 9,
          quantity: 1,
          material: materials[2].name,
          productActions: {
            exchange: false,
            refund: true,
            credit: "Avoir N 45698TUIRUG79847",
          },
        },
      ],
    },
  ],
};
