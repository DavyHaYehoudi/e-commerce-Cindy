import { materials } from "./materials";
import { orderStep } from "./orderStep";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";

export const usersMock = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "06 90 12 34 56",
    shippingAddress: "12 Rue de la République, 75001 Paris",
    totalOrders: 3,
    totalOrderValue: "€500",
    notesAdmin:null,
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
        date: "2023-01-15 08:30",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€150",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 101,
            name: "Product 1",
            price: "€50",
            quantity: 2,
            material: materials[0].name,
            image: bo,
          },
          {
            productId: 102,
            name: "Product 2",
            price: "€25",
            quantity: 1,
            material: materials[3].name,
            image: bar,
          },
        ],
      },
      {
        id: 2,
        date: "2023-02-02 14:45",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€200",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isReturnending:false,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 103,
            name: "Product 3",
            price: "€100",
            quantity: 1,
            material: materials[2].name,
            image: bra,
          },
        ],
      },
      {
        id: 3,
        date: "2023-03-10 10:20",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€150",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 104,
            name: "Product 4",
            price: "€75",
            quantity: 2,
            material: materials[1].name,
            image: col,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phone: "07 89 01 23 45",
    shippingAddress: "45 Avenue des Champs-Élysées, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: "€300",
    notesAdmin:null,
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
        id: 4,
        date: "2023-04-05 09:55",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€120",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:"ABCDEF8768Y",
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 105,
            name: "Product 105",
            price: "€30",
            quantity: 2,
            material: materials[0].name,
            image: bo,
          },
          {
            productId: 106,
            name: "Product 106",
            price: "€45",
            quantity: 1,
            material: materials[3].name,
            image: bar,
          },
        ],
      },
      {
        id: 5,
        date: "2023-04-15 12:30",
        step: orderStep[1].name,
        isNextStepOrder: true,
        totalAmount: "€180",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: false,
        lastSentDateToClient:null,
        products: [
          {
            productId: 107,
            name: "Product 107",
            price: "€20",
            quantity: 3,
            material: materials[2].name,
            image: bra,
          },
          {
            productId: 108,
            name: "Product 108",
            price: "€35",
            quantity: 2,
            material: materials[1].name,
            image: col,
          },
          {
            productId: 109,
            name: "Product 109",
            price: "€50",
            quantity: 1,
            material: materials[0].name,
            image: bo,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phone: "06 78 90 12 34",
    shippingAddress: "8 Rue du Faubourg Saint-Honoré, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: "€250",
    notesAdmin:null,
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
        id: 6,
        date: "2023-05-01 18:45",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€150",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 110,
            name: "Product 110",
            price: "€25",
            quantity: 4,
            material: materials[0].name,
            image: bar,
          },
        ],
      },
      {
        id: 7,
        date: "2023-05-10 10:00",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 111,
            name: "Product 111",
            price: "€30",
            quantity: 2,
            material: materials[2].name,
            image: bra,
          },
          {
            productId: 112,
            name: "Product 112",
            price: "€15",
            quantity: 1,
            material: materials[1].name,
            image: col,
          },
          {
            productId: 113,
            name: "Product 113",
            price: "€40",
            quantity: 3,
            material: materials[0].name,
            image: bo,
          },
          {
            productId: 114,
            name: "Product 114",
            price: "€20",
            quantity: 2,
            material: materials[0].name,
            image: bar,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    firstName: "Eva",
    lastName: "Williams",
    email: "eva@example.com",
    phone: "07 67 89 01 23",
    shippingAddress: "22 Rue de la Pompe, 75116 Paris",
    totalOrders: 2,
    totalOrderValue: "€200",
    notesAdmin:null,
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
        id: 8,
        date: "2023-06-02 14:20",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€120",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:"ABCDEF8768Y",
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 115,
            name: "Product 115",
            price: "€25",
            quantity: 1,
            material: materials[2].name,
            image: bra,
          },
          {
            productId: 116,
            name: "Product 116",
            price: "€40",
            quantity: 2,
            material: materials[2].name,
            image: col,
          },
        ],
      },
      {
        id: 9,
        date: "2023-06-15 08:00",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€80",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 117,
            name: "Product 117",
            price: "€30",
            quantity: 3,
            material: materials[1].name,
            image: bo,
          },
          {
            productId: 118,
            name: "Product 118",
            price: "€15",
            quantity: 1,
            material: materials[0].name,
            image: bar,
          },
          {
            productId: 119,
            name: "Product 119",
            price: "€50",
            quantity: 2,
            material: materials[1].name,
            image: bra,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    firstName: "Sophie",
    lastName: "Miller",
    email: "sophie@example.com",
    phone: "06 56 78 90 12",
    shippingAddress: "5 Quai de la Tournelle, 75005 Paris",
    totalOrders: 3,
    totalOrderValue: "€320",
    notesAdmin:null,
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
        id: 10,
        date: "2023-07-05 11:30",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 120,
            name: "Product 120",
            price: "€35",
            quantity: 4,
            material: materials[3].name,
            image: col,
          },
        ],
      },
      {
        id: 11,
        date: "2023-07-15 15:45",
        step: orderStep[2].name,
        isNextStepOrder: true,
        totalAmount: "€120",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 121,
            name: "Product 121",
            price: "€20",
            quantity: 2,
            material: materials[1].name,
            image: bo,
          },
          {
            productId: 122,
            name: "Product 122",
            price: "€25",
            quantity: 1,
            material: materials[2].name,
            image: bar,
          },
          {
            productId: 123,
            name: "Product 123",
            price: "€45",
            quantity: 3,
            material: materials[3].name,
            image: bra,
          },
          {
            productId: 124,
            name: "Product 124",
            price: "€30",
            quantity: 2,
            material: materials[3].name,
            image: col,
          },
        ],
      },
      {
        id: 12,
        date: "2023-08-02 09:20",
        step: orderStep[3].name,
        isNextStepOrder: true,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 125,
            name: "Product 125",
            price: "€40",
            quantity: 1,
            material: materials[3].name,
            image: bo,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel@example.com",
    phone: "07 45 67 89 01",
    shippingAddress: "18 Avenue Montaigne, 75008 Paris",
    totalOrders: 1,
    totalOrderValue: "€80",
    notesAdmin:null,
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
        id: 13,
        date: "2023-08-10 14:30",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€80",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 126,
            name: "Product 126",
            price: "€35",
            quantity: 3,
            material: materials[0].name,
            image: bar,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    firstName: "Emma",
    lastName: "Davis",
    email: "emma@example.com",
    phone: "06 90 12 34 56",
    shippingAddress: "30 Rue du Bac, 75007 Paris",
    totalOrders: 4,
    totalOrderValue: "€450",
    notesAdmin:null,
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
        id: 14,
        date: "2023-09-01 18:45",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 127,
            name: "Product 127",
            price: "€15",
            quantity: 1,
            material: materials[0].name,
            image: bra,
          },
        ],
      },
      {
        id: 15,
        date: "2023-09-10 10:00",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€150",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 128,
            name: "Product 128",
            price: "€50",
            quantity: 2,
            material: materials[0].name,
            image: col,
          },
        ],
      },
      {
        id: 16,
        date: "2023-09-20 12:00",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€200",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 129,
            name: "Product 129",
            price: "€25",
            quantity: 4,
            material: materials[2].name,
            image: bo,
          },
        ],
      },
      {
        id: 17,
        date: "2023-09-25 09:30",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 130,
            name: "Product 130",
            price: "€30",
            quantity: 2,
            material: materials[0].name,
            image: bar,
          },
          {
            productId: 131,
            name: "Product 131",
            price: "€20",
            quantity: 1,
            material: materials[0].name,
            image: bra,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    firstName: "David",
    lastName: "White",
    email: "david@example.com",
    phone: "06 34 56 78 90",
    shippingAddress: "10 Avenue Foch, 75116 Paris",
    totalOrders: 2,
    totalOrderValue: "€180",
    notesAdmin:null,
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
        id: 18,
        date: "2023-10-05 15:15",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€80",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 132,
            name: "Product 132",
            price: "€45",
            quantity: 3,
            material: materials[2].name,
            image: col,
          },
        ],
      },
      {
        id: 19,
        date: "2023-10-15 08:45",
        step: orderStep[3].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 133,
            name: "Product 133",
            price: "€25",
            quantity: 2,
            material: materials[2].name,
            image: bo,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    firstName: "Olivia",
    lastName: "Johnson",
    email: "olivia@example.com",
    phone: "07 23 45 67 89",
    shippingAddress: "14 Rue de Rivoli, 75001 Paris",
    totalOrders: 3,
    totalOrderValue: "€250",
    notesAdmin:null,
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
        id: 20,
        date: "2023-11-01 11:30",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 134,
            name: "Product 134",
            price: "€30",
            quantity: 1,
            material: materials[2].name,
            image: bar,
          },
          {
            productId: 135,
            name: "Product 135",
            price: "€40",
            quantity: 2,
            material: materials[2].name,
            image: bra,
          },
        ],
      },
      {
        id: 21,
        date: "2023-11-10 15:45",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€80",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 136,
            name: "Product 136",
            price: "€25",
            quantity: 3,
            material: materials[2].name,
            image: col,
          },
        ],
      },
      {
        id: 22,
        date: "2023-11-20 09:20",
        step: orderStep[3].name,
        isNextStepOrder: true,
        totalAmount: "€70",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 137,
            name: "Product 137",
            price: "€15",
            quantity: 1,
            material: materials[1].name,
            image: bo,
          },
          {
            productId: 138,
            name: "Product 138",
            price: "€50",
            quantity: 2,
            material: materials[1].name,
            image: bar,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    firstName: "William",
    lastName: "Smith",
    email: "william@example.com",
    phone: "06 12 34 56 78",
    shippingAddress: "55 Rue du Faubourg Saint-Antoine, 75011 Paris",
    totalOrders: 2,
    totalOrderValue: "€180",
    notesAdmin:null,
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
        id: 23,
        date: "2023-12-05 14:30",
        step: orderStep[3].name,
        isNextStepOrder: true,
        totalAmount: "€80",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: "XYZ123456",
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 139,
            name: "Product 139",
            price: "€25",
            quantity: 3,
            material: materials[1].name,
            image: col,
          },
        ],
      },
      {
        id: 24,
        date: "2023-12-15 08:45",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€100",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 140,
            name: "Product 140",
            price: "€25",
            quantity: 3,
            material: materials[1].name,
            image: bra,
          },
        ],
      },
    ],
  },
  {
    id: 11,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "06 90 23 45 67",
    shippingAddress: "24 Rue de la Liberté, 75002 Paris",
    totalOrders: 5,
    totalOrderValue: "€700",
    notesAdmin:null,
    wishlist: [
      {
        productId: 106,
        name: "Product 6",
        material: materials[1].name,
        price: "€70",
        image: col,
      },
      {
        productId: 110,
        name: "Product 110",
        material: materials[3].name,
        price: "€40",
        image: bra,
      },
    ],
    cart: [
      {
        productId: 107,
        name: "Product 7",
        material: materials[2].name,
        price: "€35",
        quantity: 3,
        image: bo,
      },
      {
        productId: 112,
        name: "Product 112",
        material: materials[0].name,
        price: "€45",
        quantity: 1,
        image: bar,
      },
    ],
    orders: [
      {
        id: 4,
        date: "2023-05-20 12:15",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€200",
        paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 107,
            name: "Product 7",
            price: "€35",
            quantity: 3,
            material: materials[2].name,
            image: bo,
          },
          {
            productId: 108,
            name: "Product 8",
            price: "€20",
            quantity: 2,
            material: materials[1].name,
            image: col,
          },
        ],
      },
      {
        id: 5,
        date: "2023-06-10 09:30",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€150",
        paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 109,
            name: "Product 9",
            price: "€80",
            quantity: 1,
            material: materials[3].name,
            image: bra,
          },
        ],
      },
    ],
  },
  {
    id: 12,
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "06 90 34 56 78",
    shippingAddress: "36 Avenue des Champs-Élysées, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: "€300",
    notesAdmin:null,
    wishlist: [
      {
        productId: 114,
        name: "Product 14",
        material: materials[0].name,
        price: "€90",
        image: bar,
      },
      {
        productId: 118,
        name: "Product 118",
        material: materials[2].name,
        price: "€30",
        image: col,
      },
    ],
    cart: [
      {
        productId: 115,
        name: "Product 15",
        material: materials[3].name,
        price: "€50",
        quantity: 1,
        image: bra,
      },
      {
        productId: 120,
        name: "Product 120",
        material: materials[1].name,
        price: "€20",
        quantity: 3,
        image: bo,
      },
    ],
    orders: [
      {
        id: 6,
        date: "2023-08-05 15:45",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€120",
        paymentMethod: { cardType: "Amex", last4Digits: "**** 7890" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 115,
            name: "Product 15",
            price: "€50",
            quantity: 1,
            material: materials[3].name,
            image: bra,
          },
          {
            productId: 116,
            name: "Product 16",
            price: "€70",
            quantity: 2,
            material: materials[2].name,
            image: col,
          },
        ],
      },
    ],
  },
  {
    id: 13,
    firstName: "Emily",
    lastName: "Williams",
    email: "emily@example.com",
    phone: "06 90 78 90 12",
    shippingAddress: "24 Rue du Faubourg Saint-Honoré, 75008 Paris",
    totalOrders: 4,
    totalOrderValue: "€600",
    notesAdmin:null,
    wishlist: [
      {
        productId: 122,
        name: "Product 22",
        material: materials[1].name,
        price: "€120",
        image: col,
      },
      {
        productId: 125,
        name: "Product 125",
        material: materials[3].name,
        price: "€40",
        image: bar,
      },
    ],
    cart: [
      {
        productId: 124,
        name: "Product 24",
        material: materials[0].name,
        price: "€80",
        quantity: 1,
        image: bo,
      },
      {
        productId: 128,
        name: "Product 128",
        material: materials[2].name,
        price: "€40",
        quantity: 2,
        image: bra,
      },
    ],
    orders: [
      {
        id: 9,
        date: "2023-11-20 11:15",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€180",
        paymentMethod: { cardType: "Mastercard", last4Digits: "**** 5678" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 124,
            name: "Product 24",
            price: "€80",
            quantity: 1,
            material: materials[0].name,
            image: bo,
          },
          {
            productId: 125,
            name: "Product 125",
            price: "€40",
            quantity: 2,
            material: materials[3].name,
            image: bar,
          },
        ],
      },
      {
        id: 10,
        date: "2023-12-05 09:30",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€120",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 2345" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 126,
            name: "Product 26",
            price: "€60",
            quantity: 2,
            material: materials[1].name,
            image: col,
          },
        ],
      },
    ],
  },
  {
    id: 14,
    firstName: "Sophie",
    lastName: "Johnson",
    email: "sophie@example.com",
    phone: "06 90 45 67 89",
    shippingAddress: "18 Avenue des Champs-Élysées, 75002 Paris",
    totalOrders: 5,
    totalOrderValue: "€750",
    notesAdmin:null,
    wishlist: [
      {
        productId: 135,
        name: "Product 35",
        material: materials[2].name,
        price: "€150",
        image: col,
      },
      {
        productId: 139,
        name: "Product 139",
        material: materials[0].name,
        price: "€45",
        image: bra,
      },
    ],
    cart: [
      {
        productId: 132,
        name: "Product 32",
        material: materials[1].name,
        price: "€90",
        quantity: 2,
        image: bo,
      },
      {
        productId: 142,
        name: "Product 142",
        material: materials[3].name,
        price: "€60",
        quantity: 1,
        image: bar,
      },
    ],
    orders: [
      {
        id: 11,
        date: "2023-05-15 15:45",
        step: orderStep[1].name,
        isNextStepOrder: false,
        totalAmount: "€210",
        paymentMethod: { cardType: "Amex", last4Digits: "**** 7890" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 138,
            name: "Product 38",
            price: "€120",
            quantity: 1,
            material: materials[3].name,
            image: bar,
          },
        ],
      },
      {
        id: 12,
        date: "2023-06-02 08:00",
        step: orderStep[2].name,
        isNextStepOrder: false,
        totalAmount: "€240",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 3456" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 133,
            name: "Product 33",
            price: "€80",
            quantity: 3,
            material: materials[0].name,
            image: bra,
          },
        ],
      },
    ],
  },
  {
    id: 15,
    firstName: "Emma",
    lastName: "Smith",
    email: "emma@example.com",
    phone: "06 90 78 90 12",
    shippingAddress: "24 Rue de la Liberté, 75003 Paris",
    totalOrders: 7,
    totalOrderValue: "€900",
    notesAdmin:null,
    wishlist: [
      {
        productId: 152,
        name: "Product 52",
        material: materials[1].name,
        price: "€180",
        image: bar,
      },
      {
        productId: 156,
        name: "Product 156",
        material: materials[2].name,
        price: "€60",
        image: col,
      },
    ],
    cart: [
      {
        productId: 147,
        name: "Product 47",
        material: materials[0].name,
        price: "€120",
        quantity: 2,
        image: bo,
      },
      {
        productId: 162,
        name: "Product 162",
        material: materials[3].name,
        price: "€40",
        quantity: 1,
        image: bra,
      },
    ],
    orders: [
      {
        id: 21,
        date: "2023-08-10 12:30",
        step: orderStep[0].name,
        isNextStepOrder: false,
        totalAmount: "€300",
        paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 151,
            name: "Product 51",
            price: "€150",
            quantity: 1,
            material: materials[0].name,
            image: bo,
          },
          {
            productId: 152,
            name: "Product 52",
            price: "€150",
            quantity: 1,
            material: materials[1].name,
            image: bar,
          },
        ],
      },
      {
        id: 22,
        date: "2023-09-05 16:15",
        step: orderStep[1].name,
        isNextStepOrder: true,
        totalAmount: "€180",
        paymentMethod: { cardType: "Visa", last4Digits: "**** 2345" },
        trackingNumberAdmin: null,
        trackingNumberClient:null,
        isClientNotified: true,
        lastSentDateToClient:null,
        products: [
          {
            productId: 154,
            name: "Product 54",
            price: "€90",
            quantity: 2,
            material: materials[2].name,
            image: col,
          },
        ],
      },
    ],
  },
];
