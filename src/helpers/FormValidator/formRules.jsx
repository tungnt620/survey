export const formRules = {
  custom: ({isValid, message}) => ({isValid, message}),
  email: () => ({
    isValid: (value) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    },
    message: 'Invalid Email',
  }),
  required: () => ({
    isValid: (value) => ![null, undefined, ''].includes(value),
    message: 'This field is required',
  }),
  number: () => ({
    isValid: (value) => {
      return !isNaN(value);
    },
    message: 'This field must be a number',
  }),
  maxLength: (length) => ({
    isValid: (value) => value && value.toString().length <= length,
    message: `This field length should not exceed ${length} characters`,
  }),
  minLength: (length) => ({
    isValid: (value) => value && value.toString().length >= length,
    message: `This field length must be from ${length} characters`,
  }),
  nonEmptyArray: (
    {message} = {
      message: 'This field should not be empty',
    }
  ) => ({
    isValid: (value) => Array.isArray(value) && value.length > 0,
    message: message,
  }),
};
