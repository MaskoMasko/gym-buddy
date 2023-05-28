import React, {ReactNode, useState} from 'react';
import {View} from './View';
import {Text} from './Text';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {colors} from '../style/palette';
import {Icon} from '../svg/icons/Icon';
import {TouchableOpacity} from './TouchableOpacity';
import {Divider} from './Divider';
import {Spacer} from './Spacer';
import _ from 'lodash';
import {IconButton} from './IconButton';

export const Dropdown = <T extends unknown>({
  placeholder,
  data,
  renderItem,
  keyExtractor,
  onChange,
  textColor = colors.light,
}: {
  placeholder: string[] | string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  onChange: (item: T) => string;
  textColor?: string;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState(placeholder);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(prevState => !prevState)}
        activeOpacity={0.5}
        flexDirectionRow
        justifyContentSpaceBetween
        alignItemsCenter>
        <Text style={[styles.optionText, {color: textColor}]}>
          {_.isArray(value) ? (
            <>
              {value.map(option => (
                <View paddingExtraSmall key={option}>
                  <View
                    style={styles.multipleOptionsOptionBox}
                    justifyContentSpaceBetween
                    paddingSmall
                    flexDirectionRow
                    alignItemsCenter>
                    <IconButton
                      name="close"
                      size={15}
                      color={colors.darkGray}
                      onPress={() =>
                        setValue(prevState =>
                          (prevState as string[]).filter(
                            prevOpt => prevOpt !== option,
                          ),
                        )
                      }>
                      {option}
                    </IconButton>
                  </View>
                </View>
              ))}
            </>
          ) : (
            value
          )}
        </Text>
        <Icon
          name={isDropdownOpen ? 'arrow-up' : 'arrow-down'}
          color={colors.disabled}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <ScrollView>
          {data.map(item => (
            <React.Fragment key={keyExtractor(item)}>
              <Pressable
                onPress={() => {
                  const selectedValue = onChange(item);
                  setValue(prevState =>
                    _.isArray(prevState)
                      ? [...new Set([...prevState, selectedValue])]
                      : selectedValue,
                  );
                  setIsDropdownOpen(false);
                }}>
                <Divider color={colors.disabled} />
                <View
                  alignItemsCenter
                  justifyContentSpaceBetween
                  flexDirectionRow>
                  {renderItem(item)}
                  {item === String(value) && (
                    <Spacer>
                      <Icon name={'checkmark'} size={16} />
                    </Spacer>
                  )}
                </View>
              </Pressable>
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  multipleOptionsOptionBox: {
    borderRadius: 5,
    borderColor: colors.disabled,
    borderWidth: 1,
  },
  optionText: {padding: 5},
});
