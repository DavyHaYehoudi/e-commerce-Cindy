
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
      productsId: "1mongoDb",
      material: 2,
    },
    {
      productsId: "5mongoDb",
      material: 0,
    },
  ],
  cart: [
    {
      productsId: "2mongoDb",
      material: 1,
      quantity: 2,
    },
    {
      productsId: "8mongoDb",
      material: 3,
      quantity: 1,
    },
  ],
  orders: [
    {
      id: "1mongoDb",
      date: "2023-03-10 10:20",
      step: 2,
      inTotalAmount: 150,
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      orderProducts: [
        {
          productsId: "4mongoDb",
          quantity: 2,
          material: 1,
          orderProductsActions: {
            exchange: null,
            refund: 2,
            credit: {
              amount: 20,
              code: "456JHUIRJNBdfdf",
              dateExpire: "2023-04-05 09:55",
            },
          },
        },
      ],
    },
    {
      id: "2mongoDb",
      date: "2023-03-07 11:40",
      step: 1,
      inTotalAmount: 250,
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      orderProducts: [
        {
          productsId: "14mongoDb",
          quantity: 1,
          material: 0,
          orderProductsActions: {
            exchange: 1,
            refund: null,
            credit: {
              amount: 10,
              code: "456JHUIRJNBdfdf",
              dateExpire: "2023-04-05 09:55",
            },
          },
        },
      ],
    },
    {
      id: "3mongoDb",
      date: "2023-03-10 22:20",
      step: 0,
      inTotalAmount: 150,
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      orderProducts: [
        {
          productsId: "16mongoDb",
          quantity: 1,
          material: 3,
          orderProductsActions: {
            exchange: null,
            refund: 1,
            credit: {
              amount: 20,
              code: "456JHUIRJNBdfdf",
              dateExpire: "2023-04-05 09:55",
            },
          },
        },
        {
          productsId: "9mongoDb",
          quantity: 1,
          material: 2,
          orderProductsActions: {
            exchange: null,
            refund: null,
            credit: {
              amount: 25,
              code: "456JHUIRJNBdfdf",
              dateExpire: "2024-08-10 09:55",
            },
          },
        },
      ],
    },
  ],
};
