import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Clock: minute hand UP (12), hour hand RIGHT (3) = "L" shape
const ClockFace = () => (
  <Svg width="110" height="110" viewBox="0 0 110 110">
    <Path
      d="M55 55 L55 18"
      stroke="#4A9E96"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <Path
      d="M55 55 L92 55"
      stroke="#4A9E96"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </Svg>
);

// 4-point star sparkle
const StarSparkle = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 1 L13.8 10.2 L23 12 L13.8 13.8 L12 23 L10.2 13.8 L1 12 L10.2 10.2 Z"
      fill="#FFFFFF"
    />
  </Svg>
);

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#4A9E96", "#A8CECA", "#FFFFFF"]}
      locations={[0, 0.4, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>

        {/* Sparkles top right */}
        <View style={styles.sparkleWrapper}>
          <StarSparkle size={34} />
          <View style={styles.sparkleSmall}>
            <StarSparkle size={16} />
          </View>
        </View>

        {/* Clock circle — upper center */}
        <View style={styles.circleWrapper}>
          <View style={styles.iconCircle}>
            <ClockFace />
          </View>
        </View>

        {/* Text + buttons at the bottom — NO background, sits on gradient */}
        <View style={styles.bottomContent}>
          <Text style={styles.titleRow1}>
            <Text style={styles.horaText}>Hora</Text>
            <Text style={styles.titleDark}>, Make</Text>
          </Text>
          <Text style={styles.titleRow2}>Your Own Path</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation?.navigate("Register")}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation?.navigate("Login")}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 22,
  },
  // Sparkles anchored top-right
  sparkleWrapper: {
    position: "absolute",
    top: 52,
    right: 22,
    width: 52,
    height: 52,
  },
  sparkleSmall: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  // Clock circle — positioned in upper half
  circleWrapper: {
    marginTop: height * 0.15,
    shadowColor: "#1A6060",
    shadowOpacity: 0.25,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  },
  iconCircle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  // Bottom content floats above bottom edge, no background
  bottomContent: {
    position: "absolute",
    bottom: 40,
    left: 22,
    right: 22,
    marginBottom:60,
  },
  titleRow1: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 40,
  },
  horaText: {
    color: "#4A9E96",
    fontWeight: "700",
    fontSize: 30,
  },
  titleDark: {
    color: "#111111",
    fontWeight: "700",
    fontSize: 30,
  },
  titleRow2: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#4A9E96",
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: "rgba(188, 188, 188, 0.55)",
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: "center",
    width: "100%",
  },
  secondaryText: {
    color: "#2A2A2A",
    fontWeight: "500",
    fontSize: 16,
  },
});