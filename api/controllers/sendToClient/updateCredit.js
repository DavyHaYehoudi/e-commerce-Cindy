import Credit from "../../models/credit.model.js";
import { handleValidationErrors } from "../../models/errorModelHandler.js";

export const updateCredit = async (
  productsByOrder,
  creditEdit,
  amount,
  dateExpire
) => {
  try {
    const isCreditDB = await Credit.findById(creditEdit?._id);
    // Le credit passé est déjà celui qui est enregistré, il faut donc le conserver.
    if (isCreditDB) {
      return;
    }
    //Aucun crédit passé, il faut donc supprimer ce qui pourrait déjà exister.
    if (!isCreditDB && !creditEdit) {
      await Credit.findOneAndDelete({
        productsByOrderId: productsByOrder._id,
      });
    }
    //Le crédit passé est nouveau, il doit donc remplacer ce qui pourrait déjà exister.
    if (!isCreditDB && creditEdit) {
      await Credit.findOneAndDelete({
        productsByOrderId: productsByOrder._id,
      });
      await Credit.create({
        productsByOrderId: productsByOrder._id,
        amount,
        dateExpire,
      });
    }
  } catch (error) {
    handleValidationErrors(error,"Credit")
  }
};
  