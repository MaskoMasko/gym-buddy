import React from 'react';
import {View} from '../../components/View';
import {Text} from '../../components/Text';
import {Spacer} from '../../components/Spacer';
import {Icon} from '../../svg/icons/Icon';
import {colors} from '../../style/palette';
import {StyleSheet} from 'react-native';

export const MapLegend = () => {
  return (
    <View style={styles.legendContainer} backgroundColorWhite paddingSmall>
      <View flexDirectionRow centerContent>
        <Icon name="map-marker" size={24} color={colors.success} />
        <Spacer extraSmall />
        <Text small>Your location</Text>
      </View>
      <View flexDirectionRow centerContent>
        <Icon name="map-marker" size={24} color={colors.error} />
        <Spacer extraSmall />
        <Text small>Gym location</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    position: 'absolute',
    left: 5,
    bottom: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
