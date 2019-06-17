import { ApolloCurrentResult } from 'apollo-client';
import gql from 'graphql-tag';

import {
  OnCreateClConversationSubscription,
  OnCreateClConversationSubscriptionVariables,
  OnCreateClMessageSubscription,
  OnCreateClMessageSubscriptionVariables,
  OnCreateClUserSubscription,
  OnDeleteClUserSubscription,
  OnUpdateClUserSubscription,
} from '../../API';
import { handleGetCurrentUser } from '../../core/actions/authActions';
import * as subscriptions from '../../graphql/subscriptions';
import { apolloClient as client } from '../../setup';
import { logInfo } from '../reports';
import { logRecord } from '../reports/index';

interface DataWrapper<T> extends ApolloCurrentResult<T> {
  data: T;
}
type SubscribeNextCallback<T> = (data: DataWrapper<T>) => void;
type SubscribeErrorCallback = (error: any) => void;

export const subscribeToCreateClUser = async <T = OnCreateClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  logInfo('[START] subscribeToCreateClUser');
  const observer = client
    .subscribe<DataWrapper<T>>({
      query: gql(subscriptions.onCreateClUser),
      // variables: { filter: { id: { ne: user.getUsername() } } },
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

export const subscribeToUpdateClUser = async <T = OnUpdateClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  logInfo('[START] subscribeToUpdateClUser');
  const observer = client
    .subscribe<DataWrapper<T>>({
      query: gql(subscriptions.onUpdateClUser),
      // variables: { filter: { id: { ne: user.getUsername() } } },
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

export const subscribeToDeleteClUser = async <T = OnDeleteClUserSubscription>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  logInfo('[START] subscribeToDeleteClUser');
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

export const subscribeToCreateClConversation = async <
  T = OnCreateClConversationSubscription
>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  logInfo('[START] subscribeToCreateClConversation');

  const user = await handleGetCurrentUser();
  const observer = client
    .subscribe<DataWrapper<T>, OnCreateClConversationSubscriptionVariables>({
      query: gql(subscriptions.onCreateClConversation),
      variables: {
        members: user.getUsername(),
      },
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
          name: 'SubscribeCreateConversationError',
          attributes: {
            error: e.message,
          },
        });
      },
    });
  return observer;
};

export const subscribeToCreateClMessage = async <
  T = OnCreateClMessageSubscription
>(
  cbNextData: SubscribeNextCallback<T>,
  cbError?: SubscribeErrorCallback,
) => {
  logInfo('[START] subscribeToCreateClMessage');
  const user = await handleGetCurrentUser();
  const observer = client

    .subscribe<DataWrapper<T>, OnCreateClMessageSubscriptionVariables>({
      query: gql(subscriptions.onCreateClMessage),
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
      variables: {
        members: [user.getUsername()],
      },
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
          name: 'SubscribeToMessageError',
          attributes: {
            error: e.message,
          },
        });
      },
    });
  return observer;
};
