import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import {sizes} from '../../style/componentConstants';
import {colors} from '../../style/palette';
import useAuth from '../../hooks/useAuth';

export const LoginScreen = () => {
  const styles = useStyles();
  const {setIsLoggedIn} = useAuth();
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
          style={{fontSize: sizes.medium * 2, paddingLeft: sizes.large}}>
          Login
        </Text>
        <View marginSmall style={styles.backgroundLightDarkContainer}>
          <View marginVerticalMedium marginHorizontalExtraLarge>
            <View flex flexDirectionRow marginVerticalSmall>
              <Image
                source={require('../../assets/images/default-profile-img.png')}
                style={styles.userProfileImage}
              />
              <Spacer small />
              <View>
                <Text extraSmall weightSemibold colorWhite>
                  Masko Masko
                </Text>
                <Text extraSmall colorWhite>
                  masko.masko@gmail.com
                </Text>
              </View>
            </View>
            <TextInput
              label={'Email'}
              value={email}
              placeholder={'Enter email'}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            <Spacer extraSmall />
            <Button onPress={() => setIsLoggedIn(true)}>Continue</Button>
            <Spacer small />
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
    userProfileImage: {
      borderRadius: 50,
      width: 50,
      height: 50,
      backgroundColor: colors.disabled,
    },
  });
};
