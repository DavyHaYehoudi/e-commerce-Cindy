// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     reference: {
//       type: String,
//       required: false,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     releaseDate: {
//       type: String,
//       required: false,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     main_image: {
//       type: String,
//     },
//     main_description: {
//       type: String,
//     },
//     materials: {
//       type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
//       default: null,
//     },
//     promotion: {
//       type: {
//         amount: {
//           type: String,
//           required: true,
//         },
//         startDate: {
//           type: String,
//           required: true,
//         },
//         endDate: {
//           type: String,
//           required: true,
//         },
//       },
//       default: null,
//     },
//     pricing: {
//       currentPrice: {
//         type: Number,
//         required: true,
//       },
//       oldPrice: {
//         type: Number,
//       },
//     },
//     stock: {
//       type: Number,
//       required: true,
//     },
//     ratings: {
//       type: Number,
//     },
//     options: {
//       color: {
//         type: [String],
//       },
//     },
//     tags: {
//       type: [String],
//     },
//     isNewProduct: {
//       type: Boolean,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // const Product = mongoose.model("Product", productSchema);
// // export default Product;
const productPending = "pending product"
export default productPending