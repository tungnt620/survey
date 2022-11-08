export const validateFormData = (formData, schema) => {
  const formErrors = {};

  Object.entries(schema).forEach(([field, defineRules]) => {
    const rules = Array.isArray(defineRules) ? defineRules : [defineRules];
    const fieldError = rules.find((rule) => !rule.isValid(formData[field]));

    if (fieldError) {
      formErrors[field] = fieldError.message;
    }
  });

  return formErrors;
};
