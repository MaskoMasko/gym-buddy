import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet} from 'react-native';
import {View} from './View';

//TODO: this na novo
export function ImageTransition({source}: {source: string}) {
  return (
    <View flex alignItemsFlexEnd style={styles.positionRelative}>
      <LinearGradient
        colors={['rgb(0,0,0)', 'rgb(0,0,0)', 'rgba(0,0,0,0.5)']}
        useAngle
        angle={90}
        style={[StyleSheet.absoluteFillObject, styles.zIndex2]}
      />
      <Image source={{uri: source}} style={{width: 150, height: 150}} />
    </View>
  );
}

const styles = StyleSheet.create({
  positionRelative: {
    position: 'relative',
  },
  zIndex2: {
    zIndex: 2,
  },
});
