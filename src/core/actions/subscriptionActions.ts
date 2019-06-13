import { ApolloCurrentResult } from 'apollo-client';
import gql from 'graphql-tag';

import {
  OnCreateClUserSubscription,
  OnDeleteClUserSubscription,
  OnUpdateClUserSubscription,
} from '../../API';
import * as subscriptions from '../../graphql/subscriptions';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

interface DataWrapper<T> extends ApolloCurrentResult<T> {
  data: T;
}
type SubscribeNextCallback<T> = (data: DataWrapper<T>) => void;
type SubscribeErrorCallback = (error: any) => void;

export const subscribeToCreateClUser = <T = OnCreateClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe<DataWrapper<T>>({
      query: gql(subscriptions.onCreateClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data);
      },
      error: e => {
        if (cbError) {
          cbError(e);
        }
        logRecord({
          name: 'SubscribeCreateUserError',
          attributes: {
            error: e.message,
          },
        });
      },
    });
  return observer;
};

export const subscribeToUpdateClUser = <T = OnUpdateClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe<DataWrapper<T>>({
      query: gql(subscriptions.onUpdateClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data);
      },
      error: e => {
        if (cbError) {
          cbError(e);
        }
        logRecord({
          name: 'SubscribeUpdateUserError',
          attributes: {
            error: e.message,
          },
        });
      },
    });
  return observer;
};

export const subscribeToDeleteClUser = <T = OnDeleteClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe<DataWrapper<T>>({
      query: gql(subscriptions.onDeleteClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data);
      },
      error: e => {
        if (cbError) {
          cbError(e);
        }
        logRecord({
          name: 'SubscribeDeleteUserError',
          attributes: {
            error: e.message,
          },
        });
      },
    });
  return observer;
};
