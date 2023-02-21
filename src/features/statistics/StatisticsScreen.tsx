import React from 'react';
import {Screen} from '../../components/Screen';
import {View} from '../../components/View';
import {Text} from '../../components/Text';
import {useNavigation} from '@react-navigation/native';

export const StatisticsScreen = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <View>
        <Text onPress={() => navigation.navigate('MessagesScreen')}>
          This is Statistics screen!
        </Text>
      </View>
    </Screen>
  );
};
