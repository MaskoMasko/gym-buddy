import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {RenderHTML} from 'react-native-render-html';
import {IconButton} from '../../components/IconButton';
import {ImagePreview} from '../../components/ImagePreview';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {colors} from '../../style/palette';
import {fontSizes} from '../../style/typography';
import {Exercise, Rest} from './fetch/useExercises';

export const WorkoutListItem = ({exercise}: {exercise: Exercise | Rest}) => {
  const [isExerciseDetailsModalVisible, setIsExerciseDetailsModalVisible] =
    useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [isWholeDescriptionVisible, setIsWholeDescriptionVisible] =
    useState(false);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  //https://stackoverflow.com/q/68966120/2779871
  const MemoizedRenderHTML = React.memo(RenderHTML);
  if ('category' in exercise) {
    return (
      <View paddingExtraSmall>
        <View
          paddingMedium
          backgroundColorDarkGray
          flexDirectionRow={!isExerciseDetailsModalVisible}
          justifyContentSpaceEvenly
          style={[styles.borderRadius5, styles.exerciseCardShadow]}
          onLayout={({nativeEvent}) => {
            setCardWidth(nativeEvent.layout.width);
          }}>
          <View flex flexDirectionRow>
            <IconButton
              iconName={'info-circle-outline'}
              iconColor={colors.white}
              iconSize={16}
              onPress={() =>
                setIsExerciseDetailsModalVisible(prevVal => !prevVal)
              }
            />
            <Spacer extraSmall />
            <Text style={{flexWrap: 'wrap'}} colorOffWhite>
              {exercise.name}
            </Text>
          </View>
          {!isExerciseDetailsModalVisible && (
            <Text colorOffWhite>{exercise.duration}s</Text>
          )}
          {isExerciseDetailsModalVisible && (
            <View paddingExtraSmall>
              <MemoizedRenderHTML
                source={{
                  html: isWholeDescriptionVisible
                    ? exercise.description + '<a href="#">See less</a><br />'
                    : exercise.description.substring(0, 100) +
                      '... ' +
                      '<a href="#">See more</a>',
                }}
                contentWidth={cardWidth}
                tagsStyles={{
                  p: {
                    color: colors.white,
                    fontSize: fontSizes.small,
                  },
                  a: {
                    color: colors.white,
                    fontSize: fontSizes.extraSmall,
                    // fontWeight: fontWeights.semibold,
                    fontStyle: 'italic',
                    textDecorationColor: 'white',
                  },
                }}
                renderersProps={{
                  a: {
                    onPress() {
                      setIsWholeDescriptionVisible(prevVal => !prevVal);
                    },
                  },
                }}
              />
              <Text colorOffWhite>Images: </Text>
              <Spacer extraSmall />
              <View>
                {exercise.images.map(image => (
                  <TouchableOpacity
                    key={image.id}
                    onPress={() => {
                      setIsImagePreviewVisible(prevVal => !prevVal);
                    }}>
                    <Image
                      source={{uri: image.image, width: 150, height: 150}}
                    />
                    <ImagePreview
                      isImagePreviewVisible={isImagePreviewVisible}
                      setIsImagePreviewVisible={setIsImagePreviewVisible}
                      image={image}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
  return (
    <View paddingHorizontalExtraSmall paddingSmall>
      <View
        paddingMedium
        flexDirectionRow
        justifyContentSpaceEvenly
        backgroundColorWhite
        style={styles.restCardShadow}>
        <View flex>
          <Text>{exercise.name}</Text>
        </View>
        <Text>{exercise.duration}s</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  restCardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  exerciseCardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  borderRadius5: {
    borderRadius: 5,
  },
});
