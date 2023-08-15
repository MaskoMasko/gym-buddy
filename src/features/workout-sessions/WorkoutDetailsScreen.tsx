import {useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import {FlatList} from 'react-native';
import uuid from 'react-native-uuid';
import {Button} from '../../components/Button';
import {Divider} from '../../components/Divider';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {WorkoutListItem} from './WorkoutListItem';
import {useExercises} from './fetch/useExercises';

export const WorkoutDetailsScreen = () => {
  const params =
    useRoute<RootStackNavigationProps<'WorkoutDetailsScreen'>['route']>()
      .params;
  const navigation =
    useNavigation<
      RootStackNavigationProps<'WorkoutDetailsScreen'>['navigation']
    >();
  const {queryData, loading, error} = useExercises();
  function reduceByDuration(data: typeof queryData) {
    return _.reduce(
      data,
      (result, value) => {
        result += value.duration ?? 0;
        return result;
      },
      0,
    );
  }
  return (
    <Screen
      queryStatus={{loading, error}}
      withTopInsets
      withBottomInsets
      preventScroll>
      <View paddingHorizontalMedium style={{paddingBottom: 110}}>
        <FlatList
          data={queryData}
          keyExtractor={item => String(item.id ?? uuid.v4())}
          // ItemSeparatorComponent={() => <Spacer extraSmall />}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <WorkoutListItem exercise={item} />}
          ListHeaderComponent={() => (
            <View flex centerContent paddingVerticalLarge>
              <Text extraLarge weightMedium>
                Created workout
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View paddingMedium>
              <Divider />
              <Spacer extraSmall />
              <Text>
                Total time: {_.round(reduceByDuration(queryData) / 60)} minutes.
              </Text>
            </View>
          )}
        />
        <Divider />
        <Spacer extraSmall />
        <Button
          onPress={() =>
            navigation.navigate('WorkoutStartedScreen', {
              workoutCategory: params.workoutCategory,
            })
          }
          backgroundColorAccent>
          Start workout
        </Button>
      </View>
    </Screen>
  );
};
