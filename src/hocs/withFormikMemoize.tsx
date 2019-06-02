import React from 'react';
import { WithFormikConfig, StringKeyedObject } from '.';
import { FormikProps } from 'formik';
import { String } from 'aws-sdk/clients/shield';

type FuncCompProps<T> = (p: FormikProps<T>) => JSX.Element;

export function withFormikMemoize<T extends StringKeyedObject>(
  Comp: FuncCompProps<T>,
  dataKey: string,
) {
  const areEqual = (prev: FormikProps<T>, next: FormikProps<T>) => {
    const valueSame = prev.values[dataKey] === next.values[dataKey];
    const errorSame = prev.errors[dataKey] === next.errors[dataKey];

    return valueSame && errorSame;
  };

  return React.memo(Comp, areEqual);
}
