import { materials } from "./materials";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";

export const orderHistoryUser = [
  {
    id: 1,
    date: "2023-01-15 08:30",
    status: "En attente",
    productId: 100,
    totalAmount: "€125",
    shippingAddress: "12 Rue de la République, 75001 Paris",
    nonTraitee: false,
    trackingNumber: null,
    products: [
      {
        productId: 104,
        name: "Product 1",
        material: materials[0].name,
        quantity: 2,
        price: "€50",
        image: bo,
      },
      {
        productId: 105,
        name: "Product 2",
        material: materials[1].name,
        quantity: 1,
        price: "€25",
        image: bar,
      },
    ],
  },
  {
    id: 2,
    date: "2023-02-02 14:45",
    status: "En cours de préparation",
    productId: 101,
    totalAmount: "€160",
    shippingAddress: "24 Avenue des Gobelins, 75013 Paris",
    nonTraitee: true,
    trackingNumber: "XYZ123456",
    products: [
      {
        productId: 201,
        name: "Product 3",
        material: materials[2].name,
        quantity: 3,
        price: "€30",
        image: bra,
      },
      {
        productId: 204,
        name: "Product 4",
        material: materials[3].name,
        quantity: 1,
        price: "€70",
        image: col,
      },
    ],
  },
  {
    id: 3,
    date: "2023-03-10 10:20",
    status: "Expédiée",
    productId: 102,
    totalAmount: "€120",
    shippingAddress: "8 Rue du Faubourg Saint-Honoré, 75008 Paris",
    nonTraitee: false,
    trackingNumber: null,
    products: [
      {
        productId: 785,
        name: "Product 5",
        material: materials[0].name,
        quantity: 2,
        price: "€45",
        image: bo,
      },
      {
        productId: 980,
        name: "Product 6",
        material: materials[1].name,
        quantity: 1,
        price: "€75",
        image: bra,
      },
    ],
  },
  {
    id: 4,
    date: "2023-04-05 09:55",
    status: "Annulée",
    productId: 103,
    totalAmount: "€120",
    shippingAddress: "32 Quai de la Tournelle, 75005 Paris",
    nonTraitee: true,
    trackingNumber: "XYZ123456",
    products: [
      {
        productId: 77,
        name: "Product 7",
        material: materials[2].name,
        quantity: 1,
        price: "€40",
        image: bar,
      },
      {
        productId: 98,
        name: "Product 8",
        material: materials[3].name,
        quantity: 2,
        price: "€40",
        image: col,
      },
    ],
  },
];
