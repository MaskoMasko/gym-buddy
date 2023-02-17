import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
// import {withTextProps} from '../hoc/withTextProps';
import {colors} from '../style/palette';
import {fontSizes} from '../style/typography';
import {Text} from './Text';
import {View} from './View';

interface TextInputProps extends RNTextInputProps {
  label: string;
  password?: boolean;
}

export const TextInput = ({
  label,
  placeholder,
  password,
  ...props
}: TextInputProps) => {
  const isValueValid = Boolean(props.value?.length);
  const isPassword = password;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const labelStyle: TextStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 6,
    fontSize: 13,
    color: colors.lightDark,
    zIndex: 2,
  } as const;
  const rightIcon: TextStyle = {
    position: 'absolute',
    top: '50%',
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    fontSize: 15,
    // kinda hardcoded
    transform: [{translateY: -10}],
    color: isPasswordVisible ? colors.lightDark : colors.disabled,
    zIndex: 2,
  };
  if (label && label.length) {
    return (
      <View style={styles.relative}>
        {isValueValid && (
          <Text weightLight style={labelStyle}>
            {label}
          </Text>
        )}
        <RNTextInput
          style={[styles.textContainer, styles.textInputPaddingTop]}
          placeholder={placeholder ?? label}
          secureTextEntry={isPassword && isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <Text
            style={rightIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        )}
      </View>
    );
  }
  return (
    <RNTextInput
      style={styles.textContainer}
      secureTextEntry={isPassword}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 5,
    marginVertical: 5,
    fontFamily: 'Kanit-Light',
    color: colors.dark,
    fontSize: fontSizes.extraSmall,
  },
  relative: {
    position: 'relative',
  },
  textInputPaddingTop: {paddingTop: 15},
});
