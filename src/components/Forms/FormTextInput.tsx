import { FormikProps } from 'formik';
import { Input, Item, NativeBase, Text } from 'native-base';
import React, { Fragment } from 'react';
import { styles } from './styles';

interface FormTextInputProps extends NativeBase.Text {
  inputProps: NativeBase.Input;
  itemProps?: NativeBase.Item;
}

interface StringKeyedObject {
  [key: string]: any;
}

interface FriendlyFormInputProps<T extends StringKeyedObject>
  extends FormTextInputProps {
  dataKey: string;
  formProps: FormikProps<T>;
}

const FormTextInput = (props: FormTextInputProps) => {
  const { inputProps, itemProps } = props;
  return (
    <Item fixedLabel rounded {...itemProps || {}}>
      <Input style={styles.input} {...inputProps} />
    </Item>
  );
};

export function FriendlyFormInput<T extends StringKeyedObject>(
  props: FriendlyFormInputProps<StringKeyedObject>,
) {
  const { formProps, itemProps, inputProps, dataKey } = props;
  // const isValidating = formProps.isValidating;
  const isError = formProps.touched[dataKey] && !!formProps.errors[dataKey];
  const message = formProps.errors[dataKey];
  const onChangeText = formProps.handleChange(dataKey);

  let builtInputProps: NativeBase.Input = {
    ...inputProps,
    onChangeText,
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
  return (
    <Fragment>
      <FormTextInput
        itemProps={{ ...itemProps, error: isError }}
        inputProps={builtInputProps}
      />
      {!!message && (
        <Text
          note
          uppercase
          style={[styles.inputMessage, isError && styles.error]}
        >
          {message}
        </Text>
      )}
    </Fragment>
  );
}
