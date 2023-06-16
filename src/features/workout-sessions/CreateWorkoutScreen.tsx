import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '../../components/Button';
import {CheckBox} from '../../components/Checkbox';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {colors} from '../../style/palette';
import {Icon} from '../../svg/icons/Icon';
import {Workout, useWorkouts} from './fetch/useWorkouts';
import {useDropdown} from '../../hooks/useDropdown';

export const CreateWorkoutScreen = () => {
  const navigation =
    useNavigation<
      RootStackNavigationProps<'WorkoutDetailsScreen'>['navigation']
    >();
  const params =
    useRoute<RootStackNavigationProps<'CreateWorkoutScreen'>['route']>().params;
  useLayoutEffect(() => {
    if (params) {
      navigation.setOptions({title: params.workoutCategory + ' workout'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dummyData = {
    difficulty: ['beginner', 'amateur', 'intermediate', 'advanced'],
    duration: [15, 30, 45, 60],
    types: ['abs', 'chest', 'arms', 'legs'],
  };
  const [withEquipment, setWithEquipment] = useState<null | boolean>(null);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [workoutMuscleGroupList, setWorkoutMuscleGroupList] = useState([
    params.workoutCategory,
  ]);
  const [workoutQueryParams, setWorkoutQueryParams] = useState<null | Partial<
    Omit<Workout, 'type'> & {type: string | string[]}
  >>(null);
  const {createWorkout, error, loading} = useWorkouts();
  const {Dropdown: DifficultyDropdown} = useDropdown();
  const {Dropdown: DurationDropdown} = useDropdown();
  const {Dropdown: MuscleTypeDropdown, currentValue: muscleTypeValue} =
    useDropdown();
  return (
    <Screen withBottomInsets queryStatus={{loading, error}}>
      <View paddingSmall>
        <Text large>Difficulty:</Text>
        <View paddingVerticalSmall>
          <View paddingSmall style={styles.dropdownContainer}>
            {/* {Dropdown} */}
            <DifficultyDropdown
              data={dummyData.difficulty}
              textColor={colors.dark}
              keyExtractor={item => item}
              onChange={item => {
                setWorkoutQueryParams(prev => ({...prev, difficulty: item}));
                return item;
              }}
              placeholder={'Select Difficulty'}
              renderItem={item => (
                <Text style={styles.padding5} key={item}>
                  {item}
                </Text>
              )}
            />
          </View>
        </View>
        <Text large>Equipment \ Weights:</Text>
        <View flexDirectionRow centerContent paddingVerticalSmall>
          <Text>Yes</Text>
          <Spacer />
          <CheckBox
            checked={withEquipment ?? false}
            onPress={() => {
              setWithEquipment(prevState =>
                prevState === null ? true : !prevState,
              );
            }}
          />
          <Spacer />
          <Text>No</Text>
          <Spacer />
          <CheckBox
            checked={withEquipment !== null && !withEquipment}
            onPress={() => {
              setWithEquipment(prevState =>
                prevState === null ? false : !prevState,
              );
            }}
          />
          <Spacer />
        </View>
        <Text large>Duration (est.):</Text>
        <View paddingVerticalSmall>
          <View paddingSmall style={styles.dropdownContainer}>
            <DurationDropdown
              data={dummyData.duration}
              keyExtractor={item => String(item)}
              textColor={colors.dark}
              onChange={item => {
                setWorkoutQueryParams(prev => ({...prev, duration: item}));
                return String(item);
              }}
              placeholder={'Select Duration'}
              renderItem={item => (
                <Text style={styles.padding5} key={item}>
                  {item}
                </Text>
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowAdditionalOptions(prevState => !prevState)}
          activeOpacity={0.5}
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween>
          <Text>Additional options</Text>
          <Spacer>
            <Icon name="circle-plus" size={20} />
          </Spacer>
        </TouchableOpacity>
        {showAdditionalOptions && (
          <>
            <Text>Target muscle group: </Text>
            <Spacer extraSmall />
            <MuscleTypeDropdown
              data={dummyData.types}
              keyExtractor={item => item}
              onChange={item => {
                setWorkoutMuscleGroupList(prev => [...prev, item]);
                return item;
              }}
              textColor={colors.dark}
              placeholder={workoutMuscleGroupList}
              renderItem={item => (
                <Text style={styles.padding5} key={item}>
                  {item}
                </Text>
              )}
            />
          </>
        )}
        <Spacer extraSmall />
        <Button
          onPress={async () => {
            // setWorkoutQueryParams(prev => ({
            //   ...prev,
            //   equipment: withEquipment ?? undefined,
            // }));
            await createWorkout(
              {
                ...workoutQueryParams,
                type: muscleTypeValue ?? workoutMuscleGroupList,
                equipment: withEquipment !== null ? withEquipment : undefined,
              } ?? {},
            );
            setWorkoutQueryParams(null);
            setWithEquipment(null);
            navigation.navigate('WorkoutDetailsScreen');
          }}>
          Create workout session
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderRadius: 5,
    borderColor: colors.disabled,
    borderWidth: 1,
  },
  padding5: {
    padding: 5,
  },
});
