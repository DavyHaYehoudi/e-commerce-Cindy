import promocodeRepository from "../repositories/promocodeRepository.js";
import giftcardRepository from "../repositories/giftcardRepository.js";
import creditRepository from "../repositories/creditRepository.js";

const checkAdvantages = async (advantages) => {
  let advantagesResult = {
    codePromoPercentage: "",
    giftcardAmount: "",
    creditAmount: "",
  };

  if (advantages) {
    const { codePromo, giftcard, credit } = advantages;

    if (codePromo?.isValid) {
      const codePromoDB = await promocodeRepository.findOne({
        code: codePromo?.code,
      });
      if (codePromoDB && codePromoDB?.dateExpire > new Date()) {
        advantagesResult["codePromoPercentage"] = codePromoDB?.percentage;
      }
    }

    if (giftcard?.isValid) {
      const codeGiftcardDB = await giftcardRepository.findOne({
        code: giftcard?.code,
      });
      if (
        codeGiftcardDB &&
        codeGiftcardDB?.dateExpire > new Date() &&
        !codeGiftcardDB?.consumerId
      ) {
        advantagesResult["giftcardAmount"] = codeGiftcardDB?.amount;
      }
    }

    if (credit?.isValid) {
      const creditDB = await creditRepository.findById(credit?.creditId);
      if (
        creditDB &&
        creditDB?.clientId.toString() === credit?.clientId &&
        creditDB?.dateExpire > new Date() &&
        !creditDB?.isArchived
      ) {
        advantagesResult["creditAmount"] = creditDB?.amount;
      }
    }
  }

  // console.log("advantagesResult:", advantagesResult);
  return advantagesResult;
};

export default checkAdvantages;
