import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {sizes} from '../style/componentConstants';
import {colors} from '../style/palette';
import {Button} from './Button';
import {Spacer} from './Spacer';
import {Text} from './Text';
import {View} from './View';
import {AlertButtonsType} from '../hooks/useAlert';

export const Alert = ({
  title,
  message,
  buttons,
  onClose,
}: {
  title: string;
  message: string;
  buttons: AlertButtonsType;
  onClose?: () => void;
}) => {
  function handleOnAlertButtonPress(onPress: () => void) {
    onPress();
    if (onClose) {
      onClose();
    }
  }
  return (
    <View
      style={[
        S.default,
        {borderWidth: 2, borderColor: 'black', borderRadius: 6},
      ]}>
      <View alignItemsCenter>
        <Text>{title}</Text>
        <Spacer extraSmall />
        <Text>{message}</Text>
        <Spacer extraSmall />
      </View>
      {buttons &&
        buttons.map((button, index) => (
          <Fragment key={index}>
            <Button
              light={button.style === 'cancel'}
              backgroundColorError={button.style === 'destructive'}
              onPress={() => handleOnAlertButtonPress(button.onPress)}>
              {button.text}
            </Button>
            {index !== buttons.length - 1 && <Spacer extraSmall />}
          </Fragment>
        ))}
    </View>
  );
};

const S = StyleSheet.create({
  default: {
    width: '85%',
    borderRadius: 6,
    backgroundColor: colors.light,
    padding: sizes.medium,
  },
});
