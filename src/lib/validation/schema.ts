export const cardSchema = {
  cardNumber: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/,
  expiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cvc: /^\d{3,4}$/,
};

export function validateCard(data: {
  cardNumber: string;
  expiry: string;
  cvc: string;
}) {
  const cleanNumber = data.cardNumber.replace(/\s+/g, "");

  return {
    cardNumber: cardSchema.cardNumber.test(cleanNumber),
    expiry: cardSchema.expiry.test(data.expiry),
    cvc: cardSchema.cvc.test(data.cvc),
  };
}
