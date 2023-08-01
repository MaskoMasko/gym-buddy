import {useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '../../components/Button';
import {CheckBox} from '../../components/Checkbox';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {useDropdown} from '../../hooks/useDropdown';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {EXERCISE_DIFFICULTIES, EXERCISE_DURATIONS} from '../../store/constants';
import {colors} from '../../style/palette';
import {Icon} from '../../svg/icons/Icon';
import {ExerciseParams, useExercises} from './fetch/useExercises';
import {useWorkoutCategories} from './fetch/useWorkoutCategories';

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
  const [withEquipment, setWithEquipment] = useState<null | boolean>(null);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const {
    queryData: categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useWorkoutCategories();
  const [workoutQueryParams, setWorkoutQueryParams] =
    useState<null | ExerciseParams>(null);
  const {
    createWorkout,
    error: workoutError,
    loading: workoutLoading,
  } = useExercises();
  const {Dropdown: DifficultyDropdown} = useDropdown();
  const {Dropdown: DurationDropdown} = useDropdown();
  const {Dropdown: MuscleTypeDropdown, currentValue: muscleTypesList} =
    useDropdown();
  const initialMuscleTypeListValue = [params.workoutCategory];
  const equipmentParam =
    withEquipment !== null ? {equipment: withEquipment} : {};
  const categoryIdsList = (
    (typeof muscleTypesList === 'string'
      ? [muscleTypesList]
      : muscleTypesList) ?? initialMuscleTypeListValue
  ).map(type => {
    const categoryFound = categories.find(category => category.name === type);
    if (categoryFound) {
      return categoryFound.id;
    }
  });
  return (
    <Screen
      withBottomInsets
      queryStatus={{
        loading: workoutLoading || categoriesLoading,
        error: workoutError || categoriesError,
      }}>
      <View paddingSmall>
        <Text large>Difficulty:</Text>
        <View paddingVerticalSmall>
          <View paddingSmall style={styles.dropdownContainer}>
            {/* {Dropdown} */}
            <DifficultyDropdown
              data={EXERCISE_DIFFICULTIES}
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
              data={EXERCISE_DURATIONS}
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
              data={categories}
              keyExtractor={item => String(item.id)}
              onChange={item => {
                return item.name;
              }}
              textColor={colors.dark}
              placeholder={initialMuscleTypeListValue}
              renderItem={item => (
                <Text style={styles.padding5} key={item.id}>
                  {item.name}
                </Text>
              )}
            />
          </>
        )}
        <Spacer extraSmall />
        <Button
          onPress={async () => {
            await createWorkout({
              ...workoutQueryParams,
              ...equipmentParam,
              categoryIds: _.filter(categoryIdsList, _.isNumber),
            });
            setWorkoutQueryParams(null);
            setWithEquipment(null);
            navigation.navigate('WorkoutDetailsScreen', {
              workoutCategory: params.workoutCategory,
            });
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
