import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import {Button} from '../../components/Button';
import {OrDivider} from '../../components/OrDivider';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Spacer} from '../../components/Spacer';
import {sizes} from '../../style/componentConstants';

export const LoginScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

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
          style={{fontSize: sizes.medium * 2}}
          alignSelfCenter>
          Welcome to GymBuddy!
        </Text>
        <View marginSmall style={styles.backgroundLightDarkContainer}>
          <View marginVerticalMedium marginHorizontalExtraLarge>
            <TextInput
              label={'Email'}
              value={email}
              placeholder={'Enter email'}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            <Button>Continue</Button>
            <OrDivider />
            <View marginVerticalSmall>
              <Button rightIconName={'google'} light>
                Continue with Google
              </Button>
              <Spacer extraSmall />
              <Button rightIconName={'apple'} light>
                Continue with Apple
              </Button>
            </View>
            <View flexDirectionRow>
              <Text extraSmall colorOffWhite>
                Don't have an account?{' '}
              </Text>
              <Text
                colorDisabled
                extraSmall
                onPress={() => {
                  navigation.navigate('SignUpScreen' as never);
                }}>
                Sign up
              </Text>
            </View>
            <Text colorDisabled extraSmall>
              Forgot your password?
            </Text>
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
