export const decodeJWT = (token: string) => {
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);

  const userId = JSON.parse(decodedPayload);

  return userId;
};
