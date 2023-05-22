import React, {ReactNode, useState} from 'react';
import {View} from './View';
import {Text} from './Text';
import {Pressable, ScrollView} from 'react-native';

export const Dropdown = <T extends unknown>({
  placeholder,
  data,
  renderItem,
  keyExtractor,
  onChange,
}: {
  placeholder: string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  onChange: (item: T) => string;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState(placeholder);
  return (
    <View>
      <Text colorOffWhite onPress={() => setIsDropdownOpen(true)}>
        {value}
      </Text>
      {isDropdownOpen && (
        <ScrollView>
          {data.map(item => (
            <React.Fragment key={keyExtractor(item)}>
              <Pressable
                onPress={() => {
                  const selectedValue = onChange(item);
                  setValue(selectedValue);
                  setIsDropdownOpen(false);
                }}>
                {renderItem(item)}
              </Pressable>
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
