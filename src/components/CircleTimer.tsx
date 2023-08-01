import * as React from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {colors} from '../style/palette';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function CircleTimer({
  percentage = 100,
  radius = 150,
  strokeWidth = 25,
  duration,
  color = colors.white,
  textColor = colors.white,
  max = 100,
  isAnimating,
  onAnimationEnded,
  restarted,
  skip,
  onSkip,
}: {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  textColor?: string;
  max?: number;
  isAnimating?: boolean;
  onAnimationEnded?: () => void;
  restarted?: boolean;
  skip?: boolean;
  onSkip?: () => void;
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  // im sad to use any here, but u try to type AnimatedCircle correctly
  const circleRef = React.useRef<any>(null);
  const inputRef = React.useRef<TextInput>(null);
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const [lastKnownPercentage, setLastKnownPercentage] = React.useState(0);

  const animation = (fromValue: number, toValue: number) => {
    animated.setValue(fromValue);
    if (!duration) {
      return;
    }
    return Animated.timing(animated, {
      toValue,
      duration: duration - duration * (fromValue / 100),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        // Animation completed and should continue only if isAnimating is true
        animated.setValue(0);
        setLastKnownPercentage(0);
        if (isAnimating) {
          onAnimationEnded?.();
        }
      }
    });
  };

  React.useEffect(() => {
    animated.resetAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restarted]);

  React.useEffect(() => {
    animation(100, 0);
    setLastKnownPercentage(100);
    onSkip?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  React.useEffect(() => {
    //watch this

    animated.addListener(v => {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      const remainingPercentage = 100 - Math.round(v.value);
      const percentageAsSeconds = Math.round(
        (remainingPercentage / 100) * ((duration ?? 0) / 1000),
      );
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${percentageAsSeconds}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animated.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isAnimating) {
      animation(lastKnownPercentage, percentage);
    } else {
      animated.stopAnimation(value => {
        setLastKnownPercentage(value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 2, color: textColor ?? color},
          styles.text,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {fontWeight: '900', textAlign: 'center'},
});
