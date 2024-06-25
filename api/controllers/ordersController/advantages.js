import Credit from "../../models/credit.model.js";
import Giftcard from "../../models/giftcard.model.js";
import Promocode from "../../models/promocode.model.js";

const checkAdvantages = async (req) => {
  let advantagesResult = { codePromoPercentage: "", giftcardAmount: "" };
  if (req.query.advantages) {
    const advantages = JSON.parse(req.query.advantages);
    const { codePromo, giftcard, credit } = advantages;
    if (codePromo?.isValid) {
      const codePromoDB = await Promocode.findOne({
        code: codePromo?.code,
      });
      if (codePromoDB && codePromoDB?.dateExpire > new Date()) {
        advantagesResult["codePromoPercentage"] = codePromoDB?.percentage;
      }
    }
    if (giftcard?.isValid) {
      const codeGiftcardDB = await Giftcard.findOne({ code: giftcard?.code });
      if (codeGiftcardDB && codeGiftcardDB?.dateExpire > new Date()) {
        advantagesResult["giftcardAmount"] = codeGiftcardDB?.amount;
      }
    }
    if (credit?.isValid) {
      const creditDB = await Credit.findById(credit?.creditId);
      if (
        creditDB &&
        creditDB?.clientId.toString() === credit?.clientId &&
        creditDB?.dateExpire > new Date()
      ) {
        advantagesResult["creditAmount"] = creditDB?.amount;
      }
    }
  }
  return advantagesResult;
};
export default checkAdvantages;
