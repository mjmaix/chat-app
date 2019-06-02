import _ from 'lodash';
import React, { Component } from 'react';

import { PreviewAvatarProps } from '../components';
import { StringKeyedObject, WithFormikConfig } from '.';

// TODO: should refactor with React.cloneElement or is this a good pract?
// PROBLEM: prop typings passwith with cloneElement are lost
export function withFormikImage<T extends StringKeyedObject>(
  WrappedComp: React.ComponentType<PreviewAvatarProps>,
  config: WithFormikConfig<T>,
  forceSource?: string | null | undefined,
) {
  const { formProps, dataKey } = config;
  const handleChangeImage = formProps.handleChange(dataKey);
  const isSubmitting = formProps.isSubmitting;

  const handleTouched = (v: boolean) => formProps.setFieldTouched(dataKey, v);
  const errorMessage = formProps.errors[dataKey] as string;

  const builtProps: Partial<PreviewAvatarProps> = {
    errorMessage,
    handleChangeImage,
    handleTouched,
    isSubmitting,
  };

  if (formProps.values[dataKey]) {
    builtProps.source = { uri: forceSource || formProps.values[dataKey] };
  }
  return (props: PreviewAvatarProps) => {
    return <WrappedComp {...builtProps} {...props} />;
  };
}
