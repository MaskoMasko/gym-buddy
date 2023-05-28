import React from 'react';
import {GestureResponderEvent, ViewStyle} from 'react-native';
import {TouchableOpacity} from './TouchableOpacity';
import {colors as C} from '../style/palette';
import Svg, {Path} from 'react-native-svg';

interface CheckBoxProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string;
  disabled?: boolean;
  checked: boolean;
  size?: number;
}

export const CheckBox = ({
  onPress,
  color = C.dark,
  disabled = false,
  checked,
  size = 20,
}: CheckBoxProps) => {
  const checkBoxStyle: ViewStyle = {
    borderRadius: 2,
    backgroundColor: disabled ? C.disabled : checked ? color : 'transparent',
    borderColor: C.dark,
    borderWidth: 2,
    width: size,
    height: size,
  };
  return (
    <TouchableOpacity onPress={onPress} style={checkBoxStyle} centerContent>
      {checked && (
        <Svg width={12} height={10} fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.91 7.496 1.707 5.293A1 1 0 0 0 .293 6.707l3 3a1 1 0 0 0 1.493-.09l7-8A1 1 0 1 0 10.214.383L3.91 7.496Z"
            fill={C.light}
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};
