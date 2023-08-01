import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CircleTimer} from '../../components/CircleTimer';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {useAlert} from '../../hooks/useAlert';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {useExercises} from './fetch/useExercises';
import {Icon} from '../../svg/icons/Icon';
import {colors} from '../../style/palette';

const InnerModelComponent = () => {
  const navigation =
    useNavigation<
      RootStackNavigationProps<'WorkoutStartedScreen'>['navigation']
    >();
  const insets = useSafeAreaInsets();
  const alert = useAlert();
  const {queryData} = useExercises();
  const [currentExerciseId, setCurrentExerciseId] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(
    (queryData[currentExerciseId].duration ?? 0) * 100,
  );
  const [resetAnimation, setResetAnimation] = useState(false);
  const [skippedExercise, setSkippedExercise] = useState(false);

  const handleRestartAnimation = () => {
    setResetAnimation(prev => !prev);
  };
  const handleCancelWorkout = () => {
    setIsAnimating(false);
    alert('Title', 'Message', [
      {
        text: 'Continue',
        onPress: () => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        },
      },
    ]);
  };
  const handleSkipExercise = () => {
    setSkippedExercise(prev => !prev);
  };

  return (
    <View
      flex
      centerContent
      style={{paddingBottom: insets.bottom, paddingTop: insets.top}}>
      {currentExerciseId >= queryData.length - 1 ? (
        <>
          <Text
            extraLarge
            alignSelfCenter
            colorOffWhite
            style={{textAlign: 'center'}}>
            Congratulations, workout completed!
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <Text colorRed extraLarge>
              Continue
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <CircleTimer
            key={currentExerciseId}
            duration={animationDuration}
            isAnimating={isAnimating}
            onAnimationEnded={() => {
              setAnimationDuration(
                (queryData[currentExerciseId + 1].duration ?? 0) * 100,
              );
              setCurrentExerciseId(prevVal => prevVal + 1);
              setIsAnimating(false);
            }}
            restarted={resetAnimation}
            skip={skippedExercise}
            onSkip={() => {
              if (!isAnimating) {
                setIsAnimating(true);
              }
            }}
          />
          <Spacer />
          <Text colorOffWhite extraLarge style={{textAlign: 'center'}}>
            {queryData[currentExerciseId].name}
          </Text>
          <Spacer />
          <View flexDirectionRow>
            <TouchableOpacity
              onPress={() => {
                setIsAnimating(false);
                handleRestartAnimation();
              }}
              backgroundColorLight
              paddingMedium
              style={{borderRadius: 100}}>
              <Icon name={'stop'} color={colors.theme} />
            </TouchableOpacity>
            <View paddingExtraLarge />
            <TouchableOpacity
              onPress={() => setIsAnimating(prev => !prev)}
              backgroundColorLight
              paddingMedium
              style={{borderRadius: 100}}>
              <Icon
                name={isAnimating ? 'pause' : 'play'}
                color={colors.theme}
              />
            </TouchableOpacity>
          </View>

          <Spacer />
          <View flexDirectionRow>
            <TouchableOpacity flex onPress={handleCancelWorkout}>
              <Text style={{textAlign: 'center'}} colorRed extraLarge>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity flex onPress={handleSkipExercise}>
              <Text style={{textAlign: 'center'}} colorGreen extraLarge>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
export const WorkoutStartedScreen = () => {
  const {workoutCategory} =
    useRoute<RootStackNavigationProps<'WorkoutStartedScreen'>['route']>()
      .params;
  return (
    <Screen withTopInsets withBottomInsets>
      <View flex backgroundColorTheme>
        <Text>{workoutCategory}</Text>
        <InnerModelComponent />
      </View>
    </Screen>
  );
};
