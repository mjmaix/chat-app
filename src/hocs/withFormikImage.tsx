import _ from 'lodash';
import React from 'react';
import { ImageURISource } from 'react-native';
import { ImageProps } from 'react-native-elements';
import { Subtract } from 'utility-types';
import * as Yup from 'yup';

import { PreviewAvatarProps } from '../components';
import { StringKeyedObject, WithFormikConfig } from '.';

export interface InjectPreviewAvatarProps {
  errorMessage?: string | undefined | null;
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  handleTouched?: (v: boolean) => void;
  isSubmitting?: boolean;
  source?: ImageURISource | undefined;
  imageProps?: Partial<ImageProps>;
}

type ReturnFunc = <
  T extends Subtract<PreviewAvatarProps, InjectPreviewAvatarProps>
>(
  props: T,
) => any;

// TODO: should refactor with React.cloneElement or is this a good pract?
// PROBLEM: prop typings passwith with cloneElement are lost
export function withFormikImage<T extends StringKeyedObject>(
  WrappedComp: React.ComponentType<PreviewAvatarProps>,
  config: WithFormikConfig<T>,
  forceUri?: string | null | undefined,
) {
  const { formProps, dataKey } = config;
  const handleChangeImage = formProps.handleChange(dataKey);
  const isSubmitting = formProps.isSubmitting;

  const handleTouched = (v: boolean) => formProps.setFieldTouched(dataKey, v);
  const errorMessage = formProps.errors[dataKey] as string;

  const builtProps: Partial<InjectPreviewAvatarProps> = {
    errorMessage,
    handleChangeImage,
    handleTouched,
    isSubmitting,
  };

  const val = formProps.values[dataKey];
  const isUrl = Yup.string()
    .url()
    .required()
    .isValidSync(val);
  const isFilePath = Yup.string()
    .matches(/^file:\/\//g)
    .required()
    .isValidSync(val);

  if (isUrl || isFilePath) {
    builtProps.source = { uri: val };
  } else if (forceUri) {
    builtProps.source = { uri: forceUri };
  }
  return (props => {
    return <WrappedComp {...builtProps} {...props} />;
  }) as ReturnFunc;
}
