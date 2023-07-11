export const calculateTotalPrice = (quantity: number): number => {
  const unitPrice = 39500; // Unit price per item
  const totalAmount: number = unitPrice * quantity;
  return totalAmount;
};
