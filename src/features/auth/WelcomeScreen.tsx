import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {Button} from '../../components/Button';
import {OrDivider} from '../../components/OrDivider';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {sizes} from '../../style/componentConstants';

const welcomeSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export const WelcomeScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({email: __DEV__ ? 'm@m.com' : ''});
  const [validationErrors, setValidationErrors] = useState<Record<any, any>>(
    {},
  );
  const {login} = useAuth();

  return (
    <Screen>
      <ImageBackground
        source={require('../../assets/images/login-background.jpg')}
        style={styles.image}
      />
      <View justifyContentCenter paddingHorizontalExtraLarge flex>
        <Text
          colorWhite
          weightMedium
          style={{fontSize: sizes.medium * 2}}
          alignSelfCenter>
          Welcome to GymBuddy!
        </Text>
        <View paddingSmall style={styles.backgroundLightDarkContainer}>
          <View paddingVerticalMedium paddingHorizontalExtraLarge>
            <TextInput
              label={'Email'}
              value={formData.email}
              placeholder={'Enter email'}
              onChangeText={text => {
                setFormData({...formData, ['email']: text});
                if (validationErrors.email) {
                  setValidationErrors({
                    ...validationErrors,
                    ['email']: null,
                  });
                }
              }}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            {validationErrors.email && (
              <Text colorRed extraSmall>
                {validationErrors.email}
              </Text>
            )}
            <Spacer extraSmall />
            <Button
              onPress={async () => {
                await welcomeSchema
                  .validate(formData, {abortEarly: false})
                  .then(async () => {
                    const response = await login({email: formData.email});
                    if (response?.data.user) {
                      if (!response.data.user.emailVerified) {
                        setValidationErrors({email: 'Email is not verified'});
                      } else {
                        navigation.navigate('LoginScreen', {
                          email: formData.email,
                          username: response.data.user.name,
                        });
                      }
                    } else {
                      navigation.navigate('SignUpScreen', {
                        email: formData.email,
                      });
                    }
                  })
                  .catch((err: any) => {
                    const errors = {};
                    err.inner.forEach((error: any) => {
                      (errors as any)[(error as any).path] = error.message;
                    });
                    setValidationErrors(errors);
                  });
              }}>
              Continue
            </Button>
            <OrDivider />
            <View paddingVerticalSmall>
              <Button rightIconName={'google'} light>
                Continue with Google
              </Button>
              <Spacer extraSmall />
              <Button rightIconName={'apple'} light>
                Continue with Apple
              </Button>
            </View>
            <Spacer small />
            <View flexDirectionRow>
              <Text extraSmall colorOffWhite>
                Don't have an account?{' '}
              </Text>
              <Text
                colorDisabled
                extraSmall
                onPress={() => {
                  navigation.navigate('SignUpScreen');
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
