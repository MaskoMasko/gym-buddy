import React from 'react';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {FriendListItem} from './FriendListItem';
import {useUsersList} from './fetch/useUsersList';
import {Image, StyleSheet} from 'react-native';
import _ from 'lodash';

export const AddFriendsScreen = () => {
  const usersList = useUsersList();
  const {loggedUser} = useAuth();
  const usersThatAreNotFriends = _.differenceBy(
    usersList.queryData,
    [loggedUser, ...(loggedUser?.friends ?? [])],
    'id',
  );
  return (
    <Screen
      withTopInsets
      queryStatus={{loading: usersList.loading, error: usersList.error}}>
      <View paddingMedium>
        <View flex backgroundColorWhite style={styles.profileCard}>
          <Text>GymBuddy Profile</Text>
          <View flexDirectionRow alignItemsCenter style={styles.gap}>
            <Image
              source={require('../../assets/images/default-profile-img.png')}
              style={styles.profileImageSize}
            />
            <View>
              <Text>{loggedUser?.name}</Text>
              <Text>Workout buddies: {loggedUser?.friends.length}</Text>
              <Text>
                Program: Calisthenics
                {/* Bodybuilder, yoga, cardio idk, crossfit */}
              </Text>
            </View>
          </View>
        </View>
        <View paddingVerticalLarge>
          <Text extraLarge alignSelfCenter>
            Recommended Users
          </Text>
        </View>
        <View>
          {usersThatAreNotFriends.map(user => {
            return (
              <View key={user.id} paddingVerticalExtraSmall>
                <FriendListItem user={user} />
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: 10,
    backgroundColor: '#fafafa',
    padding: 20,
    shadowColor: '#000',
    gap: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gap: {gap: 20},
  profileImageSize: {width: 75, height: 75},
});
