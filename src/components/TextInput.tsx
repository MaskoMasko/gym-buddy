import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';
import React from 'react';
// import {withTextProps} from '../hoc/withTextProps';
import {colors} from '../style/palette';
import {fontSizes} from '../style/typography';
import {Text} from './Text';
import {View} from './View';

interface TextInputProps extends RNTextInputProps {
  label: string;
}

export const TextInput = ({label, placeholder, ...props}: TextInputProps) => {
  const isValueValid = Boolean(props.value?.length);
  const labelStyle: TextStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 6,
    fontSize: 13,
    color: colors.lightDark,
    zIndex: 2,
  } as const;
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
          {...props}
        />
      </View>
    );
  }
  return <RNTextInput style={styles.textContainer} {...props} />;
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
