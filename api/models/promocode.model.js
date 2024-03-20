import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const promocodeSchema = new mongoose.Schema(
  {
    id:  String,
    code: {
      type: String,
      required: true,
      maxlength: 50
    },
    percentage: {
      type: Number,
      required: true,
    },
    dateExpire: {
      type: Date,
      required: true,
      validate: {
        validator: function (dateExpire) {
          // Vérifie si la date d'expiration est au moins celle du lendemain
          const currentDate = new Date();
          const expirationDate = new Date(dateExpire);
          expirationDate.setDate(expirationDate.getDate() + 1); // Ajoute un jour à la date d'expiration

          return expirationDate >= currentDate;
        },
        message:
          "La date d'expiration choisie doit être au moins celle du lendemain.",
      },
    },
  },
  {
    timestamps: true,
  }
);

promocodeSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Promocode");
  }
  next();
});
const Promocode = mongoose.model("Promocode", promocodeSchema);
export default Promocode;
