import React from "react";
import { View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

const ProgressCircleBar = ({ progress, size, strokeWidth, progressColor, backgroundColor }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = progress * circumference;

  return (
    <View>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progressValue}
        />
      </Svg>
      <Text style={{ alignSelf: "center" }}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

export default ProgressCircleBar;
