import _ from 'lodash';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, NavigationScreenProps } from 'react-navigation';

import { ProfileModel, handleGetPreferredMfa, handleSetMfa } from '../../core';
import { NavigationService, alertFail } from '../../utils';

type Props = NavigationScreenProps;
interface State {
  isReady: boolean;
  preferredMfa?: MFAChoice;
  qrCode?: string;
  userAttrs?: typeof ProfileModel;
}

const buttonLabels: string[] = ['Off', 'Sms', 'App'];
const buttonMap: MFAChoice[] = ['NOMFA', 'SMS', 'TOTP'];

class MfaSelectScreen extends React.Component<Props, State> {
  public readonly state = {
    isReady: false,
    preferredMfa: undefined,
    qrCode: undefined,
    userAttrs: ProfileModel,
  };

  public componentDidMount() {
    handleGetPreferredMfa().then((prefMfa: MFAChoice) => {
      this.setState({ isReady: true, preferredMfa: prefMfa });
    });
  }

  public renderItem: ListRenderItem<any> = ({ item, index }) => (
    <ListItem key={index} {...item} />
  );

  private onSelectIndex = async (selectedIndex: number) => {
    try {
      if (buttonMap[selectedIndex] === 'TOTP') {
        NavigationService.navigate('MfaTotp');
      } else if (buttonMap[selectedIndex] === 'SMS') {
        NavigationService.navigate('MfaSms');
      } else {
        const data = await handleSetMfa(buttonMap[selectedIndex]);
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
          selectedIndex: preferredMfa ? buttonMap.indexOf(preferredMfa) : 0,
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
