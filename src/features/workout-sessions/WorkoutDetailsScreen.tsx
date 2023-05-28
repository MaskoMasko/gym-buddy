import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {Button} from '../../components/Button';
import {CheckBox} from '../../components/Checkbox';
import {Dropdown} from '../../components/Dropdown';
import {Screen} from '../../components/Screen';
import {colors} from '../../style/palette';
import {Icon} from '../../svg/icons/Icon';

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
  const [withEquipment, setWithEquipment] = useState(true);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [workoutMuscleGroupList, _] = useState(['legs', 'arms']);
  return (
    <Screen withBottomInsets>
      <View paddingSmall>
        <Text large>Difficulty:</Text>

        <View paddingVerticalSmall>
          <View paddingSmall style={styles.dropdownContainer}>
            <Dropdown
              data={['beginner', 'amateur', 'intermediate', 'advanced']}
              textColor={colors.dark}
              keyExtractor={item => item}
              onChange={item => item}
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
            checked={withEquipment}
            onPress={() => setWithEquipment(prevState => !prevState)}
          />
          <Spacer />
          <Text>No</Text>
          <Spacer />
          <CheckBox
            checked={!withEquipment}
            onPress={() => setWithEquipment(prevState => !prevState)}
          />
          <Spacer />
        </View>
        <Text large>Duration (est.):</Text>
        <View paddingVerticalSmall>
          <View paddingSmall style={styles.dropdownContainer}>
            <Dropdown
              data={[15, 30, 45, 60]}
              keyExtractor={item => String(item)}
              textColor={colors.dark}
              onChange={item => String(item)}
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
            <Dropdown
              data={['abs', 'chest', 'arms', 'legs']}
              keyExtractor={item => item}
              onChange={item => item}
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
        <Button>Create workout session</Button>
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
