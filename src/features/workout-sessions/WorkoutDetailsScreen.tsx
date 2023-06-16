import React from 'react';
import {Text} from '../../components/Text';
import {useWorkouts} from './fetch/useWorkouts';
import {Screen} from '../../components/Screen';

export const WorkoutDetailsScreen = () => {
  const {queryData} = useWorkouts();
  return (
    <Screen>
      <Text>{JSON.stringify(queryData)}</Text>
    </Screen>
  );
};
