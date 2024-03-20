import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collection: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
      required: true,
    },
    category: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
      required: true,
    },
    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    },
    secondary_images: { type: [String] },
    main_description: {
      type: String,
    },
    materials: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Material",
            required: true,
          },
          main_image: {
            type: String,
            required: true,
          },
          pricing: {
            currentPrice: {
              type: Number,
              required: true,
            },
            oldPrice: {
              type: Number,
              default: null,
            },
          },
          quantity: {
            type: Number,
            default: 1,
          },
          isNewProduct: {
            type: Date,
            default: new Date(),
          },
          promotion: {
            amount: {
              type: Number,
              default: null,
            },
            startDate: {
              type: Date,
              default: null,
            },
            endDate: {
              type: Date,
              default: null,
            },
          },
          stock: {
            type: Number,
            default: 1,
          },
          isActive: {
            type: Boolean,
            default: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
