const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\d{10}$/;

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
    return phoneRegex.test(phone);
};

