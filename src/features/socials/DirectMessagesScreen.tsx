import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {useMessages} from './fetch/useMessages';
import {TextInput} from '../../components/TextInput';
import {Button} from '../../components/Button';
import {useSendMessage} from './fetch/useSendMessage';
import {colors} from '../../style/palette';
import {ScreenNoScroll} from '../../components/ScreenNoScroll';
import {Spacer} from '../../components/Spacer';

const defaultImage = require('../../assets/images/default-profile-img.png');

export const DirectMessagesScreen = () => {
  const [messageText, setMessageText] = useState('');
  const navigation = useNavigation();
  const params =
    useRoute<RootStackNavigationProps<'DirectMessagesScreen'>['route']>()
      .params;
  useLayoutEffect(() => {
    if (params) {
      navigation.setOptions({title: params.roomName});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const messages = useMessages(params.roomId).store.messagesList;
  const {loggedUser} = useAuth();
  const {sendMessage, error, loading} = useSendMessage();
  return (
    <ScreenNoScroll withBottomInsets queryStatus={{error, loading}}>
      <FlatList
        style={{height: '90%'}}
        data={messages}
        keyExtractor={message => String(message.id)}
        renderItem={({item: message}) => {
          const isYourMessage = Boolean(message.senderId === loggedUser?.id);
          return (
            <View
              paddingHorizontalMedium
              paddingVerticalExtraSmall
              key={message.id}>
              <View
                flexDirectionRow
                flexDirectionRowReverse={isYourMessage}
                alignItemsCenter>
                <Image source={defaultImage} style={styles.imageDimensions} />
                <Spacer extraSmall />
                <View
                  paddingSmall
                  style={[
                    {
                      backgroundColor: isYourMessage
                        ? '#fafafa'
                        : colors.darkGray,
                    },
                    styles.message,
                  ]}>
                  <Text extraSmall colorOffWhite={!isYourMessage}>
                    {message.text}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View flexDirectionRow paddingSmall paddingHorizontalExtraLarge>
        <View flex>
          <TextInput
            label={'Send message...'}
            value={messageText}
            onChangeText={setMessageText}
          />
        </View>
        <View paddingVerticalSmall>
          <Button
            onPress={async () => {
              await sendMessage({roomId: params.roomId, message: messageText});
            }}>
            Send
          </Button>
        </View>
      </View>
    </ScreenNoScroll>
  );
};

const styles = StyleSheet.create({
  imageDimensions: {
    width: 25,
    height: 25,
    backgroundColor: colors.darkGray,
  },
  message: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    maxWidth: '90%',
  },
});
