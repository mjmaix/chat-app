import { FormikProps } from 'formik';
import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import { styles } from './styles';

interface FormTextInputProps {
  inputProps: InputProps;
}

interface StringKeyedObject {
  [key: string]: any;
}

interface FriendlyFormInputProps<T extends StringKeyedObject>
  extends FormTextInputProps {
  dataKey: string;
  formProps: FormikProps<T>;
}

export const FormTextInput = (props: FormTextInputProps) => {
  const { inputProps } = props;
  return <Input style={styles.input} {...inputProps} />;
};

export function FriendlyFormInput<T extends StringKeyedObject>(
  props: FriendlyFormInputProps<StringKeyedObject>,
) {
  const { formProps, inputProps, dataKey } = props;
  // const isValidating = formProps.isValidating;
  // const isError = formProps.touched[dataKey] && !!formProps.errors[dataKey];
  const errorMessage = formProps.errors[dataKey] as string;
  const onChangeText = formProps.handleChange(dataKey);

  let builtInputProps: InputProps = {
    ...inputProps,
    onChangeText,
    errorMessage,
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
  return <FormTextInput inputProps={builtInputProps} />;
}
