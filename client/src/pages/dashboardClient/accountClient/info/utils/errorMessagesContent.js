export const errorMessagesContent=(errorMessages)=>{
    const hasErrorsMessages = Object.values(errorMessages).some(
        (message) => message !== null
      );
      return hasErrorsMessages
}