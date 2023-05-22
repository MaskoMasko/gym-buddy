import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScreenNoScroll} from '../../components/ScreenNoScroll';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {WorkoutDetailsListItem} from './WorkoutDetailsListItem';
import {useWorkouts} from './fetch/useWorkouts';

//TODO: REDESIGN!!!
export const WorkoutDetailsScreen = () => {
  const navigation = useNavigation();
  const params =
    useRoute<RootStackNavigationProps<'WorkoutDetailsScreen'>['route']>()
      .params;
  useLayoutEffect(() => {
    if (params) {
      navigation.setOptions({title: params.workoutCategory});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //                                                       read from params
  const {queryData: workoutsList, loading, error} = useWorkouts('Abs');
  // const [filters, setFilters] = useState({
  //   difficulty: '',
  //   duration: '',
  // });
  return (
    <ScreenNoScroll queryStatus={{loading, error}} withBottomInsets>
      {/* <View flexDirectionRow justifyContentSpaceAround>
        <View flexDirectionRow>
          <Text>Difficulty: </Text>
          <Dropdown
            placeholder="Select difficulty"
            data={['beginner', 'intermediate', 'advanced']}
            keyExtractor={() => Math.random().toString()}
            renderItem={item => <Text>{item}</Text>}
            onChange={item => {
              const returnItem = item;
              setFilters(prevValues => ({
                ...prevValues,
                difficulty: returnItem,
              }));
              return returnItem;
            }}
          />
        </View>
        <View flexDirectionRow>
          <Text>Duration: </Text>
          <Dropdown
            placeholder="Select workout duration"
            data={[15, 30, 45, 60]}
            keyExtractor={item => String(item)}
            renderItem={item => <Text>{item}</Text>}
            onChange={item => {
              const returnItem = String(item);
              setFilters(prevValues => ({
                ...prevValues,
                duration: returnItem,
              }));
              return returnItem;
            }}
          />
        </View>
      </View> */}
      {/* list of workouts */}
      <FlatList
        data={workoutsList}
        keyExtractor={item => String(item.id)}
        renderItem={({item: workout}) => {
          return <WorkoutDetailsListItem workout={workout} />;
        }}
        ListHeaderComponent={() => (
          <View paddingHorizontalMedium paddingVerticalSmall flexDirectionRow>
            <TouchableOpacity
              flex
              paddingSmall
              centerContent
              style={styles.filterButton}>
              <Text>Sort By</Text>
            </TouchableOpacity>
            <Spacer small />
            <TouchableOpacity
              flex
              paddingSmall
              centerContent
              style={styles.filterButton}>
              <Text>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScreenNoScroll>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    borderRadius: 20,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
