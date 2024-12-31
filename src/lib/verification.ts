export const generateVerifyUrl = (registrationNumber: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/verification/${registrationNumber}`;
};