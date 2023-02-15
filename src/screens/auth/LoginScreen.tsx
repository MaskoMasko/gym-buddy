import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacityProps,
  useWindowDimensions,
} from 'react-native';
import {Button} from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {TextInput} from '../../components/TextInput';

export const LoginScreen = () => {
  const styles = useStyles();
  const buttonRef = useRef<null | TouchableOpacityProps>(null);
  const [value, setValue] = useState('');
  return (
    <Screen>
      <ImageBackground
        source={require('../../assets/images/login-background.jpg')}
        style={styles.image}
      />
      <View paddingHorizontalLarge>
        <Text colorWhite weightMedium extraLarge>
          Welcome to GymBuddy!
        </Text>
        <TextInput
          style={{backgroundColor: 'red'}}
          placeholder="This is eomthing"
          value={value}
          onChangeText={setValue}
          colorBeige
        />
        <View>
          <Button
            ref={buttonRef}
            onPress={() => console.log(buttonRef.current)}
          />
        </View>
      </View>
    </Screen>
  );
};

const useStyles = () => {
  const dimensions = useWindowDimensions();
  return StyleSheet.create({
    image: {
      position: 'absolute',
      width: dimensions.width,
      height: dimensions.height,
    },
  });
};
