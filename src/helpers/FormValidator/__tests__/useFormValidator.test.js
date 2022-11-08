import { act, renderHook } from '@testing-library/react-hooks/dom';
import { formRules } from '../formRules';
import { useFormValidator } from '../useFormValidator';

const getTranslatedText = (transJsx) => {
  return transJsx.props.children;
};

describe('useFormValidator', () => {
  const rules = {
    email: [formRules.required(), formRules.email()],
    password: [formRules.required(), formRules.password()],
  };

  it('validates and return errors', () => {
    const { result } = renderHook(() => useFormValidator({ rules }));

    act(() => {
      result.current.validate({
        email: '',
        password: '',
      });
    });

    expect(getTranslatedText(result.current.formErrors.email)).toBe('This field is required');
    expect(getTranslatedText(result.current.formErrors.password)).toBe('This field is required');

    act(() => {
      result.current.validate({
        email: 'example',
        password: '123',
      });
    });

    expect(getTranslatedText(result.current.formErrors.email)).toBe('Invalid Email');
    expect(getTranslatedText(result.current.formErrors.password)).toBe('Password must be from 8 characters');
  });

  it('has method to set field value', () => {
    const { result } = renderHook(() => useFormValidator({ rules }));

    act(() => {
      result.current.setFieldValue({
        email: 'test@gmail.com',
      });
    });

    act(() => {
      result.current.setFieldValue({
        password: '12345678',
      });
    });

    expect(result.current.formData.email).toBe('test@gmail.com');
    expect(result.current.formData.password).toBe('12345678');

    // set multiple fields at once
    act(() => {
      result.current.setFieldValue({
        email: 'test2@gmail.com',
        password: 'password2',
      });
    });

    expect(result.current.formData.email).toBe('test2@gmail.com');
    expect(result.current.formData.password).toBe('password2');
  });

  it("clears field's error when the field changed", () => {
    const { result } = renderHook(() => useFormValidator({ rules }));

    act(() => {
      result.current.validate({
        email: '',
        password: '',
      });
    });

    expect(result.current.formErrors.email).toBeTruthy();
    expect(result.current.formErrors.password).toBeTruthy();

    act(() => {
      result.current.setFieldValue({
        email: 'test@gmail.com',
      });
    });

    expect(result.current.formErrors.email).toBeFalsy();
    expect(result.current.formErrors.password).toBeTruthy();
  });
});
