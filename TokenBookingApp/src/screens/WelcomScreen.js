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
import Svg, { Path, Circle, Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// 3D-style shield with checkmark using SVG
const ShieldIcon = () => (
  <Svg width="220" height="220" viewBox="0 0 220 220">
    <Defs>
      {/* Shield body gradient - light blue */}
      <RadialGradient id="shieldGrad" cx="40%" cy="30%" r="70%">
        <Stop offset="0%" stopColor="#7DDFF5" />
        <Stop offset="60%" stopColor="#3BBFE8" />
        <Stop offset="100%" stopColor="#1A9EC8" />
      </RadialGradient>
      {/* Shield rim/border gradient - deeper blue */}
      <RadialGradient id="rimGrad" cx="40%" cy="30%" r="70%">
        <Stop offset="0%" stopColor="#4ECDF0" />
        <Stop offset="100%" stopColor="#0E85B0" />
      </RadialGradient>
      {/* Checkmark gradient - creamy white */}
      <RadialGradient id="checkGrad" cx="40%" cy="20%" r="80%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#D8EEF5" />
      </RadialGradient>
    </Defs>

    {/* Shield shadow */}
    <Ellipse cx="110" cy="205" rx="55" ry="10" fill="rgba(30,100,160,0.18)" />

    {/* Shield rim (slightly larger, darker) */}
    <Path
      d="M110 18 L178 46 L178 108 C178 150 148 182 110 198 C72 182 42 150 42 108 L42 46 Z"
      fill="url(#rimGrad)"
    />

    {/* Shield body */}
    <Path
      d="M110 26 L172 52 L172 108 C172 146 144 176 110 191 C76 176 48 146 48 108 L48 52 Z"
      fill="url(#shieldGrad)"
    />

    {/* Inner shield highlight (top-left shine) */}
    <Path
      d="M110 36 L162 58 L162 80 C140 72 120 68 110 68 L110 36 Z"
      fill="rgba(255,255,255,0.25)"
    />

    {/* Checkmark */}
    <Path
      d="M76 108 L98 132 L148 82"
      stroke="url(#checkGrad)"
      strokeWidth="18"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#7B5FEB", "#9B7FF5", "#C4B0F8", "#EDE8FC", "#FFFFFF"]}
      locations={[0, 0.25, 0.5, 0.68, 0.85]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>

        {/* Shield icon — upper center */}
        <View style={styles.shieldWrapper}>
          <ShieldIcon />
        </View>

        {/* Text + buttons at the bottom */}
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
    paddingHorizontal: 24,
  },

  // Shield positioned in upper half
  shieldWrapper: {
    marginTop: height * 0.12,
    shadowColor: "#3A1EA0",
    shadowOpacity: 0.3,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 20 },
    elevation: 16,
  },

  // Bottom content
  bottomContent: {
  position: "absolute",
  bottom: 50,        // increase this — try 50 or 60
  left: 24,
  right: 24,
  marginBottom: 0,   // remove the extra marginBottom, it fights with bottom
},
  titleRow1: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "Poppins_700Bold",
  },
  horaText: {
    color: "#7B5FEB",
    fontWeight: "700",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
  titleDark: {
    color: "#111111",
    fontWeight: "700",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
  titleRow2: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 28,
    fontFamily: "Poppins_800ExtraBold",
  },
  primaryButton: {
    backgroundColor: "#7B5FEB",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
    shadowColor: "#5B3FCC",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
    fontFamily: "Poppins_700Bold",
  },
secondaryButton: {
  backgroundColor: "#F0EEF8",
  paddingVertical: 18,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",  // add this
  width: "100%",
  overflow: "visible",        // add this
},
secondaryText: {
  color: "#2A2A2A",
  fontWeight: "500",
  fontSize: 15,               // slightly reduce if wrapping is the issue
  fontFamily: "Poppins_500Medium",
  includeFontPadding: false,  // add this — fixes Android font clipping
  textAlignVertical: "center",// add this for Android
},
});