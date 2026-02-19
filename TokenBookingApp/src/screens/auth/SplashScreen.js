import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

// Same L-shaped clock used across all Hora screens
const ClockFace = ({ size = 48, color = "#4A9E96" }) => (
  <Svg width={size} height={size} viewBox="0 0 110 110">
    <Path
      d="M55 55 L55 18"
      stroke={color}
      strokeWidth="9"
      strokeLinecap="round"
    />
    <Path
      d="M55 55 L92 55"
      stroke={color}
      strokeWidth="9"
      strokeLinecap="round"
    />
  </Svg>
);

// 4-point sparkle star
const StarSparkle = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 1 L13.8 10.2 L23 12 L13.8 13.8 L12 23 L10.2 13.8 L1 12 L10.2 10.2 Z"
      fill={color}
    />
  </Svg>
);

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const sparkle1Anim = useRef(new Animated.Value(0)).current;
  const sparkle2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate logo in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Sparkles fade in with delay
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(sparkle1Anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkle2Anim, {
          toValue: 1,
          duration: 500,
          delay: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after 2500ms
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#4A9E96", "#A8CECA", "#D6E9E7"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      {/* Sparkle top-right — same position as WelcomeScreen */}
      <Animated.View style={[styles.sparkleTopRight, { opacity: sparkle1Anim }]}>
        <StarSparkle size={32} color="#FFFFFF" />
      </Animated.View>
      <Animated.View style={[styles.sparkleTopRightSmall, { opacity: sparkle2Anim }]}>
        <StarSparkle size={16} color="#FFFFFF" />
      </Animated.View>

      {/* Sparkle bottom-left for balance */}
      <Animated.View style={[styles.sparkleBottomLeft, { opacity: sparkle1Anim }]}>
        <StarSparkle size={18} color="rgba(255,255,255,0.5)" />
      </Animated.View>

      {/* Main logo content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Clock circle — same white circle style as WelcomeScreen */}
        <View style={styles.clockCircle}>
          <ClockFace size={60} color="#4A9E96" />
        </View>

        {/* App name */}
        <Text style={styles.title}>Hora</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
        Make Your Own Path
      </Animated.Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sparkleTopRight: {
    position: "absolute",
    top: 80,
    right: 30,
  },
  sparkleTopRightSmall: {
    position: "absolute",
    top: 116,
    right: 22,
  },
  sparkleBottomLeft: {
    position: "absolute",
    bottom: 120,
    left: 36,
  },
  content: {
    alignItems: "center",
    marginBottom: 16,
  },
  clockCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#1A6060",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginTop: 8,
  },
});