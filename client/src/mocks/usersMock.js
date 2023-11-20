import { materials } from "../constants/materials";
import { orderStep } from "../constants/orderStep";

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
    notesAdmin: ["des notes pour le client", "Encore des notes pour ce client"],
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
    // wishlist:null,
    cart: [
      {
        productId: 2,
        material: materials[1].name,
        quantity: 2,
      },
      {
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 1,
            quantity: 2,
            material: materials[0].name,
            productActions: {
              exchange: "1",
              refund: null,
              credit: null,
              note: "",
            },
          },
          {
            productId: 2,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "456JHUIRJNBdfdf",
              note: null,
            },
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
        trackingNumberClient: null,
        isReturnending: false,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 3,
            quantity: 1,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 4,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: null,
              note: null,
            },
          },
        ],
      },
    ],
    // orders:null,
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: "ABCDEF8768Y",
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 5,
            quantity: 2,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: null,
              note: null,
            },
          },
          {
            productId: 6,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: false,
        lastSentDateToClient: null,
        products: [
          {
            productId: 7,
            quantity: 3,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note: null,
            },
          },
          {
            productId: 8,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 9,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 10,
            quantity: 4,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 11,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 12,
            quantity: 1,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 13,
            quantity: 3,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 14,
            quantity: 2,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: "ABCDEF8768Y",
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 15,
            quantity: 1,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 16,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 17,
            quantity: 3,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 18,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 19,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 20,
            quantity: 4,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 1,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 2,
            quantity: 1,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 3,
            quantity: 3,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 4,
            quantity: 2,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 5,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 6,
            quantity: 3,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 7,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 8,
            quantity: 2,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 9,
            quantity: 4,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 10,
            quantity: 2,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 11,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 12,
            quantity: 3,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 13,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 14,
            quantity: 1,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 15,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 16,
            quantity: 3,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 17,
            quantity: 1,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 18,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
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
        productId: 18,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 19,
            quantity: 3,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 20,
            quantity: 3,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
    wishlist: [
      {
        productId: 16,
        material: materials[1].name,
      },
      {
        productId: 10,
        material: materials[3].name,
      },
    ],
    cart: [
      {
        productId: 7,
        material: materials[2].name,
        quantity: 3,
      },
      {
        productId: 12,
        material: materials[0].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 20,
            quantity: 3,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 1,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 2,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
    wishlist: [
      {
        productId: 14,
        material: materials[0].name,
      },
      {
        productId: 18,
        material: materials[2].name,
      },
    ],
    cart: [
      {
        productId: 15,
        material: materials[3].name,
        quantity: 1,
      },
      {
        productId: 20,
        material: materials[1].name,
        quantity: 3,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 3,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 4,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
    wishlist: [
      {
        productId: 12,
        material: materials[1].name,
      },
      {
        productId: 15,
        material: materials[3].name,
      },
    ],
    cart: [
      {
        productId: 14,
        material: materials[0].name,
        quantity: 1,
      },
      {
        productId: 18,
        material: materials[2].name,
        quantity: 2,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 5,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 6,
            quantity: 2,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 7,
            quantity: 2,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
    wishlist: [
      {
        productId: 15,
        material: materials[2].name,
      },
      {
        productId: 19,
        material: materials[0].name,
      },
    ],
    cart: [
      {
        productId: 12,
        material: materials[1].name,
        quantity: 2,
      },
      {
        productId: 6,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 8,
            quantity: 1,
            material: materials[3].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 9,
            quantity: 3,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
    notesAdmin: null,
    wishlist: [
      {
        productId: 12,
        material: materials[1].name,
      },
      {
        productId: 16,
        material: materials[2].name,
      },
    ],
    cart: [
      {
        productId: 7,
        material: materials[0].name,
        quantity: 2,
      },
      {
        productId: 4,
        material: materials[3].name,
        quantity: 1,
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 10,
            quantity: 1,
            material: materials[0].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
          {
            productId: 11,
            quantity: 1,
            material: materials[1].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
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
        trackingNumberClient: null,
        isClientNotified: true,
        lastSentDateToClient: null,
        products: [
          {
            productId: 12,
            quantity: 2,
            material: materials[2].name,
            productActions: {
              exchange: false,
              refund: null,
              credit: "AVOIR N 45698TUIRUG79847",
              note:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis provident animi odio, cumque quae explicabo eius unde blanditiis repellendus ullam alias culpa! ",
            },
          },
        ],
      },
    ],
  },
];
