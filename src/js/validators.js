export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{7,10}$/;
    return phoneRegex.test(phone);
};

export const validateRequired = (value) => {
    return value.trim() !== '';
};