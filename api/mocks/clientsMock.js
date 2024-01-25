
export const clientsMock = [
  {
    id: "1mongoDb",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "06 90 12 34 56",
    shippingAddress: "12 Rue de la République, 75001 Paris",
    totalOrders: 3,
    totalOrderValue: 325,
    notesAdmin: [
      {
        id: "543",
        content: "des notes pour le client",
        date: "2023-01-15 08:30",
      },
      {
        id: 45633,
        content: "Encore des notes pour ce client",
        date: "2023-01-15 08:30",
      },
    ],
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    // wishlist:null,
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["1mongoDb","2mongoDb","3mongoDb","4mongoDb"],
    // orders: ["1mongoDb","2mongoDb","3mongoDb"],
  },
  {
    id: "2mongoDb",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phone: "07 89 01 23 45",
    shippingAddress: "45 Avenue des Champs-Élysées, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: 385,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["4mongoDb","5mongoDb"],
  },
  {
    id: "3mongoDb",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phone: "06 78 90 12 34",
    shippingAddress: "8 Rue du Faubourg Saint-Honoré, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: 302,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["6mongoDb","7mongoDb"],
  },
  {
    id: "4mongoDb",
    firstName: "Eva",
    lastName: "Williams",
    email: "eva@example.com",
    phone: "07 67 89 01 23",
    shippingAddress: "22 Rue de la Pompe, 75116 Paris",
    totalOrders: 2,
    totalOrderValue: 269,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["8mongoDb","9mongoDb"],
  },
  {
    id: "5mongoDb",
    firstName: "Sophie",
    lastName: "Miller",
    email: "sophie@example.com",
    phone: "06 56 78 90 12",
    shippingAddress: "5 Quai de la Tournelle, 75005 Paris",
    totalOrders: 3,
    totalOrderValue: 503,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["10mongoDb","11mongoDb","12mongoDb"],
  },
  {
    id: "6mongoDb",
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel@example.com",
    phone: "07 45 67 89 01",
    shippingAddress: "18 Avenue Montaigne, 75008 Paris",
    totalOrders: 1,
    totalOrderValue: 105,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["13mongoDb"],
  },
  {
    id: "7mongoDb",
    firstName: "Emma",
    lastName: "Davis",
    email: "emma@example.com",
    phone: "06 90 12 34 56",
    shippingAddress: "30 Rue du Bac, 75007 Paris",
    totalOrders: 4,
    totalOrderValue: 450,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["14mongoDb","15mongoDb","16mongoDb","17mongoDb"],
  },
  {
    id: "8mongoDb",
    firstName: "David",
    lastName: "White",
    email: "david@example.com",
    phone: "06 34 56 78 90",
    shippingAddress: "10 Avenue Foch, 75116 Paris",
    totalOrders: 2,
    totalOrderValue: 180,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["18mongoDb","19mongoDb"],
  },
  {
    id: "9mongoDb",
    firstName: "Olivia",
    lastName: "Johnson",
    email: "olivia@example.com",
    phone: "07 23 45 67 89",
    shippingAddress: "14 Rue de Rivoli, 75001 Paris",
    totalOrders: 3,
    totalOrderValue: 250,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["20mongoDb","21mongoDb","22mongoDb"],
  },
  {
    id: "10mongoDb",
    firstName: "William",
    lastName: "Smith",
    email: "william@example.com",
    phone: "06 12 34 56 78",
    shippingAddress: "55 Rue du Faubourg Saint-Antoine, 75011 Paris",
    totalOrders: 2,
    totalOrderValue: 180,
    notesAdmin: null,
    wishlist: [
      {
        productId:"1mongoDb",
        material: 2,
      },
      {
        productId:"5mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"2mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"18mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["23mongoDb","24mongoDb"],
  },
  {
    id: "11mongoDb",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "06 90 23 45 67",
    shippingAddress: "24 Rue de la Liberté, 75002 Paris",
    totalOrders: 5,
    totalOrderValue: 700,
    notesAdmin: null,
    wishlist: [
      {
        productId:"16mongoDb",
        material: 1,
      },
      {
        productId:"10mongoDb",
        material: 3,
      },
    ],
    cart: [
      {
        productId:"7mongoDb",
        material: 2,
        quantity: 3,
      },
      {
        productId:"12mongoDb",
        material: 0,
        quantity: 1,
      },
    ],
    orders: ["25mongoDb","26mongoDb"],
  },
  {
    id: "12mongoDb",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "06 90 34 56 78",
    shippingAddress: "36 Avenue des Champs-Élysées, 75008 Paris",
    totalOrders: 2,
    totalOrderValue: 300,
    notesAdmin: null,
    wishlist: [
      {
        productId:"14mongoDb",
        material: 0,
      },
      {
        productId:"18mongoDb",
        material: 2,
      },
    ],
    cart: [
      {
        productId:"15mongoDb",
        material: 3,
        quantity: 1,
      },
      {
        productId:"20mongoDb",
        material: 1,
        quantity: 3,
      },
    ],
    orders: ["27mongoDb","28mongoDb"],
  },
  {
    id: "13mongoDb",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily@example.com",
    phone: "06 90 78 90 12",
    shippingAddress: "24 Rue du Faubourg Saint-Honoré, 75008 Paris",
    totalOrders: 4,
    totalOrderValue: 600,
    notesAdmin: null,
    wishlist: [
      {
        productId:"12mongoDb",
        material: 1,
      },
      {
        productId:"15mongoDb",
        material: 3,
      },
    ],
    cart: [
      {
        productId:"14mongoDb",
        material: 0,
        quantity: 1,
      },
      {
        productId:"18mongoDb",
        material: 2,
        quantity: 2,
      },
    ],
    orders: ["29mongoDb","30mongoDb"],
  },
  {
    id: "14mongoDb",
    firstName: "Sophie",
    lastName: "Johnson",
    email: "sophie@example.com",
    phone: "06 90 45 67 89",
    shippingAddress: "18 Avenue des Champs-Élysées, 75002 Paris",
    totalOrders: 5,
    totalOrderValue: 750,
    notesAdmin: null,
    wishlist: [
      {
        productId:"15mongoDb",
        material: 2,
      },
      {
        productId:"19mongoDb",
        material: 0,
      },
    ],
    cart: [
      {
        productId:"12mongoDb",
        material: 1,
        quantity: 2,
      },
      {
        productId:"6mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["31mongoDb","32mongoDb","33mongoDb"],
  },
  {
    id: "15mongoDb",
    firstName: "Emma",
    lastName: "Smith",
    email: "emma@example.com",
    phone: "06 90 78 90 12",
    shippingAddress: "24 Rue de la Liberté, 75003 Paris",
    totalOrders: 7,
    totalOrderValue: 900,
    notesAdmin: null,
    wishlist: [
      {
        productId: "12mongoDb",
        material: 1,
      },
      {
        productId: "16mongoDb",
        material: 2,
      },
    ],
    cart: [
      {
        productId:"7mongoDb",
        material: 0,
        quantity: 2,
      },
      {
        productId:"4mongoDb",
        material: 3,
        quantity: 1,
      },
    ],
    orders: ["34mongoDb"],
  },
];
