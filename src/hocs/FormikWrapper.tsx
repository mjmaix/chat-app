import { FormikProps } from 'formik';
import React, { ReactElement, Component } from 'react';
import { InputProps, ButtonProps, Icon } from 'react-native-elements';
import _ from 'lodash';
import { PreviewAvatarProps } from '../components';

import * as Animatable from 'react-native-animatable';
import { StyleGuide } from '../core';

interface StringKeyedObject {
  [key: string]: any;
}

type SupportedComp =
  | ReactElement<InputProps>
  | ReactElement<ButtonProps>
  | React.ComponentType<PreviewAvatarProps>;

interface FormikFormWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedComp
> {
  formProps: FormikProps<T>;
  children: S;
}
interface FormikFieldWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedComp
> extends FormikFormWrapperProps<T, S> {
  dataKey: string;
}

export interface WithFormikConfig<T extends StringKeyedObject> {
  formProps: FormikProps<T>;
  dataKey: string;
}

export function FormikInputWrapper<T extends StringKeyedObject>(
  props: FormikFieldWrapperProps<T, ReactElement<InputProps>>,
) {
  const { children, formProps, dataKey, ...props2 } = props;
  // const isValidating = formProps.isValidating;
  // const isDirty = formProps.dirty;
  const isTouched = formProps.touched[dataKey];
  const errorMessage = formProps.errors[dataKey] as string;
  const onChangeText = formProps.handleChange(dataKey);

  let builtProps: Partial<InputProps> = {
    ...props2,
    onChangeText,
    errorMessage: isTouched ? errorMessage : undefined,
  };
  if (formProps.handleBlur(dataKey)) {
    builtProps = {
      ...builtProps,
      onBlur: formProps.handleBlur(dataKey),
    };
  }
  if (formProps.values[dataKey]) {
    builtProps = {
      ...builtProps,
      value: formProps.values[dataKey],
    };
  }
  return React.cloneElement(children, { ...builtProps });
}

const AnimatedLoadingIcon = () => (
  <Animatable.View
    animation="rotate"
    easing="linear"
    iterationCount="infinite"
    style={{
      paddingHorizontal: StyleGuide.gap.regular,
    }}
  >
    <Icon type="feather" name="loader" size={15} color="black" />
  </Animatable.View>
);

export function FormikButtonWrapper(
  props: FormikFormWrapperProps<any, ReactElement<ButtonProps>>,
) {
  const { children, formProps } = props;
  const isValid = formProps.isValid;
  const isTouched = !_.isEmpty(formProps.touched);
  const onPress = formProps.handleSubmit;
  const isSubmitting = formProps.isSubmitting;

  return React.cloneElement(children, {
    ...props,
    onPress,
    disabled: !isValid || !isTouched || isSubmitting,
    iconRight: true,
    icon: isSubmitting ? AnimatedLoadingIcon : undefined,
  });
}

// TODO: should refactor with React.cloneElement or is this a good pract?
// PROBLEM: prop typings passwith with cloneElement are lost
export function withFormikImage<T extends StringKeyedObject>(
  WrappedComp: React.ComponentType<PreviewAvatarProps>,
  props: WithFormikConfig<T>,
) {
  const { formProps, dataKey } = props;
  const handleChangeImage = formProps.handleChange(dataKey);

  const handleTouched = (v: boolean) => formProps.setFieldTouched(dataKey, v);
  const errorMessage = formProps.errors[dataKey] as string;

  const builtProps: Partial<PreviewAvatarProps> = {
    errorMessage,
    handleChangeImage,
    handleTouched,
  };

  if (formProps.values[dataKey]) {
    builtProps.source = { uri: formProps.values[dataKey] };
  }
  return class extends Component<PreviewAvatarProps> {
    public render() {
      return <WrappedComp {...this.props} {...builtProps} />;
    }
  };
}
