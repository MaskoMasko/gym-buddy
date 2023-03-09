import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Screen} from '../../components/Screen';
import {View} from '../../components/View';
import {colors} from '../../style/palette';
import {Icon} from '../../svg/icons/Icon';
import {SocialBarHeader} from './SocialBarHeader';
import {useGymLocations} from './fetch/useGymLocations';

export const dropdownToggleButtonHeight = 25;
export const HomeScreen = () => {
  const [socialHeaderHeight, setSocialHeaderHeight] = useState(0);

  const gymLocations = useGymLocations();

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
    <Screen
      preventScroll
      queryStatus={{loading: gymLocations.loading, error: gymLocations.error}}>
      <View flex backgroundColorError>
        {currentLocation && (
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              //starting map distance
              latitudeDelta: 0.4922,
              longitudeDelta: 0.4421,
            }}>
            <Marker coordinate={currentLocation} title="Your location">
              <Icon name="map-marker" size={35} color={colors.success} />
            </Marker>
            {gymLocations.queryData.map(location => {
              return (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude),
                  }}
                  title={location.name}>
                  <Icon name="map-marker" size={35} color={colors.error} />
                </Marker>
              );
            })}
          </MapView>
        )}
      </View>
      <View
        style={[
          styles.dropdownToggleButtonContainerAbsolute,
          {
            top: -socialHeaderHeight + dropdownToggleButtonHeight,
          },
        ]}
        onLayout={event => {
          setSocialHeaderHeight(event.nativeEvent.layout.height);
        }}>
        <SocialBarHeader />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  fullScreenAbsolute: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    bottom: 1,
  },
  flex: {
    flex: 1,
  },
  dropdownToggleButtonContainerAbsolute: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
