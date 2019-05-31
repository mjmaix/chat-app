import { FormikProps } from 'formik';
import React, { ReactElement } from 'react';
import { InputProps, ButtonProps } from 'react-native-elements';
import _ from 'lodash';

interface StringKeyedObject {
  [key: string]: any;
}

type SupportedCompProps = InputProps | ButtonProps;

interface FormikFormWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedCompProps
> {
  formProps: FormikProps<T>;
  children: ReactElement<S>;
}
interface FormikFieldWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedCompProps
> extends FormikFormWrapperProps<T, S> {
  dataKey: string;
}

export function FormikInputWrapper<T extends StringKeyedObject>(
  props: FormikFieldWrapperProps<T, InputProps>,
) {
  const { children, formProps, dataKey, ...props2 } = props;
  // const isValidating = formProps.isValidating;
  // const isDirty = formProps.dirty;
  const isTouched = formProps.touched[dataKey];
  const errorMessage = formProps.errors[dataKey] as string;
  const onChangeText = formProps.handleChange(dataKey);

  let builtInputProps: InputProps = {
    ...props2,
    onChangeText,
    errorMessage: isTouched ? errorMessage : undefined,
  };
  if (formProps.handleBlur(dataKey)) {
    builtInputProps = {
      ...builtInputProps,
      onBlur: formProps.handleBlur(dataKey),
    };
  }
  if (formProps.values[dataKey]) {
    builtInputProps = {
      ...builtInputProps,
      value: formProps.values[dataKey],
    };
  }
  return React.cloneElement(children, { ...builtInputProps });
}

// Disabled color removes primary color on Sign in button
// Use this for transactional forms like checkout
export function FormikButtonWrapper(
  props: FormikFormWrapperProps<any, ButtonProps>,
) {
  const { children, formProps } = props;
  const isValid = formProps.isValid;
  const isTouched = !_.isEmpty(formProps.touched);
  const onPress = formProps.handleSubmit;

  return React.cloneElement(children, {
    ...props,
    onPress,
    disabled: !isValid || !isTouched,
  });
}
