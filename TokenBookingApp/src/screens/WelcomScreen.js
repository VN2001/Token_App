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
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

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
      colors={[
        "#7B3FFF",
        "#7B3FFF",
        "#A880F8",
        "#D8CAFC",
        "#EDE8FD",
        "#F8F6FF",
        "#FFFFFF",
        "#FFFFFF",
      ]}
      locations={[0, 0.20, 0.38, 0.50, 0.56, 0.61, 0.66, 1.0]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>

        {/* Shield — bigger, slightly lower */}
        <View style={styles.shieldWrapper}>
          <ShieldIcon />
        </View>

        {/* Title — sits just under shield */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titleRow1}>
            <Text style={styles.horaText}>Hora, </Text>
            <Text style={styles.titleDark}>Make</Text>
          </Text>
          <Text style={styles.titleRow2}>Your Own Path</Text>
        </View>

        {/* Buttons — with horizontal padding, not full width */}
        <View style={styles.bottomContent}>

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
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: scale(24),
  },

  // Shield: bigger + shifted slightly lower
  shieldWrapper: {
    marginTop: verticalScale(72),       // lower than before
    alignItems: "center",
    shadowColor: "#3A1EA0",
    shadowOpacity: 0.22,
    shadowRadius: moderateScale(24),
    shadowOffset: { width: 0, height: verticalScale(14) },
    elevation: 14,
  },

  shieldImage: {
    width: scale(280),                  // bigger than before (was 250)
    height: verticalScale(258),         // bigger than before (was 230)
    resizeMode: "contain",
  },

  // Title: close under shield
  titleWrapper: {
    marginTop: verticalScale(18),
    alignItems: "center",
    width: "100%",
  },

  titleRow1: {
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },

  horaText: {
    color: "#7B5FEB",
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(28),
  },

  titleDark: {
    color: "#111111",
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(28),
  },

  titleRow2: {
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
    fontFamily: "Poppins_600SemiBold",
    color: "#111111",
    textAlign: "center",
  },

  // Buttons: horizontal padding so NOT edge-to-edge
  bottomContent: {
    position: "absolute",
    bottom: verticalScale(60),
    left: scale(24),                    // padding from edges
    right: scale(24),                   // padding from edges
  },

  primaryShadowWrapper: {
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(14),
    backgroundColor: "#763ef9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.22,
    shadowRadius: moderateScale(10),
    elevation: 10,
  },

  primaryButton: {
    paddingVertical: verticalScale(17),
    borderRadius: moderateScale(16),
    alignItems: "center",
    width: "100%",
  },

  primaryText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(16),
    letterSpacing: 0.3,
  },

  secondaryShadowWrapper: {
    borderRadius: moderateScale(16),
    backgroundColor: "#f6f6f6",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    shadowOffset: { width: 0, height: verticalScale(3) },
    elevation: 3,
  },

  secondaryButton: {
    paddingVertical: verticalScale(17),
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#F2F2F2",
  },

  secondaryText: {
    color: "#111111",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(16),
  },

  thirdText: {
    color: "#AAAAAA",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    textAlign: "center",
    marginHorizontal: scale(20),
    marginTop: verticalScale(16),
    lineHeight: moderateScale(18),
  },
});