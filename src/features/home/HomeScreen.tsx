import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useQuery} from 'react-query';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {http} from '../../service/http/http';
import {colors} from '../../style/palette';
import {Icon} from '../../svg/icons/Icon';
import {SocialBarHeader} from './SocialBarHeader';

export const dropdownToggleButtonHeight = 25;
export const HomeScreen = () => {
  const [socialHeaderHeight, setSocialHeaderHeight] = useState(0);
  const fetchGymLocations = async () => {
    try {
      const response = await http.get('/gym-locations');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {data, isLoading, isIdle, isError} = useQuery(
    ['gym-locations'],
    fetchGymLocations,
  );

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
  if (isLoading || isIdle) {
    return (
      <Screen>
        <Text>loading...</Text>
      </Screen>
    );
  }
  if (isError) {
    return (
      <Screen>
        <Text>Error...</Text>
      </Screen>
    );
  }
  const gymLocationList = data?.data;
  return (
    <Screen preventScroll>
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
              <Icon name="map-marker" size={35} color={colors.success} />
            </Marker>
            {gymLocationList.map((location: any) => {
              return (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
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
    aspectRatio: 2 / 4,
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
