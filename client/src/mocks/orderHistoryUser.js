import { materials } from "./materials";

export const orderHistoryUser = [
    {
        id: 1,
        date: "2023-01-15 08:30",
        status: "En attente",
        productId: 100,
        totalAmount: "€125",
        shippingAddress: "12 Rue de la République, 75001 Paris",
        items: [
          {
            name: "Product 1",
            material: materials[0].name,
            quantity: 2,
            price: "€50",
          },
          {
            name: "Product 2",
            material: materials[1].name,
            quantity: 1,
            price: "€25",
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
        items: [
          {
            name: "Product 3",
            material: materials[2].name,
            quantity: 3,
            price: "€30",
          },
          {
            name: "Product 4",
            material: materials[3].name,
            quantity: 1,
            price: "€70",
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
        items: [
          {
            name: "Product 5",
            material: materials[0].name,
            quantity: 2,
            price: "€45",
          },
          {
            name: "Product 6",
            material: materials[1].name,
            quantity: 1,
            price: "€75",
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
        items: [
          {
            name: "Product 7",
            material: materials[2].name,
            quantity: 1,
            price: "€40",
          },
          {
            name: "Product 8",
            material: materials[3].name,
            quantity: 2,
            price: "€40",
          },
        ],
      },
];
