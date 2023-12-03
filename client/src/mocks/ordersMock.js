import { orderStep } from "../constants/orderStep";

export const ordersMock = [
  {
    id: 1,
    date: "2023-01-15 08:30",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 220,
    outTotalAmount: 10,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [
      {
        id: "ljhkjh534hvfd",
        isAdmin: true,
        value: "1234567POIUY",
        date: "2023-01-15 08:30",
        products: [
          { id: "nnnfjdksjh1234", productId: 1, articlesNumber: 2 },
          { id: "98798798ffd", productId: 2, articlesNumber: 1 },
        ],
      },
      {
        id: "hfaslkjh508dskjh4l3",
        isAdmin: true,
        value: "987654FVGBHNJ",
        date: "2023-01-15 08:30",
        products: [{ id: "hdghdfgh444hh", productId: 2, articlesNumber: 1 }],
      },
      {
        id: "nndkdh4444aksdjfls",
        isAdmin: true,
        value: "102938MAUCBQPD",
        date: "2023-01-15 08:30",
        products: [
          { id: "vzxcvzxczoio354", productId: 2, articlesNumber: 1 },
          { id: "vzxcvzxczoio355", productId: 1, articlesNumber: 2 },
        ],
      },
      {
        id: "fasjkj54lldjfakjd0",
        isAdmin: false,
        value: "JND&$HDYS#@FJKS",
        date: "2023-01-15 08:30",
        products: [],
      },
      {
        id: "fasjkj54sfdjfakjd0",
        isAdmin: false,
        value: "JND&$HDYS#@FJKS",
        date: "2023-01-15 08:30",
        products: [{ id: "23425325g", productId: 1, articlesNumber: 1 }],
      },
      {
        id: "qpanfheifb48fn40n40",
        isAdmin: false,
        value: "JNFDNDM987MND*",
        date: "2023-01-15 08:30",
        products: [{ id: "sdfg222uuuhreh", productId: 2, articlesNumber: 1 }],
      },
      {
        id: "lrjfsurpeoiwu08098",
        isAdmin: true,
        value: "102938MAUCBQPD",
        date: "2023-01-15 08:30",
        products: [
          { id: "1234123142312f", productId: 1, articlesNumber: 1 },
          { id: "345634563456h", productId: 2, articlesNumber: 1 },
        ],
      },
    ],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [1, 2],
    // products:null,
  },
  {
    id: 2,
    date: "2023-02-02 14:45",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 25,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [3],
  },
  {
    id: 3,
    date: "2023-03-10 10:20",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 80,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [4],
  },
  {
    id: 4,
    date: "2023-04-05 09:55",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 155,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    trackingNumberClient: "ABCDEF8768Y",
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [5, 6],
  },
  {
    id: 5,
    date: "2023-04-15 12:30",
    step: orderStep[1].name,
    isNextStepOrder: true,
    inTotalAmount: 230,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [
      {
        id: "ljhkj1qh534hvfd",
        isAdmin: true,
        value: "1234567POIUY",
        date: "2023-01-15 08:30",
        products: [
          { id: "nnnfjdksjh1734", productId: 7, articlesNumber: 2 },
          { id: "9879879d8ffd", productId: 8, articlesNumber: 1 },
          { id: "fsadfaettt", productId: 9, articlesNumber: 2 },
        ],
      },
      {
        id: "hfaslkjh50g8dskjh4l3",
        isAdmin: true,
        value: "987654FVGBHNJ",
        date: "2023-01-15 08:30",
        products: [{ id: "hdghdfgh444hwh", productId: 9, articlesNumber: 3 }],
      },
      {
        id: "nndkdh4444aks12djfls",
        isAdmin: true,
        value: "102938MAUCBQPD",
        date: "2023-01-15 08:30",
        products: [
          { id: "sssssmmsoif08909", productId: 8, articlesNumber: 1 },
          { id: "vzxcvzxczoio35c4", productId: 7, articlesNumber: 1 },
        ],
      },
      {
        id: "fasjj54sfdjfakjd0",
        isAdmin: false,
        value: "JND&$HDYS#@FJKS",
        date: "2023-01-15 08:30",
        products: [{ id: "2342532bg5g", productId: 8, articlesNumber: 1 }],
      },
      {
        id: "qpanfheifb448fn40n40",
        isAdmin: false,
        value: "JNFDNDM987MND*",
        date: "2023-01-15 08:30",
        products: [
          { id: "sggggggg6666l", productId: 7, articlesNumber: 2 },
          { id: "sdfg222uuuhrehv", productId: 9, articlesNumber: 1 },
          { id: "poipoipoipaa", productId: 8, articlesNumber: 3 },
        ],
      },
      {
        id: "lrjfsurpeoiwdu08098",
        isAdmin: true,
        value: "102938MAUCBQPD",
        date: "2023-01-15 08:30",
        products: [
          { id: "12341q23142312f", productId: 7, articlesNumber: 1 },
          { id: "345634s563456h", productId: 8, articlesNumber: 1 },
        ],
      },
    ],
    isClientNotified: false,
    lastSentDateToClient: null,
    products: [7, 8, 9],
  },
  {
    id: 6,
    date: "2023-05-01 18:45",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 112,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [10],
  },
  {
    id: 7,
    date: "2023-05-10 10:00",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 190,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [11, 12, 13, 14],
  },
  {
    id: 8,
    date: "2023-06-02 14:20",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 58,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    trackingNumberClient: "ABCDEF8768Y",
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [15, 16],
  },
  {
    id: 9,
    date: "2023-06-15 08:00",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 211,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [17, 18, 19],
  },
  {
    id: 10,
    date: "2023-07-05 11:30",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 128,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [20],
  },
  {
    id: 11,
    date: "2023-07-15 15:45",
    step: orderStep[2].name,
    isNextStepOrder: true,
    inTotalAmount: 375,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [21, 22, 23, 24],
  },
  {
    id: 12,
    date: "2023-08-02 09:20",
    step: orderStep[3].name,
    isNextStepOrder: true,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [25],
  },
  {
    id: 13,
    date: "2023-08-10 14:30",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 105,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [26],
  },
  {
    id: 14,
    date: "2023-09-01 18:45",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [27],
  },
  {
    id: 15,
    date: "2023-09-10 10:00",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 150,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [28],
  },
  {
    id: 16,
    date: "2023-09-20 12:00",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 200,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [29],
  },
  {
    id: 17,
    date: "2023-09-25 09:30",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [30, 31],
  },
  {
    id: 18,
    date: "2023-10-05 15:15",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 80,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [32],
  },
  {
    id: 19,
    date: "2023-10-15 08:45",
    step: orderStep[3].name,
    isNextStepOrder: false,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [33],
  },
  {
    id: 20,
    date: "2023-11-01 11:30",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [34, 35],
  },
  {
    id: 21,
    date: "2023-11-10 15:45",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 80,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [36],
  },
  {
    id: 22,
    date: "2023-11-20 09:20",
    step: orderStep[3].name,
    isNextStepOrder: true,
    inTotalAmount: 70,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [37, 38],
  },
  {
    id: 23,
    date: "2023-12-05 14:30",
    step: orderStep[3].name,
    isNextStepOrder: true,
    inTotalAmount: 80,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [39],
  },
  {
    id: 24,
    date: "2023-12-15 08:45",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 100,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [40, 41],
  },
  {
    id: 25,
    date: "2023-05-20 12:15",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 200,
    outTotalAmount: null,
    paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [42],
  },
  {
    id: 26,
    date: "2023-06-10 09:30",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 150,
    outTotalAmount: null,
    paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [43, 44],
  },
  {
    id: 27,
    date: "2023-08-05 15:45",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 120,
    outTotalAmount: null,
    paymentMethod: { cardType: "Amex", last4Digits: "**** 7890" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [45, 46],
  },
  {
    id: 28,
    date: "2023-11-20 11:15",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 180,
    outTotalAmount: null,
    paymentMethod: { cardType: "Mastercard", last4Digits: "**** 5678" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [47],
  },
  {
    id: 29,
    date: "2023-12-05 09:30",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 120,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 2345" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [48],
  },
  {
    id: 30,
    date: "2023-05-15 15:45",
    step: orderStep[1].name,
    isNextStepOrder: false,
    inTotalAmount: 210,
    outTotalAmount: null,
    paymentMethod: { cardType: "Amex", last4Digits: "**** 7890" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [49],
  },
  {
    id: 31,
    date: "2023-06-02 08:00",
    step: orderStep[2].name,
    isNextStepOrder: false,
    inTotalAmount: 240,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 3456" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [50, 51],
  },
  {
    id: 32,
    date: "2023-08-10 12:30",
    step: orderStep[0].name,
    isNextStepOrder: false,
    inTotalAmount: 300,
    outTotalAmount: null,
    paymentMethod: { cardType: "MasterCard", last4Digits: "**** 5678" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [52],
  },
  {
    id: 33,
    date: "2023-09-05 16:15",
    step: orderStep[1].name,
    isNextStepOrder: true,
    inTotalAmount: 180,
    outTotalAmount: null,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 2345" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    products: [53],
  },
];