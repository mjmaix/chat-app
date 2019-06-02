import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { runTiming } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

import { StyledScreenContainer } from '../styled';

const { Value, multiply, Clock, interpolate } = Animated;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width } = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

interface CircularProgressProps {
  progress: typeof Value;
}

const clock = new Clock();
const config = {
  duration: 20 * 1000,
  toValue: 1,
  easing: Easing.linear,
};
const progress = runTiming(clock, 0, config);
const TestScreen = (props: CircularProgressProps) => {
  const alpha = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = multiply(alpha, radius);
  return (
    <StyledScreenContainer>
      <Svg width={size} height={size}>
        <AnimatedCircle
          stroke="#2162cc"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          {...{ strokeWidth, strokeDashoffset }}
        />
      </Svg>
    </StyledScreenContainer>
  );
};

export { TestScreen };
