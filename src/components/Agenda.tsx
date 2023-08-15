import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import React, {Fragment, useState} from 'react';
import {FlatList} from 'react-native';
import {Workout} from '../features/workout-sessions/fetch/useWorkout';
import {Divider} from './Divider';
import {IconButton} from './IconButton';
import {Text} from './Text';
import {View} from './View';

dayjs.extend(localeData);
export const Agenda = ({
  data,
  dates,
  renderItem,
}: {
  data: Workout[];
  dates: string[];
  renderItem: ({
    item,
    index,
  }: {
    item: Workout;
    index: number;
  }) => React.ReactNode;
}) => {
  const [displayMonth, setDisplayMonth] = useState(dayjs());
  const handleNextMonth = () => {
    setDisplayMonth(displayMonth.add(1, 'month'));
  };
  const handlePreviousMonth = () => {
    setDisplayMonth(displayMonth.subtract(1, 'month'));
  };
  const uniqueDates = [
    ...new Set(dates.map(date => dayjs(date).format('YYYY-MM-DD'))),
  ];
  return (
    <View paddingHorizontalMedium>
      <View flexDirectionRow paddingVerticalMedium>
        <IconButton iconName={'chevron-left'} onPress={handlePreviousMonth} />
        <View flex>
          <Text extraLarge alignSelfCenter>
            {displayMonth.format('MMMM') + '   ' + displayMonth.year()}
          </Text>
        </View>
        <IconButton iconName={'chevron-right'} onPress={handleNextMonth} />
      </View>
      <Divider />
      <FlatList
        data={uniqueDates}
        renderItem={({item, index}) => {
          const currentDate = dayjs(item);
          const currentWeekday = dayjs.weekdays()[currentDate.day()];
          const currentMonthShort = dayjs.monthsShort()[currentDate.month()];

          if (
            currentDate.month() !== displayMonth.month() ||
            currentDate.year() !== displayMonth.year()
          ) {
            return null;
          }
          return (
            <View>
              <View paddingVerticalSmall>
                <Text extraLarge weightLight>
                  {currentWeekday +
                    ', ' +
                    currentDate.date() +
                    ' ' +
                    currentMonthShort}
                </Text>
              </View>
              {data.map(workout => {
                const workoutDate = dayjs(workout.date);
                if (
                  workoutDate.date() === currentDate.date() &&
                  workoutDate.month() === currentDate.month() &&
                  workoutDate.year() === currentDate.year()
                ) {
                  return (
                    <Fragment key={workout.id}>
                      {renderItem({item: workout, index})}
                    </Fragment>
                  );
                }
                return null;
              })}
            </View>
          );
        }}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{paddingBottom: 300}} />}
      />
    </View>
  );
};
