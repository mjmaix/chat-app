import { Body, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import React from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { User } from '../../core/api/unsplash';
import NavigationService from '../../routes/NavigationService';

const UserListItem: ListRenderItem<User> = ({ item, ...props }) => {
  return (
    <ListItem
      avatar
      style={styles.listItem}
      onPress={() => NavigationService.navigate('Chat', item)}
    >
      <Left>
        <Thumbnail source={{ uri: item.profile_image.large }} />
      </Left>
      <Body>
        <Text>{`${item.last_name}, ${item.first_name}`}</Text>
        <Text note>{item.bio}</Text>
      </Body>
      <Right>
        <Text note>{item.username}</Text>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {},
});

export default UserListItem;
