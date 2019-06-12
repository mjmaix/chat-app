import gql from 'graphql-tag';

import * as subscriptions from '../../graphql/subscriptions';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

type SubscribeNextCallback<T> = (data: T) => void;
type SubscribeErrorCallback = (error: any) => void;

export const subscribeToCreateClUser = <T>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe({
      query: gql(subscriptions.onCreateClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data.data);
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

export const subscribeToUpdateClUser = <T>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe({
      query: gql(subscriptions.onUpdateClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data.data);
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

export const subscribeToDeleteClUser = <T>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  const observer = client
    .subscribe({
      query: gql(subscriptions.onDeleteClUser),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    })
    .subscribe({
      next: data => {
        cbNextData(data.data);
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
