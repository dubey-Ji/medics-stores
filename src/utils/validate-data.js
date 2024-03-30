export const isEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const isValidIndianMobileNumber = (number) => {
  // Regular expression for a number with exactly 10 digits
  const numberRegex = /^\d{10}$/;

  return numberRegex.test(number);
};
