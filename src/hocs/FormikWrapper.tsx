import { FormikProps } from 'formik';
import React, { ReactElement } from 'react';
import { InputProps } from 'react-native-elements';

interface StringKeyedObject {
  [key: string]: any;
}

type SupportedCompProps = InputProps;

interface FormikWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedCompProps
> {
  dataKey: string;
  formProps: FormikProps<T>;
  children: ReactElement<S>;
}

export function FormikInputWrapper<T extends StringKeyedObject>(
  props: FormikWrapperProps<T, InputProps>,
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

// TODO: disable since no use for now.
// Disabled color removes primary color on Sign in button
// Use this for transactional forms like checkout
// export function FormikButtonWrapper<T extends StringKeyedObject>(
//   props: FormikWrapperProps<T, ButtonProps>,
// ) {
//   const { children, formProps } = props;
//   const isValid = formProps.isValid;
//   const onPress = formProps.handleSubmit;

//   return React.cloneElement(children, {
//     ...props,
//     onPress,
//     disabled: !isValid,
//   });
// }
