import dayjs, {Dayjs} from 'dayjs';
import React, {useCallback, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {IconButton} from './IconButton';
import {Spacer} from './Spacer';
import {Text} from './Text';
import {View} from './View';
import uuid from 'react-native-uuid';
import localeData from 'dayjs/plugin/localeData';
import {Workout} from '../features/workout-sessions/fetch/useWorkout';

export const Calendar = ({
  dates,
  data,
  renderItem,
}: {
  dates: string[];
  data: Workout[];
  renderItem: ({
    item,
    index,
  }: {
    item: Workout;
    index: number;
  }) => React.ReactNode;
}) => {
  const dimensions = useWindowDimensions();

  const getDaysOfTheMonth = useCallback((displayMonth: Dayjs) => {
    dayjs.extend(localeData);

    const currentMonth = dayjs(displayMonth);
    const daysInMonth = currentMonth.daysInMonth();
    const startingDay = currentMonth.startOf('month').day();
    const endingDay = 6 - currentMonth.endOf('month').day();

    const lastDaysOfPreviousMonth: {
      month: number;
      day: number;
      year: number;
    }[] = [];
    for (const day of Array.from({length: startingDay}, (_, i) => i + 1)) {
      lastDaysOfPreviousMonth.push({
        month: dayjs(currentMonth.date(1)).subtract(day, 'day').month(),
        day: dayjs(currentMonth.date(1)).subtract(day, 'day').date(),
        year: dayjs(currentMonth.date(1)).subtract(day, 'day').year(),
      });
    }
    const firstDaysOfNextMonth: {month: number; day: number; year: number}[] =
      [];
    for (const day of Array.from({length: endingDay}, (_, i) => i + 1)) {
      firstDaysOfNextMonth.push({
        month: dayjs(currentMonth).endOf('month').add(day, 'day').month(),
        day: dayjs(currentMonth).endOf('month').add(day, 'day').date(),
        year: dayjs(currentMonth).endOf('month').add(day, 'day').year(),
      });
    }
    const daysList = [
      //reverse because we get them in reversed order
      ...lastDaysOfPreviousMonth.reverse(),
      ...Array.from({length: daysInMonth}, (_, i) => ({
        month: currentMonth.month(),
        day: i + 1,
        year: currentMonth.year(),
      })),
      ...firstDaysOfNextMonth,
    ];
    return {
      daysList,
      startingDay,
      endingDay: daysList.length - 1 - endingDay,
    };
  }, []);

  const [displayMonth, setDisplayMonth] = useState(dayjs());
  const {daysList, startingDay, endingDay} = getDaysOfTheMonth(displayMonth);
  const handleNextMonth = () => {
    setDisplayMonth(prev =>
      prev.month() === 11 ? prev.add(1, 'year').month(0) : prev.add(1, 'month'),
    );
  };
  const handlePreviousMonth = () => {
    setDisplayMonth(prev =>
      prev.month() === 0
        ? prev.subtract(1, 'year').month(11)
        : prev.subtract(1, 'month'),
    );
  };

  const [selectedDay, setSelectedDay] = useState(dayjs());
  //TODO: may cause some bugs later on, but currently can't reproduce bug
  const handleSelectDay = (date: {
    day: number;
    month: number;
    year: number;
  }) => {
    setSelectedDay(dayjs().year(date.year).month(date.month).date(date.day));
    if (
      (selectedDay.month() === date.month + 1 ||
        selectedDay.year() === date.year + 1) &&
      daysList.some(
        _date =>
          _date.day === selectedDay.date() &&
          _date.month === selectedDay.month() &&
          _date.year === selectedDay.year(),
      )
    ) {
      handlePreviousMonth();
    }
    if (
      (selectedDay.month() === date.month - 1 ||
        selectedDay.year() === date.year - 1) &&
      daysList.some(
        _date =>
          _date.day === selectedDay.date() &&
          _date.month === selectedDay.month() &&
          _date.year === selectedDay.year(),
      )
    ) {
      handleNextMonth();
    }
  };

  const daysInAWeek = dayjs.weekdaysShort();
  const datesToDayjsDates = dates.map(date => dayjs(date));

  return (
    <View style={{backgroundColor: '#ededed'}} paddingVerticalSmall>
      <View flexDirectionRow paddingHorizontalExtraLarge>
        <IconButton iconName={'chevron-left'} onPress={handlePreviousMonth} />
        <View flex>
          <Text alignSelfCenter>
            {displayMonth.format('MMMM') + '   ' + displayMonth.year()}
          </Text>
        </View>
        <IconButton iconName={'chevron-right'} onPress={handleNextMonth} />
      </View>
      <Spacer small />
      <View flexDirectionRow>
        {daysInAWeek.map(day => (
          <Text
            style={{
              width: dimensions.width / daysInAWeek.length,
              textAlign: 'center',
            }}
            key={day}>
            {day}
          </Text>
        ))}
      </View>
      <Spacer extraSmall />
      <View flexDirectionRow flexWrap>
        {daysList.map((date, id) => (
          <Text
            style={{
              width: dimensions.width / daysInAWeek.length,
              textAlign: 'center',
              padding: 7,
              backgroundColor:
                selectedDay.date() === date.day &&
                selectedDay.month() === date.month &&
                selectedDay.year() === date.year
                  ? 'blue'
                  : datesToDayjsDates.some(
                      listDate =>
                        listDate.year() === date.year &&
                        listDate.month() === date.month &&
                        listDate.date() === date.day,
                    )
                  ? 'red'
                  : undefined,
            }}
            key={date.day + String(uuid.v4())}
            colorBlue={id < startingDay || id > endingDay}
            onPress={() => handleSelectDay(date)}
            small>
            {date.day}
          </Text>
        ))}
      </View>
      <View>
        {data.map((item, index) => (
          <View key={item.id}>
            {dayjs(item.date).year() === selectedDay.year() &&
              dayjs(item.date).month() === selectedDay.month() &&
              dayjs(item.date).date() === selectedDay.date() &&
              renderItem({item, index})}
          </View>
        ))}
      </View>
    </View>
  );
};
