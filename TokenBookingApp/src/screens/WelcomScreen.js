import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image, // ✅ Import Image from React Native
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// ✅ Updated ShieldIcon using local image
const ShieldIcon = () => (
  <Image
    source={require("../../assets/icons/1.png")} // 👈 update this path
    style={styles.shieldImage}
  />
);

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#7f48fd","#C4B0F8","#EDE8FC", "#f6f6f6",  "#FFFFFF"]}
      locations={[0.3, 0.5, 0.6, 0.68, 0.85]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.shieldWrapper}>
          <ShieldIcon />
        </View>

        <View style={styles.bottomContent}>
          <Text style={styles.titleRow1}>
            <Text style={styles.horaText}>Hora,</Text>
            <Text style={styles.titleDark}> Make</Text>
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
          <Text style={styles.thirdText}>Lorem ispum</Text>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  shieldWrapper: {
    marginTop: height * 0.12,
    shadowColor: "#3A1EA0",
    shadowOpacity: 0.3,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 20 },
    elevation: 16,
  },

  // ✅ Control image size here
  shieldImage: {
    width: 350,
    height: 300,
    resizeMode: "contain",
  },

  bottomContent: {
    position: "absolute",
    bottom: 100,
    left: 24,
    right: 24,
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
    fontSize: 50,
    fontFamily: "Poppins_700Bold",
  },
  titleDark: {
    color: "#111111",
    fontWeight: "700",
    fontSize: 50,
    fontFamily: "Poppins_700Bold",
  },
  titleRow2: {
    fontSize: 40,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    lineHeight: 60,
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
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: 0.3,
    fontFamily: "Poppins_700Bold",
  },
  secondaryButton: {
    backgroundColor: "#F0EEF8",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secondaryText: {
    color: "#707070",
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  thirdText: {
    color: "#707070",
    fontWeight: "300",
    fontSize: 10,
    fontFamily: "Poppins_500Medium",
    includeFontPadding: false,
    textAlignVertical: "center",
    top: 20,
    textAlign: "center",
  },
});