import React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {ImageTransition} from '../../components/ImageTransition';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {useWorkoutCategories} from './fetch/useWorkoutCategories';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import _ from 'lodash';
import {Screen} from '../../components/Screen';

export const WorkoutsScreen = () => {
  const navigation =
    useNavigation<
      RootStackNavigationProps<'CreateWorkoutScreen'>['navigation']
    >();
  const {
    queryData: workoutCategoriesList,
    loading,
    error,
  } = useWorkoutCategories();
  return (
    <Screen preventScroll queryStatus={{loading, error}}>
      <View paddingLarge>
        <ScrollView showsVerticalScrollIndicator={false}>
          {workoutCategoriesList.map(category => {
            return (
              <Pressable
                key={category.name}
                onPress={() =>
                  navigation.navigate('CreateWorkoutScreen', {
                    workoutCategory: _.capitalize(category.name),
                  })
                }>
                <View paddingVerticalExtraSmall style={{position: 'relative'}}>
                  <ImageTransition source={category.image} />
                  <View
                    paddingMedium
                    alignItemsCenter
                    style={StyleSheet.absoluteFillObject}>
                    <Text colorOffWhite weightSemibold>
                      {category.name.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Screen>
  );
};
