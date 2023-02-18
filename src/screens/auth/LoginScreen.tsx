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
import useAuth from '../../hooks/useAuth';
import {AuthStackNavigationProps} from '../../navigation/RouterTypes';
import {sizes} from '../../style/componentConstants';
import {colors} from '../../style/palette';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const LoginScreen = ({
  route,
}: AuthStackNavigationProps<'LoginScreen'>) => {
  const styles = useStyles();
  const {email, username} = route.params;
  const {setIsLoggedIn, login} = useAuth();
  const [formData, setFormData] = useState({
    email: email,
    password: 'test1234',
  });
  const [validationErrors, setValidationErrors] = useState<Record<any, any>>(
    {},
  );

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
                  {username}
                </Text>
                <Text extraSmall colorWhite>
                  {email}
                </Text>
              </View>
            </View>
            <TextInput
              label={'password'}
              value={formData.password}
              placeholder={'Enter password'}
              onChangeText={text => {
                setFormData({...formData, ['password']: text});
                if (validationErrors.password) {
                  setValidationErrors({
                    ...validationErrors,
                    ['password']: null,
                  });
                }
              }}
              autoCorrect={false}
              autoCapitalize={'none'}
              password
            />
            {validationErrors.password && (
              <Text colorRed extraSmall>
                {validationErrors.password}
              </Text>
            )}
            <Spacer extraSmall />
            <Button
              onPress={async () => {
                await loginSchema
                  .validate(formData, {abortEarly: false})
                  .then(async () => {
                    const response = await login({
                      email,
                      password: formData.password,
                    });
                    if (response?.data.message) {
                      setIsLoggedIn(true);
                    }
                  })
                  .catch(err => {
                    const errors = {};
                    err.inner.forEach((error: any) => {
                      (errors as any)[(error as any).path] = error.message;
                    });
                    setValidationErrors(errors);
                  });
              }}>
              Continue
            </Button>
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
