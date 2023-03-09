import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {colors} from '../../style/palette';
import {useAddFriend} from './fetch/useAddFriend';
import {useCreateRoom} from './fetch/useCreateRoom';
import {UserListItemType} from './fetch/useUsersList';

export const FriendListItem = ({user}: {user: UserListItemType}) => {
  const {loggedUser} = useAuth();
  const {
    addFriend,
    loading: isAddFriendLoading,
    error: isAddFriendError,
  } = useAddFriend();
  const {
    createRoom,
    loading: isCreateRoomLoading,
    error: isCreateRoomError,
  } = useCreateRoom();
  return (
    <View
      paddingVerticalSmall
      style={styles.friendItemContainer}
      flexDirectionRow
      justifyContentSpaceBetween
      alignContentCenter>
      <Text>{user.name}</Text>
      <Text
        extraSmall
        colorOffWhite
        style={styles.addFriendButton}
        onPress={async () => {
          if (loggedUser) {
            await addFriend({
              userId: loggedUser.id,
              friendId: user.id,
            });
            await createRoom({
              user1Id: loggedUser.id,
              user2Id: user.id,
              roomName: user.name,
            });
          } else {
            throw Error('User has to be logged in!');
          }
        }}>
        {isAddFriendLoading || isCreateRoomLoading
          ? 'loading...'
          : isAddFriendError || isCreateRoomError
          ? 'Error...'
          : '+ Add friend'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addFriendButton: {
    backgroundColor: colors.darkGray,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  friendItemContainer: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
