import { PreviewAvatarProps } from './../components/Images/PreviewAvatar';
import { InputProps, ButtonProps } from 'react-native-elements';
import { FormikProps } from 'formik';
import { ReactElement } from 'react';
export * from './FormikInputInjector';
export * from './FormikButtonInjector';
export * from './withFormikImage';

export type SupportedComp =
  | ReactElement<InputProps>
  | ReactElement<ButtonProps>
  | React.ComponentType<PreviewAvatarProps>;

export interface StringKeyedObject {
  [key: string]: any;
}

export interface WithFormikConfig<T extends StringKeyedObject> {
  formProps: FormikProps<T>;
  dataKey: string;
}

export interface FormikFormWrapperProps<
  T extends StringKeyedObject,
  S extends SupportedComp
> {
  formProps: FormikProps<T>;
  children: S;
}
