export const statsBalance=(   totalOrderAmount,
    totalAmountGiftcards,
    totalOrdersCanceledAmount,
    totalRefundAmount,
    totalCredits)=>{
        console.log('typeof totalOrderAmount : ',typeof totalOrderAmount,totalOrderAmount);
        console.log('typeof totalAmountGiftcards : ',typeof totalAmountGiftcards,totalAmountGiftcards);
        console.log('typeof totalOrdersCanceledAmount : ',typeof totalOrdersCanceledAmount,totalOrdersCanceledAmount);
        console.log('typeof totalRefundAmount : ',typeof totalRefundAmount,totalRefundAmount);
        const inTotal = totalOrderAmount + totalAmountGiftcards
        const outTotal = totalOrdersCanceledAmount +totalRefundAmount+totalCredits
        console.log('outTotal:', outTotal)
        const balance = inTotal - outTotal
        return {balance, inTotal,outTotal}
    }