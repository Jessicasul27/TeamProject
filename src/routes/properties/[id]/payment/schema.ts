export const cardSchema = {
  cardNumber: /^\d{16}$/,
  expiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cvc: /^\d{3,4}$/,
};

export function validateCard(data: {
  cardNumber: string;
  expiry: string;
  cvc: string;
}) {
  const cleanNumber = data.cardNumber.replace(/\s+/g, "").trim();
  const cleanExpiry = data.expiry.trim();
  const cleanCvc = data.cvc.trim();

  return {
    cardNumber: cardSchema.cardNumber.test(cleanNumber),
    expiry: cardSchema.expiry.test(cleanExpiry),
    cvc: cardSchema.cvc.test(cleanCvc),
  };
}
