import { materials } from "./materials";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";
import { orderStatus } from "./orderStatus";

export const userInfo = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "07 22 90 87 44",
  address: "12 rue Charles De Gaulle, 27 000 Lyon",
  wishlist: [
    {
      productId: 101,
      name: "Product 1",
      material: materials[2].name,
      price: "€50",
      image: bo,
    },
    {
      productId: 105,
      name: "Product 105",
      material: materials[0].name,
      price: "€30",
      image: col,
    },
  ],
  cart: [
    {
      productId: 102,
      name: "Product 2",
      material: materials[1].name,
      price: "€25",
      quantity: 2,
      image: bar,
    },
    {
      productId: 108,
      name: "Product 108",
      material: materials[3].name,
      price: "€35",
      quantity: 1,
      image: bra,
    },
  ],
  orders: [
    {
      id: 1,
      date: "2023-03-10 10:20",
      status: orderStatus[2].name,
      totalAmount: "€150",
      shippingAddress: "12 Rue de la République, 75001 Paris",
      nonTraitee: false,
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
      status: orderStatus[1].name,
      totalAmount: "€250",
      shippingAddress: "12 Rue de la République, 75001 Paris",
      nonTraitee: true,
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
      status: orderStatus[0].name,
      totalAmount: "€150",
      shippingAddress: "12 Rue de la République, 75001 Paris",
      nonTraitee: false,
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
  ],
};
