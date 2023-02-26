import React from 'react';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {FriendListItem} from './FriendListItem';
import {useUsersList} from './fetch/useUsersList';

export const AddFriendsScreen = () => {
  const usersList = useUsersList();
  const {loggedUser} = useAuth();
  return (
    <Screen
      withoutTopInsets
      queryStatus={{loading: usersList.loading, error: usersList.error}}>
      <View marginHorizontalMedium>
        <View marginVerticalExtraLarge>
          <Text extraLarge alignSelfCenter>
            Recommended Users
          </Text>
        </View>
        <Text>
          {loggedUser?.friends.length
            ? 'Friends: ' + loggedUser.friends.length
            : 'You have 0 friends... Add Friends!'}
        </Text>
        <View>
          {usersList.data.map((user: any) => {
            return <FriendListItem key={user.id} user={user} />;
          })}
        </View>
      </View>
    </Screen>
  );
};
