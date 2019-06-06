import _ from 'lodash';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, NavigationScreenProps } from 'react-navigation';

import { ProfileModel, handleGetPreferredMfa, handleSetMfa } from '../../core';
import {
  NavigationService,
  alertConfirm,
  alertFail,
  isConnected,
} from '../../utils';

type Props = NavigationScreenProps;
interface State {
  isReady: boolean;
  preferredMfa: MFAChoice;
  qrCode?: string;
  userAttrs?: typeof ProfileModel;
}

const buttonLabels: string[] = ['Off', 'App']; // 'Sms'
const buttonMap: MFAChoice[] = ['NOMFA', 'SOFTWARE_TOKEN_MFA', 'SMS']; // 'SMS'

class MfaSelectScreen extends React.Component<Props, State> {
  public readonly state = {
    isReady: false,
    preferredMfa: 'NOMFA' as MFAChoice,
    qrCode: undefined,
    userAttrs: ProfileModel,
  };

  public componentDidMount() {
    isConnected()
      .then(() => ({ bypassCache: true }))
      .catch(() => ({ bypassCache: false }))
      .then(opts => handleGetPreferredMfa(opts))
      .then((prefMfa: MFAChoice) => {
        this.setState({ isReady: true, preferredMfa: prefMfa });
      });
  }

  public renderItem: ListRenderItem<any> = ({ item, index }) => (
    <ListItem key={index} {...item} />
  );

  private onSelectIndex = async (selectedIndex: number) => {
    try {
      const sel = buttonMap[selectedIndex];
      const pref = this.state.preferredMfa; // NOTE: re-click disabled, workaround for disableStyle as gray
      if (sel === 'SOFTWARE_TOKEN_MFA' && 'SOFTWARE_TOKEN_MFA' !== pref) {
        alertConfirm(
          () => {
            NavigationService.navigate('MfaTotp');
          },
          {
            cancelable: true,
            message: 'Setup a new one using Time-based One-time password.',
          },
        );
      } else if (buttonMap[selectedIndex] === 'SMS' && 'SMS' !== pref) {
        alertConfirm(
          () => {
            NavigationService.navigate('MfaSms');
          },
          {
            cancelable: true,
            message: 'Setup a new one using SMS',
          },
        );
      } else {
        alertConfirm(
          async () => {
            const data = await handleSetMfa('NOMFA');
            this.setState({ preferredMfa: 'NOMFA' });
          },
          {
            cancelable: true,
            message: 'Turn-off MFA',
          },
        );
      }
    } catch (err) {
      alertFail(() => null, err);
    }
  };

  public render() {
    const { isReady, preferredMfa } = this.state;
    const list = [
      {
        title: 'Select MFA type',
        buttonGroup: {
          disabled: !isReady,
          buttons: buttonLabels,
          onPress: this.onSelectIndex,
          selectedIndex: buttonMap.indexOf(preferredMfa),
        },
        bottomDivider: true,
      },
    ];
    return (
      <FlatList<any>
        keyExtractor={(item, i: number) => i.toString()}
        data={list}
        renderItem={this.renderItem}
        refreshing={!isReady}
        scrollEnabled={false}
      />
    );
  }
}

export { MfaSelectScreen };
