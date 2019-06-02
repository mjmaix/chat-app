import { FormikProps } from 'formik';
import React from 'react';

type FuncCompProps<T> = (p: FormikProps<T>) => JSX.Element;

export function withFormikMemoize(Comp: FuncCompProps<any>, dataKey: string) {
  const areEqual = (prev: FormikProps<any>, next: FormikProps<any>) => {
    const valueSame = prev.values[dataKey] === next.values[dataKey];
    const errorSame = prev.errors[dataKey] === next.errors[dataKey];

    return valueSame && errorSame;
  };

  return React.memo(Comp, areEqual);
}
