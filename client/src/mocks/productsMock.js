import { materials } from "../constants/materials";
import bo from "../assets/bo.png";
import bar from "../assets/bar.png";
import bra from "../assets/bra.png";
import col from "../assets/col.png";

export const productsMock = [
  {
    id: 1,
    reference: "QER2345OIJD",
    category: "Jewelry",
    releaseDate: "2023-11-01",
    name: "Boucles d'oreilles",
    image: bo,
    description:
      "Magnifiques boucles d'oreilles pour des occasions uniques et qui vous mettront en valeur.",
    materials: [
      materials[0].name,
      materials[1].name,
      materials[2].name,
      materials[3].name,
    ],
    promotion: {
      amount: "10%",
      startDate: "2023-11-15",
      endDate: "2023-11-30",
    },
    pricing: {
      currentPrice: 50,
      oldPrice: 65,
    },
    stock: 7,
    ratings: 4.5,
    options: {
      size: ["S", "M", "L"],
      color: ["Red", "Blue", "Green"],
    },
    tags: ["Casual", "Summer"],
    isNew: true,
  },
  {
    id: 2,
    reference: "ABC123XYZ",
    category: "Clothing",
    releaseDate: "2023-10-15",
    name: "Robe élégante",
    image: bar,
    description:
      "Une robe élégante parfaite pour les soirées spéciales. Confortable et stylée.",
    materials: [materials[2].name, materials[3].name],
    promotion: {
      amount: "15%",
      startDate: "2023-10-20",
      endDate: "2023-11-05",
    },
    pricing: {
      currentPrice: 120,
      oldPrice: 140,
    },
    stock: 15,
    ratings: 4.2,
    options: {
      size: ["M", "L", "XL"],
      color: ["Black", "White"],
    },
    tags: ["Evening Wear", "Formal"],
    isNew: false,
  },
  {
    id: 3,
    reference: "ABC123XYZ",
    category: "Hair Accessories",
    releaseDate: "2023-10-20",
    name: "Peigne en cristal",
    image: col,
    description:
      "Un peigne élégant en cristal pour ajouter une touche de glamour à votre coiffure.",
    materials: [materials[2].name, materials[3].name],
    promotion: {
      amount: "15%",
      startDate: "2023-11-01",
      endDate: "2023-11-15",
    },
    pricing: {
      currentPrice: 25,
      oldPrice: 30,
    },
    stock: 10,
    ratings: 4.0,
    options: {
      color: ["Silver", "Gold"],
    },
    tags: ["Wedding", "Special Occasion"],
    isNew: false,
  },
  {
    id: 4,
    reference: "DEF567LMN",
    category: "Bracelets",
    releaseDate: "2023-11-05",
    name: "Bracelet en perles",
    image: bra,
    description:
      "Un bracelet élégant en perles pour compléter votre look avec style.",
    materials: null,
    promotion: {
      amount: "",
      startDate: "",
      endDate: "",
    },
    pricing: {
      currentPrice: 40,
      oldPrice: null,
    },
    stock: 15,
    ratings: 4.7,
    options: {
      size: ["Small", "Medium", "Large"],
      color: ["White", "Black"],
    },
    tags: ["Formal", "Evening Wear"],
    isNew: true,
  },
  {
    id: 5,
    reference: "GHI789JKL",
    category: "Necklaces",
    releaseDate: "2023-11-10",
    name: "Collier de perles",
    image: bo,
    description:
      "Un collier de perles classique qui ajoute une touche d'élégance à n'importe quelle tenue.",
    materials: [materials[0].name, materials[2].name],
    promotion: {
      amount: "12%",
      startDate: "2023-11-15",
      endDate: "2023-11-30",
    },
    pricing: {
      currentPrice: 60,
      oldPrice: 70,
    },
    stock: 12,
    ratings: 4.8,
    options: {
      color: ["White", "Gray"],
    },
    tags: ["Formal", "Wedding"],
    isNew: true,
  },
  {
    id: 6,
    reference: "MNO456PQR",
    category: "Hair Accessories",
    releaseDate: "2023-11-02",
    name: "Broche en strass",
    image: bar,
    description:
      "Une broche scintillante en strass pour ajouter une touche de glamour à votre coiffure.",
    materials: [materials[1].name],
    promotion: {
      amount: "10%",
      startDate: "2023-11-05",
      endDate: "2023-11-20",
    },
    pricing: {
      currentPrice: 35,
      oldPrice: 40,
    },
    stock: 8,
    ratings: 4.6,
    options: {
      color: ["Gold", "Silver"],
    },
    tags: ["Special Occasion", "Party"],
    isNew: false,
  },
  {
    id: 7,
    reference: "STU012VWX",
    category: "Hair Accessories",
    releaseDate: "2023-11-08",
    name: "Collier de dos en perles",
    image: col,
    description:
      "Un collier de dos en perles pour sublimer vos tenues dos nu avec élégance.",
    materials: null,
    promotion: {
      amount: "8%",
      startDate: "2023-11-12",
      endDate: "2023-11-25",
    },
    pricing: {
      currentPrice: 45,
      oldPrice: 50,
    },
    stock: 10,
    ratings: 4.4,
    options: {
      color: ["White", "Ivory"],
    },
    tags: ["Wedding", "Special Occasion"],
    isNew: false,
  },
  {
    id: 8,
    reference: "YZA345BCD",
    category: "Earrings",
    releaseDate: "2023-11-06",
    name: "Boucles d'oreilles pendantes",
    image: bra,
    description:
      "Des boucles d'oreilles pendantes chic et modernes pour compléter votre look avec style.",
    materials: [materials[1].name, materials[3].name],
    promotion: {
      amount: "20%",
      startDate: "2023-11-10",
      endDate: "2023-11-30",
    },
    pricing: {
      currentPrice: 30,
      oldPrice: 38,
    },
    stock: 15,
    ratings: 4.7,
    options: {
      color: ["Silver", "Rose Gold"],
    },
    tags: ["Casual", "Evening Wear"],
    isNew: true,
  },
  {
    id: 9,
    reference: "EFG678HIJ",
    category: "Hair Accessories",
    releaseDate: "2023-11-12",
    name: "Peigne vintage",
    image: col,
    description:
      "Un peigne vintage orné de détails élégants pour ajouter une touche rétro à votre coiffure.",
    materials: [materials[1].name, materials[2].name],
    promotion: {
      amount: "15%",
      startDate: "2023-11-15",
      endDate: "2023-11-30",
    },
    pricing: {
      currentPrice: 35,
      oldPrice: 42,
    },
    stock: 12,
    ratings: 4.6,
    options: {
      color: ["Gold", "Silver"],
    },
    tags: ["Vintage", "Retro"],
    isNew: false,
  },
  {
    id: 10,
    reference: "KLM901NOP",
    category: "Bracelets",
    releaseDate: "2023-11-10",
    name: "Bracelet en cuir tressé",
    image: bo,
    description:
      "Un bracelet en cuir tressé avec une fermeture magnétique pour un look décontracté et tendance.",
    materials: [materials[0].name, materials[3].name],
    promotion: {
      amount: "10%",
      startDate: "2023-11-15",
      endDate: "2023-11-25",
    },
    pricing: {
      currentPrice: 28,
      oldPrice: 32,
    },
    stock: 18,
    ratings: 4.3,
    options: {
      size: ["Small", "Medium", "Large"],
      color: ["Brown", "Black"],
    },
    tags: ["Casual", "Everyday Wear"],
    isNew: true,
  },
  {
    id: 11,
    reference: "PQR234STU",
    category: "Brooches",
    releaseDate: "2023-11-18",
    name: "Broche florale en argent",
    image: bar,
    description:
      "Une élégante broche florale en argent pour ajouter une touche de délicatesse à vos tenues.",
    materials: [materials[2].name, materials[3].name],
    promotion: {
      amount: "12%",
      startDate: "2023-11-20",
      endDate: "2023-12-05",
    },
    pricing: {
      currentPrice: 22,
      oldPrice: 25,
    },
    stock: 15,
    ratings: 4.2,
    options: {
      color: ["Silver"],
    },
    tags: ["Formal", "Special Occasion"],
    isNew: false,
  },
  {
    id: 12,
    reference: "UVW567XYZ",
    category: "Earrings",
    releaseDate: "2023-11-15",
    name: "Boucles d'oreilles pendantes en perles",
    image: bra,
    description:
      "Des boucles d'oreilles pendantes en perles pour un look sophistiqué et raffiné.",
    materials: [materials[0].name, materials[2].name],
    promotion: {
      amount: "18%",
      startDate: "2023-11-18",
      endDate: "2023-11-30",
    },
    pricing: {
      currentPrice: 28,
      oldPrice: 35,
    },
    stock: 20,
    ratings: 4.5,
    options: {
      color: ["White"],
    },
    tags: ["Evening Wear", "Wedding"],
    isNew: true,
  },
  {
    id: 13,
    reference: "XYZ890ABC",
    category: "Hair Accessories",
    releaseDate: "2023-11-25",
    name: "Serre-tête en perles",
    image: col,
    description:
      "Un serre-tête élégant en perles pour ajouter une touche sophistiquée à votre coiffure.",
    materials: null,
    promotion: {
      amount: "10%",
      startDate: "2023-11-28",
      endDate: "2023-12-10",
    },
    pricing: {
      currentPrice: 18,
      oldPrice: 20,
    },
    stock: 25,
    ratings: 4.1,
    options: {
      color: ["Ivory", "Black"],
    },
    tags: ["Casual", "Everyday Wear"],
    isNew: false,
  },
  {
    id: 14,
    reference: "BCD123EFG",
    category: "Bracelets",
    releaseDate: "2023-11-22",
    name: "Bracelet jonc en argent",
    image: bo,
    description:
      "Un bracelet jonc en argent avec des détails ciselés pour une allure élégante au quotidien.",
    materials: [materials[2].name, materials[3].name],
    promotion: {
      amount: "15%",
      startDate: "2023-11-25",
      endDate: "2023-12-05",
    },
    pricing: {
      currentPrice: 32,
      oldPrice: 38,
    },
    stock: 18,
    ratings: 4.3,
    options: {
      size: ["Small", "Medium", "Large"],
      color: ["Silver"],
    },
    tags: ["Everyday Wear", "Casual"],
    isNew: true,
  },
  {
    id: 15,
    reference: "EFG456HIJ",
    category: "Earrings",
    releaseDate: "2023-11-30",
    name: "Boucles d'oreilles créoles en argent",
    image: bar,
    description:
      "Des boucles d'oreilles créoles en argent pour un look moderne et élégant.",
    materials: [materials[1].name, materials[3].name],
    promotion: {
      amount: "10%",
      startDate: "2023-12-01",
      endDate: "2023-12-15",
    },
    pricing: {
      currentPrice: 28,
      oldPrice: 32,
    },
    stock: 20,
    ratings: 4.6,
    options: {
      color: ["Silver"],
    },
    tags: ["Casual", "Everyday Wear"],
    isNew: false,
  },
  {
    id: 16,
    reference: "HIJ789KLM",
    category: "Hair Accessories",
    releaseDate: "2023-11-28",
    name: "Pin à cheveux en perles",
    image: bra,
    description:
      "Un pin à cheveux élégant en perles pour rehausser votre coiffure avec une touche de sophistication.",
    materials: [materials[0].name, materials[2].name],
    promotion: {
      amount: "",
      startDate: "",
      endDate: "",
    },
    pricing: {
      currentPrice: 15,
      oldPrice: null,
    },
    stock: 15,
    ratings: 4.2,
    options: {
      color: ["White", "Gold"],
    },
    tags: ["Wedding", "Special Occasion"],
    isNew: true,
  },
  {
    id: 17,
    reference: "LMN012OPQ",
    category: "Necklaces",
    releaseDate: "2023-12-05",
    name: "Collier pendentif en cristal",
    image: col,
    description:
      "Un collier pendentif en cristal pour ajouter une touche de glamour à vos tenues de soirée.",
    materials: [materials[2].name, materials[3].name],
    promotion: {
      amount: "15%",
      startDate: "2023-12-08",
      endDate: "2023-12-20",
    },
    pricing: {
      currentPrice: 45,
      oldPrice: 50,
    },
    stock: 12,
    ratings: 4.7,
    options: {
      color: ["Silver", "Gold"],
    },
    tags: ["Evening Wear", "Formal"],
    isNew: false,
  },
  {
    id: 18,
    reference: "OPQ345RST",
    category: "Hair Accessories",
    releaseDate: "2023-12-01",
    name: "Serre-tête floral",
    image: bo,
    description:
      "Un serre-tête floral avec des détails délicats pour une coiffure féminine et romantique.",
    materials: [materials[0].name, materials[1].name],
    promotion: {
      amount: "10%",
      startDate: "2023-12-05",
      endDate: "2023-12-15",
    },
    pricing: {
      currentPrice: 20,
      oldPrice: 22,
    },
    stock: 18,
    ratings: 4.5,
    options: {
      color: ["Pink", "White"],
    },
    tags: ["Romantic", "Casual"],
    isNew: true,
  },
  {
    id: 19,
    reference: "RST678UVW",
    category: "Bracelets",
    releaseDate: "2023-12-10",
    name: "Bracelet charm en perles",
    image: bar,
    description:
      "Un bracelet charm en perles pour exprimer votre style unique et personnel.",
    materials: [materials[1].name, materials[2].name],
    promotion: {
      amount: "8%",
      startDate: "2023-12-12",
      endDate: "2023-12-25",
    },
    pricing: {
      currentPrice: 28,
      oldPrice: 30,
    },
    stock: 15,
    ratings: 4.4,
    options: {
      size: ["Small", "Medium", "Large"],
      color: ["Blue", "White"],
    },
    tags: ["Casual", "Everyday Wear"],
    isNew: false,
  },
  {
    id: 20,
    reference: "UVW890XYZ",
    category: "Earrings",
    releaseDate: "2023-12-08",
    name: "Boucles d'oreilles pendantes en argent",
    image: bra,
    description:
      "Des boucles d'oreilles pendantes en argent pour un look élégant et intemporel.",
    materials: [materials[0].name, materials[3].name],
    promotion: {
      amount: "12%",
      startDate: "2023-12-10",
      endDate: "2023-12-20",
    },
    pricing: {
      currentPrice: 32,
      oldPrice: 36,
    },
    stock: 20,
    ratings: 4.6,
    options: {
      color: ["Silver"],
    },
    tags: ["Evening Wear", "Formal"],
    isNew: true,
  },
];
