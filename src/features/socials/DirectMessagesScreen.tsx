import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';

const userMessages = [
  {
    text: 'This',
    userImage: require('../../assets/images/default-profile-img.png'),
    user: 'me',
  },
  {
    text: 'This is',
    userImage: require('../../assets/images/default-profile-img.png'),
    user: 'you',
  },
  {
    text: 'This is my',
    userImage: require('../../assets/images/default-profile-img.png'),
    user: 'me',
  },
  {
    text: 'This is my thing',
    userImage: require('../../assets/images/default-profile-img.png'),
    user: 'me',
  },
];

export const DirectMessagesScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params as {userName: string};
  useLayoutEffect(() => {
    if (params) {
      navigation.setOptions({title: params.userName});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [whoAreYou, setWhoAreYou] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(userMessages);
  return (
    <Screen>
      <View marginLarge flex>
        <Text extraLarge onPress={() => setWhoAreYou(!whoAreYou)}>
          {whoAreYou ? 'me' : 'you'}
        </Text>
        <View>
          {messages.map(message => {
            return (
              <View
                key={message.text}
                flexDirectionRow={message.user === 'you'}
                flexDirectionRowReverse={message.user === 'me'}
                backgroundColorLightDark={message.user === 'you'}
                backgroundColorTheme={message.user === 'me'}>
                <Image
                  source={message.userImage}
                  style={styles.imageDimensions}
                />
                <Spacer />
                <Text>{message.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <TextInput
        label={'Send message...'}
        value={messageText}
        onChangeText={setMessageText}
        onSubmitEditing={() => {
          if (messageText !== '') {
            setMessages(prevMessages => [
              ...prevMessages,
              {
                text: messageText,
                userImage: require('../../assets/images/default-profile-img.png'),
                user: whoAreYou ? 'me' : 'you',
              },
            ]);
            setMessageText('');
          }
        }}
      />
      <Spacer />
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageDimensions: {width: 20, height: 20},
});
