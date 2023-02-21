import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View} from '../../components/View';
import {Screen} from '../../components/Screen';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from '../../svg/icons/Icon';
import {colors} from '../../style/palette';
import {StyleSheet} from 'react-native';

export const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | undefined
  >(undefined);
  Geolocation.getCurrentPosition(info => {
    setCurrentLocation({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
    });
  });
  return (
    <Screen>
      <View flex backgroundColorSuccess style={styles.fullScreenAbsolute}>
        {currentLocation && (
          <MapView
            style={styles.flex}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              //starting map distance
              latitudeDelta: 0.4922,
              longitudeDelta: 0.4421,
            }}>
            <Marker coordinate={currentLocation} title="Your location">
              <Icon name="map-marker" size={35} color={colors.error} />
            </Marker>
          </MapView>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  fullScreenAbsolute: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 2 / 4,
    bottom: 1,
  },
  flex: {
    flex: 1,
  },
});
