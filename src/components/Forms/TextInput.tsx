import { FormikProps } from 'formik';
import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import { styles } from './styles';

interface StringKeyedObject {
  [key: string]: any;
}

interface FriendlyFormInputProps<T extends StringKeyedObject>
  extends InputProps {
  dataKey: string;
  formProps: FormikProps<T>;
}

export const TextInput = (props: InputProps) => {
  return <Input style={styles.input} {...props} />;
};

export function FormikInput<T extends StringKeyedObject>(
  props: FriendlyFormInputProps<T>,
) {
  const { formProps, dataKey, ...props2 } = props;
  // const isValidating = formProps.isValidating;
  // const isError = formProps.touched[dataKey] && !!formProps.errors[dataKey];
  const errorMessage = formProps.errors[dataKey] as string;
  const onChangeText = formProps.handleChange(dataKey);

  let builtInputProps: InputProps = {
    ...props2,
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
  return <TextInput {...builtInputProps} />;
}
