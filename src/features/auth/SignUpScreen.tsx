import React, {useState} from 'react';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import {AuthStackNavigationProps} from '../../navigation/RouterTypes';
import {sizes} from '../../style/componentConstants';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  name: yup.string().required('Username is required'),
});

export const SignUpScreen = ({
  navigation,
  route,
}: AuthStackNavigationProps<'SignUpScreen'>) => {
  const email = route.params?.email;
  const isEmail = Boolean(email);
  const styles = useStyles();
  const {signup} = useAuth();
  const [formData, setFormData] = useState({
    email: email ?? '',
    password: 'test1234',
    name: 'this is my other name',
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
          Sign up
        </Text>
        <View marginSmall style={styles.backgroundLightDarkContainer}>
          <View marginVerticalMedium marginHorizontalExtraLarge>
            {isEmail ? (
              <>
                <Text colorWhite extraSmall>
                  Looks like you don't have an account.
                </Text>
                <Text colorWhite extraSmall>
                  Let's create a new account for{' '}
                  <Text weightSemibold colorWhite extraSmall>
                    {email}
                  </Text>
                </Text>
                {validationErrors.email && (
                  <Text colorRed extraSmall>
                    {validationErrors.email}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text colorWhite extraSmall>
                  Looks like you don't have an account. Let's create a new one.
                </Text>
              </>
            )}
            <Spacer extraSmall />
            <TextInput
              label={'Name'}
              value={formData.name}
              placeholder={'Enter username'}
              onChangeText={text => {
                setFormData({...formData, ['name']: text});
                if (validationErrors.name) {
                  setValidationErrors({
                    ...validationErrors,
                    ['name']: null,
                  });
                }
              }}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            {validationErrors.name && (
              <Text colorRed extraSmall>
                {validationErrors.name}
              </Text>
            )}
            {!isEmail && (
              <>
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
              </>
            )}
            <TextInput
              label={'Password'}
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
            <View marginVerticalSmall>
              <Text colorWhite extraSmall>
                By selecting Agree and continue below, I agree to{' '}
                <Text colorWhite extraSmall weightSemibold>
                  Terms of Service and Privacy Policy
                </Text>
              </Text>
            </View>
            <Button
              onPress={async () => {
                await signupSchema
                  .validate(formData, {abortEarly: false})
                  .then(async () => {
                    const response = await signup({...formData});
                    if (response?.data.userExists) {
                      setValidationErrors({
                        ...validationErrors,
                        email: response.data.message,
                      });
                      return;
                    }
                    if (response?.data.message) {
                      navigation.navigate('WelcomeScreen');
                    } else {
                      throw Error(
                        'Error while creating a user. Try again later!',
                      );
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
