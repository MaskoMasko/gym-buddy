import React, {useState} from 'react';
import {Agenda} from '../../components/Agenda';
import {Button} from '../../components/Button';
import {Calendar} from '../../components/Calendar';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {useWorkout} from '../workout-sessions/fetch/useWorkout';

export const StatisticsScreen = () => {
  const [isCalendarDisplayed, setIsCalendarDisplayed] = useState(true);

  const toggleCalendar = () => {
    setIsCalendarDisplayed(!isCalendarDisplayed);
  };

  const {workoutsList, loading, error} = useWorkout();

  const workoutDatesList = (workoutsList.data ?? []).map(
    workout => workout.date,
  );

  return (
    <Screen
      withBottomInsets
      withTopInsets
      preventScroll
      queryStatus={{loading, error}}>
      <View flexDirectionRow paddingMedium>
        <Button
          onPress={toggleCalendar}
          flex
          backgroundColorTheme={isCalendarDisplayed}
          backgroundColorLightSoft={!isCalendarDisplayed}>
          Calendar
        </Button>
        <Spacer />
        <Button
          onPress={toggleCalendar}
          flex
          backgroundColorTheme={!isCalendarDisplayed}
          backgroundColorLightSoft={isCalendarDisplayed}>
          Agenda
        </Button>
      </View>
      {isCalendarDisplayed ? (
        <Calendar
          dates={workoutDatesList}
          data={workoutsList.data}
          renderItem={({item}) => (
            <View>
              <Text>Completed: {item.completed}</Text>
              <Text>Duration: {item.duration}</Text>
              <Text>Est. Duration: {item.est_duration}</Text>
            </View>
          )}
        />
      ) : (
        <Agenda
          dates={workoutDatesList}
          data={workoutsList.data}
          renderItem={({item}) => (
            <>
              <View
                flexDirectionRow
                justifyContentSpaceBetween
                backgroundColorLightSoft
                paddingMedium
                style={{borderRadius: 3}}>
                <Text>
                  {item.completed ? 'Completed!' : 'Not Completed...'}
                </Text>
                <Text>Duration: {item.duration} min</Text>
              </View>
              <Spacer extraSmall />
            </>
          )}
        />
      )}
    </Screen>
  );
};
