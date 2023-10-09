import { materials } from "./materials";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";
import { orderStatus } from "./orderStatus";

export const orderHistoryUser = [
  {
    id: 1,
    date: "2023-01-15 08:30",
    status: orderStatus[0].name,
    totalAmount: "€125",
    shippingAddress: "12 Rue de la République, 75001 Paris",
    nonTraitee: false,
    trackingNumber: null,
    products: [
      {
        productId: 104,
        name: "Product 1",
        price: "€50",
        quantity: 2,
        material: materials[0].name,
        image: bo,
      },
      {
        productId: 105,
        name: "Product 2",
        price: "€25",
        quantity: 1,
        material: materials[1].name,
        image: bar,
      },
    ],
  },
  {
    id: 2,
    date: "2023-02-02 14:45",
    status: orderStatus[1].name,
    totalAmount: "€160",
    shippingAddress: "24 Avenue des Gobelins, 75013 Paris",
    nonTraitee: true,
    trackingNumber: "XYZ123456",
    products: [
      {
        productId: 201,
        name: "Product 3",
        price: "€30",
        quantity: 3,
        material: materials[2].name,
        image: bra,
      },
      {
        productId: 204,
        name: "Product 4",
        price: "€70",
        quantity: 1,
        material: materials[3].name,
        image: col,
      },
    ],
  },
  {
    id: 3,
    date: "2023-03-10 10:20",
    status: orderStatus[2].name,
    totalAmount: "€120",
    shippingAddress: "8 Rue du Faubourg Saint-Honoré, 75008 Paris",
    nonTraitee: false,
    trackingNumber: null,
    products: [
      {
        productId: 785,
        name: "Product 5",
        price: "€45",
        quantity: 2,
        material: materials[0].name,
        image: bo,
      },
      {
        productId: 980,
        name: "Product 6",
        price: "€75",
        quantity: 1,
        material: materials[1].name,
        image: bra,
      },
    ],
  },
  {
    id: 4,
    date: "2023-04-05 09:55",
    status: orderStatus[3].name,
    totalAmount: "€120",
    shippingAddress: "32 Quai de la Tournelle, 75005 Paris",
    nonTraitee: true,
    trackingNumber: "XYZ123456",
    products: [
      {
        productId: 77,
        name: "Product 7",
        price: "€40",
        quantity: 1,
        material: materials[2].name,
        image: bar,
      },
      {
        productId: 98,
        name: "Product 8",
        price: "€40",
        quantity: 2,
        material: materials[3].name,
        image: col,
      },
    ],
  },
];
