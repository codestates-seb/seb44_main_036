export const calculateTotalPrice = (quantity: number, unitPrice: number): number => {
  const totalAmount: number = unitPrice * quantity;
  return totalAmount;
};
