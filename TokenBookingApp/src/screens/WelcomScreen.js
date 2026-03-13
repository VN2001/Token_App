import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ShieldIcon = () => (
  <Image
    source={require("../../assets/icons/1.png")}
    style={styles.shieldImage}
  />
);

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#7f48fd", "#B297F8", "#D4C7FA", "#f6f6f6", "#FFFFFF"]}
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
            <Text style={styles.horaText}>Hora, </Text>
            <Text style={styles.titleDark}>Make</Text>
          </Text>
          <Text style={styles.titleRow2}>Your Own Path</Text>

          {/* Get Started Button */}
          <View style={styles.primaryShadowWrapper}>
            <TouchableOpacity
              onPress={() => navigation?.navigate("Register")}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#763ef9", "#814afe", "#763ff7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* I already have an account Button */}
          <TouchableOpacity
            onPress={() => navigation?.navigate("Login")}
            activeOpacity={0.85}
            style={styles.secondaryShadowWrapper}
          >
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>I already have an account</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.thirdText}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
          </Text>
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
  shieldImage: {
    width: 350,
    height: 320,
    resizeMode: "contain",
  },

  bottomContent: {
    position: "absolute",
    bottom: 60,
    left: 24,
    right: 24,
  },

  titleRow1: {
    fontSize: 34,
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "Poppins_600SemiBold",
  },
  horaText: {
    color: "#7B5FEB",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 34,
  },
  titleDark: {
    color: "#111111",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 34,
  },
  titleRow2: {
    fontSize: 36,
    fontFamily: "Poppins_600SemiBold",
    color: "#111111",
    textAlign: "center",
    lineHeight: 44,
    marginBottom: 32,
  },

  // Get Started button
  primaryShadowWrapper: {
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: "#763ef9",
    shadowColor: "#DDCFFD",
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  primaryButton: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  primaryText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    fontSize: 17,
    letterSpacing: 0.3,
  },

  // I already have an account button
  secondaryShadowWrapper: {
    borderRadius: 20,
    marginBottom: 0,
    backgroundColor: "#f6f6f6",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  secondaryButton: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#EFEFEF",
  },
  secondaryText: {
    color: "#000000",
    fontFamily: "Inter_400Regular",
    fontSize: 17,
  },

  thirdText: {
    color: "#707070",
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 24,
    lineHeight: 20,
  },
});