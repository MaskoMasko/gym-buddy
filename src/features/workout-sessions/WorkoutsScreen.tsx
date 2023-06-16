import React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {ImageTransition} from '../../components/ImageTransition';
import {ScreenNoScroll} from '../../components/ScreenNoScroll';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {useWorkoutCategories} from './fetch/useWorkoutCategories';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import _ from 'lodash';

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
    <ScreenNoScroll queryStatus={{loading, error}}>
      <View paddingLarge>
        <ScrollView showsVerticalScrollIndicator={false}>
          {workoutCategoriesList.map(workout => {
            return (
              <Pressable
                key={workout.category}
                onPress={() =>
                  navigation.navigate('CreateWorkoutScreen', {
                    workoutCategory: _.capitalize(workout.category),
                  })
                }>
                <View paddingVerticalExtraSmall style={{position: 'relative'}}>
                  <ImageTransition source={workout.image} />
                  <View
                    paddingMedium
                    alignItemsCenter
                    style={StyleSheet.absoluteFillObject}>
                    <Text colorOffWhite weightSemibold>
                      {workout.category.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </ScreenNoScroll>
  );
};
