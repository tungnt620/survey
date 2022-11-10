import { isEmpty } from "lodash";
import { useState } from "preact/hooks";
import { validateFormData } from "./validateForm";

export const useFormValidator = <T>({
  defaultData,
  rules,
}: {
  defaultData: T;
  rules: Partial<Record<keyof T, unknown[]>>;
}) => {
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [formData, setFormData] = useState<T>(defaultData);

  const validate = (formData: T) => {
    const newErrors = validateFormData(formData, rules) as typeof formErrors;

    setFormErrors(newErrors);

    return {
      isValid: isEmpty(newErrors),
      newErrors,
    };
  };

  const resetErrors = (changedData: Partial<T>) => {
    const newErrors = Object.keys(changedData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: null,
      }),
      formErrors
    );

    setFormErrors(newErrors);
  };

  const setFieldValue = (data: Partial<typeof formData>) => {
    setFormData({
      ...formData,
      ...data,
    });
    resetErrors(data);
  };

  const updateFormErrors = (errors: Partial<typeof formErrors>) => {
    setFormErrors({
      ...formErrors,
      ...errors,
    });
  };

  return {
    validate,
    formErrors,
    formData,
    setFieldValue,
    updateFormErrors,
  };
};
