import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

// 3D-style shield with checkmark — same as WelcomeScreen
const ShieldIcon = ({ size = 120 }) => {
  const scale = size / 220;
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220">
      <Defs>
        <RadialGradient id="shieldGradS" cx="40%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#7DDFF5" />
          <Stop offset="60%" stopColor="#3BBFE8" />
          <Stop offset="100%" stopColor="#1A9EC8" />
        </RadialGradient>
        <RadialGradient id="rimGradS" cx="40%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#4ECDF0" />
          <Stop offset="100%" stopColor="#0E85B0" />
        </RadialGradient>
        <RadialGradient id="checkGradS" cx="40%" cy="20%" r="80%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#D8EEF5" />
        </RadialGradient>
      </Defs>

      {/* Shield shadow */}
      <Ellipse cx="110" cy="205" rx="55" ry="10" fill="rgba(30,100,160,0.18)" />

      {/* Shield rim */}
      <Path
        d="M110 18 L178 46 L178 108 C178 150 148 182 110 198 C72 182 42 150 42 108 L42 46 Z"
        fill="url(#rimGradS)"
      />

      {/* Shield body */}
      <Path
        d="M110 26 L172 52 L172 108 C172 146 144 176 110 191 C76 176 48 146 48 108 L48 52 Z"
        fill="url(#shieldGradS)"
      />

      {/* Shine */}
      <Path
        d="M110 36 L162 58 L162 80 C140 72 120 68 110 68 L110 36 Z"
        fill="rgba(255,255,255,0.25)"
      />

      {/* Checkmark */}
      <Path
        d="M76 108 L98 132 L148 82"
        stroke="url(#checkGradS)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

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
navigation.replace("Welcome")    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#7B5FEB", "#9B7FF5", "#C4B0F8", "#EDE8FC", "#FFFFFF"]}
      locations={[0, 0.25, 0.5, 0.85, 0.95]}
      style={styles.container}
    >
      {/* Sparkle top-right */}
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
        {/* Shield icon */}
        <View style={styles.shieldWrapper}>
          <ShieldIcon size={140} />
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
  shieldWrapper: {
    marginBottom: 24,
    shadowColor: "#3A1EA0",
    shadowOpacity: 0.3,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: -8,
    fontFamily: "Poppins_800ExtraBold",
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginTop: 8,
    fontFamily: "Poppins_500Medium",
  },
});