import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {useUsersChatRooms} from './fetch/useUsersChatRooms';
import {Divider} from '../../components/Divider';

export const MessagesScreen = () => {
  const navigation =
    useNavigation<RootStackNavigationProps<'RootBottomTab'>['navigation']>();
  const userId = useAuth().loggedUser?.id;
  //                                                   o_o
  const {data, loading, error, refetch} = useUsersChatRooms(userId!);
  useFocusEffect(
    useCallback(() => {
      //needs to be wrapped in useCallback
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <Screen queryStatus={{loading, error}}>
      <View>
        {data.map(roomInfo => {
          return (
            <TouchableOpacity
              key={roomInfo.id}
              activeOpacity={0.7}
              paddingVerticalExtraSmall
              paddingHorizontalSmall
              style={[styles.paddingVertical, {backgroundColor: '#eeeeee'}]}
              onPress={() =>
                navigation.navigate('DirectMessagesScreen', {
                  roomName:
                    roomInfo.participants.length <= 2
                      ? roomInfo.participants.filter(
                          user => userId !== user.id,
                        )[0].name
                      : roomInfo.name,
                  roomId: roomInfo.id,
                })
              }>
              <View flexDirectionRow>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileScreen')}
                  style={styles.borderRadius}
                  paddingSmall>
                  <Image
                    source={require('../../assets/images/default-profile-img.png')}
                    style={styles.imageDimensions}
                  />
                </TouchableOpacity>
                <Spacer />
                <View justifyContentCenter>
                  {/* i need to do this better */}
                  <Text>
                    {roomInfo.participants.length <= 2
                      ? roomInfo.participants.filter(
                          user => userId !== user.id,
                        )[0].name
                      : roomInfo.name}
                  </Text>
                  <Text small weightLight>
                    {typeof roomInfo.lastMessage === 'string'
                      ? roomInfo.lastMessage
                      : roomInfo.lastMessage.text}
                  </Text>
                </View>
              </View>
              <Spacer small />
              <Divider />
            </TouchableOpacity>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  paddingVertical: {paddingVertical: 10},
  borderRadius: {borderRadius: 50},
  imageDimensions: {width: 45, height: 45},
});
