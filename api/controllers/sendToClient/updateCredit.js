import Credit from "../../models/credit.model.js";

export const updateCredit = async (
  orderProducts,
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
        orderProductsId: orderProducts._id,
      });
    }
    //Le crédit passé est nouveau, il doit donc remplacer ce qui pourrait déjà exister.
    if (!isCreditDB && creditEdit) {
      await Credit.findOneAndDelete({
        orderProductsId: orderProducts._id,
      });
      await Credit.create({
        orderProductsId: orderProducts._id,
        amount,
        dateExpire,
      });
    }
  } catch (error) {
    console.log("Erreur dans la mise à jour de updateCredit");
    throw error
  }
};
  