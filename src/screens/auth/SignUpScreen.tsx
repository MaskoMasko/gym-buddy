import React, {useState} from 'react';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import {sizes} from '../../style/componentConstants';
import {useNavigation} from '@react-navigation/native';

export const SignUpScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Screen preventScroll>
      <ImageBackground
        source={require('../../assets/images/login-background.jpg')}
        style={styles.image}
      />
      <View justifyContentCenter flex>
        <Text
          colorWhite
          weightMedium
          style={{fontSize: sizes.medium * 2, paddingLeft: sizes.large}}>
          Sign up
        </Text>
        <View marginSmall style={styles.backgroundLightDarkContainer}>
          <View marginVerticalMedium marginHorizontalExtraLarge>
            <Text colorWhite extraSmall>
              Looks like you don't have an account.
            </Text>
            <Text colorWhite extraSmall>
              Let's create a new account for{' '}
              <Text weightSemibold colorWhite extraSmall>
                something@gmail.com
              </Text>
            </Text>
            <Spacer extraSmall />
            <TextInput
              label={'Name'}
              value={name}
              placeholder={'Enter username'}
              onChangeText={setName}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            <TextInput
              label={'Password'}
              value={password}
              placeholder={'Enter password'}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize={'none'}
              password
            />
            <View marginVerticalSmall>
              <Text colorWhite extraSmall>
                By selecting Agree and continue below, I agree to{' '}
                <Text colorWhite extraSmall weightSemibold>
                  Terms of Service and Privacy Policy
                </Text>
              </Text>
            </View>
            <Button onPress={() => navigation.navigate('LoginScreen')}>
              Agree and continue
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const useStyles = () => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    image: {
      position: 'absolute',
      width: dimensions.width,
      height: dimensions.height + insets.bottom + insets.top,
    },
    backgroundLightDarkContainer: {
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0, .6)',
    },
  });
};
