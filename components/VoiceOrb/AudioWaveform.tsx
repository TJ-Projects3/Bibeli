import { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import type { AudioWaveformProps } from "./types";

const BAR_COUNT = 24;
const MAX_SCALE = 1;
const MIN_SCALE = 0.1;

export function AudioWaveform({ size, audioLevel, isActive }: AudioWaveformProps) {
  // Create animated values for each bar's scaleY
  const barScales = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(MIN_SCALE))
  ).current;

  // Opacity for fade in/out
  const opacity = useRef(new Animated.Value(0)).current;

  // Time reference for wave motion
  const timeRef = useRef(Date.now());

  // Handle visibility
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [isActive, opacity]);

  // Animate bars based on audio level
  useEffect(() => {
    if (!isActive) {
      // Animate all bars to minimum when inactive
      Animated.parallel(
        barScales.map((scale) =>
          Animated.timing(scale, {
            toValue: MIN_SCALE,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          })
        )
      ).start();
      return;
    }

    // Update time for wave motion
    timeRef.current = Date.now();

    // Calculate target scales with bell curve distribution
    const targets = barScales.map((_, index) => {
      // Normalize index to 0-1 range
      const normalizedIndex = index / (BAR_COUNT - 1);

      // Bell curve: bars in center are taller
      // Using Gaussian function: e^(-(x-0.5)^2 * k) where k controls width
      const bellCurve = Math.exp(-Math.pow((normalizedIndex - 0.5) * 2.5, 2));

      // Time-based wave motion for natural movement
      const waveOffset =
        Math.sin(timeRef.current * 0.008 + index * 0.4) * 0.2;

      // Combine audio level with bell curve and wave variation
      const targetScale =
        MIN_SCALE +
        (audioLevel * bellCurve + waveOffset * audioLevel) *
          (MAX_SCALE - MIN_SCALE);

      // Clamp between min and max
      return Math.max(MIN_SCALE, Math.min(MAX_SCALE, targetScale));
    });

    // Animate all bars to their target scales
    Animated.parallel(
      barScales.map((scale, index) =>
        Animated.timing(scale, {
          toValue: targets[index],
          duration: 60, // Fast response for real-time feel
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        })
      )
    ).start();
  }, [audioLevel, isActive, barScales]);

  // Calculate dimensions
  const barWidth = 3;
  const barGap = 2;
  const maxBarHeight = size * 0.35; // 35% of orb size
  const totalWidth = BAR_COUNT * barWidth + (BAR_COUNT - 1) * barGap;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.barsContainer,
          {
            width: totalWidth,
            height: maxBarHeight,
          },
        ]}
      >
        {barScales.map((scaleY, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                width: barWidth,
                height: maxBarHeight,
                marginHorizontal: barGap / 2,
                transform: [{ scaleY }],
              },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 2,
  },
});
