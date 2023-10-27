import { materials } from "./materials";
import { orderStep } from "./orderStep";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";

export const orderMock= [
    {
      id: 1,
      date: "2023-03-10 10:20",
      Step: orderStep[2].name,
      totalAmount: "€150",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 104,
          name: "Product 4",
          price: "€75",
          quantity: 2,
          material: materials[1].name,
          image: bo,
        },
      ],
    },
    {
      id: 2,
      date: "2023-03-07 11:40",
      Step: orderStep[1].name,
      totalAmount: "€250",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 204,
          name: "Product 40",
          price: "€250",
          quantity: 1,
          material: materials[0].name,
          image: col,
        },
      ],
    },
    {
      id: 3,
      date: "2023-03-10 22:20",
      Step: orderStep[0].name,
      totalAmount: "€150",
      paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
      shippingAddress: "12 Rue de la République, 75001 Paris",
      products: [
        {
          productId: 14,
          name: "Product 19",
          price: "€75",
          quantity: 1,
          material: materials[3].name,
          image: bra,
        },
        {
          productId: 15,
          name: "Product 23",
          price: "€75",
          quantity: 1,
          material: materials[2].name,
          image: bar,
        },
      ],
    },
  ]