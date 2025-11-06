import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type WaveCircleProps = {
  size: number;
  micLevel: number;
  isActive: boolean;
};

export function WaveCircle({ size, micLevel, isActive }: WaveCircleProps) {
  const wave1Anim = useRef(new Animated.Value(0)).current;
  const wave2Anim = useRef(new Animated.Value(0)).current;
  const wave3Anim = useRef(new Animated.Value(0)).current;
  const wave4Anim = useRef(new Animated.Value(0)).current;
  const wave5Anim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Continuous wave animations
  useEffect(() => {
    if (!isActive) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const wave1Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave1Anim, {
          toValue: 1,
          duration: 2000 + micLevel * 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave1Anim, {
          toValue: 0,
          duration: 2000 + micLevel * 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const wave2Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave2Anim, {
          toValue: 1,
          duration: 2500 + micLevel * 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave2Anim, {
          toValue: 0,
          duration: 2500 + micLevel * 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const wave3Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave3Anim, {
          toValue: 1,
          duration: 1800 + micLevel * 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave3Anim, {
          toValue: 0,
          duration: 1800 + micLevel * 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const wave4Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave4Anim, {
          toValue: 1,
          duration: 2200 + micLevel * 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave4Anim, {
          toValue: 0,
          duration: 2200 + micLevel * 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const wave5Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave5Anim, {
          toValue: 1,
          duration: 3000 + micLevel * 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave5Anim, {
          toValue: 0,
          duration: 3000 + micLevel * 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    wave1Loop.start();
    wave2Loop.start();
    wave3Loop.start();
    wave4Loop.start();
    wave5Loop.start();

    return () => {
      wave1Loop.stop();
      wave2Loop.stop();
      wave3Loop.stop();
      wave4Loop.stop();
      wave5Loop.stop();
    };
  }, [isActive, micLevel, wave1Anim, wave2Anim, wave3Anim, wave4Anim, wave5Anim, opacityAnim]);

  // Wave position calculations
  const wave1Y = wave1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.3, size * 0.5],
  });

  const wave2Y = wave2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.4, size * 0.6],
  });

  const wave3Y = wave3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.2, size * 0.45],
  });

  const wave4Y = wave4Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.35, size * 0.55],
  });

  const wave5Y = wave5Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.25, size * 0.5],
  });

  // Wave opacity based on position and mic level
  const wave1Opacity = Animated.multiply(
    wave1Anim,
    Animated.multiply(opacityAnim, 0.4 + micLevel * 0.3)
  );
  const wave2Opacity = Animated.multiply(
    wave2Anim,
    Animated.multiply(opacityAnim, 0.35 + micLevel * 0.25)
  );
  const wave3Opacity = Animated.multiply(
    wave3Anim,
    Animated.multiply(opacityAnim, 0.45 + micLevel * 0.35)
  );
  const wave4Opacity = Animated.multiply(
    wave4Anim,
    Animated.multiply(opacityAnim, 0.3 + micLevel * 0.2)
  );
  const wave5Opacity = Animated.multiply(
    wave5Anim,
    Animated.multiply(opacityAnim, 0.25 + micLevel * 0.15)
  );

  // Wave scales based on mic level
  const baseScale = 0.8 + micLevel * 0.4;
  const wave1Scale = Animated.add(
    baseScale,
    Animated.multiply(wave1Anim, 0.2)
  );
  const wave2Scale = Animated.add(
    baseScale,
    Animated.multiply(wave2Anim, 0.15)
  );
  const wave3Scale = Animated.add(
    baseScale,
    Animated.multiply(wave3Anim, 0.25)
  );
  const wave4Scale = Animated.add(
    baseScale,
    Animated.multiply(wave4Anim, 0.18)
  );
  const wave5Scale = Animated.add(
    baseScale,
    Animated.multiply(wave5Anim, 0.12)
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Base gradient background - darker at bottom, lighter at top */}
      <View
        style={[
          styles.baseGradientBottom,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
      <View
        style={[
          styles.baseGradientMiddle,
          {
            width: size,
            height: size * 0.7,
            borderBottomLeftRadius: size / 2,
            borderBottomRightRadius: size / 2,
          },
        ]}
      />
      <View
        style={[
          styles.baseGradientTop,
          {
            width: size,
            height: size * 0.4,
            borderTopLeftRadius: size / 2,
            borderTopRightRadius: size / 2,
          },
        ]}
      />

      {/* Animated waves - positioned and clipped to circle */}
      <View style={styles.waveContainer}>
        <Animated.View
          style={[
            styles.wave,
            {
              width: size * 1.4,
              height: size * 0.5,
              borderRadius: size * 0.5,
              transform: [
                { translateX: -size * 0.2 },
                { translateY: wave1Y },
                { scaleX: wave1Scale },
              ],
              opacity: wave1Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave2,
            {
              width: size * 1.35,
              height: size * 0.48,
              borderRadius: size * 0.48,
              transform: [
                { translateX: -size * 0.175 },
                { translateY: wave2Y },
                { scaleX: wave2Scale },
              ],
              opacity: wave2Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave3,
            {
              width: size * 1.45,
              height: size * 0.52,
              borderRadius: size * 0.52,
              transform: [
                { translateX: -size * 0.225 },
                { translateY: wave3Y },
                { scaleX: wave3Scale },
              ],
              opacity: wave3Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave4,
            {
              width: size * 1.3,
              height: size * 0.46,
              borderRadius: size * 0.46,
              transform: [
                { translateX: -size * 0.15 },
                { translateY: wave4Y },
                { scaleX: wave4Scale },
              ],
              opacity: wave4Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave5,
            {
              width: size * 1.5,
              height: size * 0.54,
              borderRadius: size * 0.54,
              transform: [
                { translateX: -size * 0.25 },
                { translateY: wave5Y },
                { scaleX: wave5Scale },
              ],
              opacity: wave5Opacity,
            },
          ]}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 1000,
  },
  baseGradientBottom: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#654321", // Dark brown base (bottom)
  },
  baseGradientMiddle: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#8B5A3C", // Medium brown (middle)
  },
  baseGradientTop: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(160, 82, 45, 0.4)", // Lighter brown overlay (top)
  },
  waveContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 1000,
  },
  wave: {
    position: "absolute",
    backgroundColor: "rgba(210, 180, 140, 0.65)", // Tan/beige wave
    left: "50%",
    top: 0,
  },
  wave2: {
    backgroundColor: "rgba(222, 184, 135, 0.55)", // Lighter tan
  },
  wave3: {
    backgroundColor: "rgba(205, 133, 63, 0.6)", // Medium brown
  },
  wave4: {
    backgroundColor: "rgba(218, 165, 32, 0.45)", // Golden brown
  },
  wave5: {
    backgroundColor: "rgba(160, 82, 45, 0.5)", // Sienna
  },
});

