import { Body, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import React from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { User } from '../../core/api/unsplash';

const UserListItem: ListRenderItem<User> = props => {
  return (
    <ListItem avatar={true} style={styles.listItem}>
      <Left>
        <Thumbnail source={{ uri: props.item.profile_image.large }} />
      </Left>
      <Body>
        <Text>{`${props.item.last_name}, ${props.item.first_name}`}</Text>
        <Text note={true}>{props.item.bio}</Text>
      </Body>
      <Right>
        <Text note={true}>{props.item.username}</Text>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {},
});

export default UserListItem;
