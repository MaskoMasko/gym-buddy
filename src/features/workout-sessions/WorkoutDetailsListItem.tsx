import React, {useState} from 'react';
import {Workout} from './fetch/useWorkouts';
import {View} from '../../components/View';
import {Text} from '../../components/Text';
import _ from 'lodash';
import {Dropdown} from '../../components/Dropdown';

//TODO: rename ovo
export const WorkoutDetailsListItem = ({workout}: {workout: Workout}) => {
  const [selectedItem, setSelectedItem] = useState<
    ({duration: number} & Omit<Workout, 'duration'>) | undefined
  >(undefined);
  return (
    <View paddingHorizontalLarge paddingVerticalExtraSmall>
      <View
        backgroundColorDarkGray
        paddingHorizontalMedium
        paddingVerticalLarge
        style={{borderRadius: 15}}>
        <View flexDirectionRow justifyContentSpaceBetween>
          <Text colorOffWhite>{workout.type}</Text>
          <Text colorOffWhite>{_.capitalize(workout.difficulty)}</Text>
        </View>
        <View flexDirectionRow>
          <Text colorOffWhite>Duration: </Text>
          <Dropdown
            data={workout.duration}
            keyExtractor={duration => String(duration)}
            renderItem={duration => (
              <Text colorOffWhite key={duration}>
                {duration}
              </Text>
            )}
            placeholder={String(
              selectedItem?.duration ??
                workout.duration[Math.floor(workout.duration.length / 2)],
            )}
            onChange={duration => {
              setSelectedItem({...workout, duration});
              return String(duration);
            }}
          />
        </View>
        <Text colorOffWhite>Equipment: {workout.equipment}</Text>
      </View>
    </View>
  );
};
