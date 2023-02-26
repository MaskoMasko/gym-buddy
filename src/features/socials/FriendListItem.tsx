import React, {useState} from 'react';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import useAuth, {UserInterface} from '../../hooks/useAuth';
import {colors} from '../../style/palette';
import {useAddFriend} from './fetch/useAddFriend';
import {StyleSheet} from 'react-native';
import {useCreateRoom} from './fetch/useCreateRoom';

export const FriendListItem = ({user}: {user: UserInterface}) => {
  const {loggedUser} = useAuth();
  const [isFriendWith, setIsFriendWith] = useState(
    !!loggedUser?.friends.find(friend => friend.id === user.id),
  );
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
      marginVerticalExtraSmall
      backgroundColorLightSoft
      style={styles.friendItemContainer}
      flexDirectionRow
      justifyContentSpaceBetween
      alignContentCenter>
      <Text>{user.name}</Text>
      {!isFriendWith && (
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
              });
              setIsFriendWith(true);
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addFriendButton: {
    backgroundColor: colors.darkGray,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  friendItemContainer: {borderRadius: 5, padding: 10},
});
