import React, {ReactNode, useState} from 'react';
import {View} from './../components/View';
import {Text} from './../components/Text';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {colors} from '../style/palette';
import {Icon} from '../svg/icons/Icon';
import {TouchableOpacity} from './../components/TouchableOpacity';
import {Divider} from './../components/Divider';
import {Spacer} from './../components/Spacer';
import _ from 'lodash';
import {IconButton} from './../components/IconButton';

export const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<null | string | string[]>(
    null,
  );
  const renderDropdown = <T extends unknown>({
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
    const value = currentValue ?? placeholder;
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
                        iconName="close"
                        iconSize={15}
                        iconColor={colors.darkGray}
                        onPress={() => {
                          setCurrentValue(
                            (value as string[]).filter(
                              prevOpt => prevOpt !== option,
                            ),
                          );
                        }}>
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
                    setCurrentValue(
                      _.isArray(value)
                        ? [...new Set([...value, selectedValue])]
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
                    {/* to string to avoid == */}
                    {String(item) === String(value) && (
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
  return {
    currentValue,
    Dropdown: renderDropdown,
  };
};

const styles = StyleSheet.create({
  multipleOptionsOptionBox: {
    borderRadius: 5,
    borderColor: colors.disabled,
    borderWidth: 1,
  },
  optionText: {padding: 5},
});
