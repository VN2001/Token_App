import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpModal from "../../components/OtpModal";
import Svg, { Path } from "react-native-svg";
import { rs, vs, rf } from "../../utils/responsive";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const TOP_GAP = vs(160);

const CheckMark = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke="#fff"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Pill Input ───────────────────────────────────────────────────────────────
// Shadow strategy:
//   • The outer `shadowShell` carries the shadow (elevation / iOS props)
//   • overflow:"visible" so the shadow is NOT clipped
//   • The inner `inputWrapper` gives the pill shape & background
//   • On iOS the shadow is pure bottom+right; on Android elevation gives a
//     natural bottom-biased shadow that matches the screenshot.

const PillInput = ({ errorStyle, ...props }) => (
  <View style={s.shadowShell}>
    <View style={[s.inputWrapper, errorStyle]}>
      <TextInput style={s.input} placeholderTextColor="#A0A0A0" {...props} />
    </View>
  </View>
);

export default function RegisterForm({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v) => /^\d{10}$/.test(v.replace(/[^\d]/g, ""));

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Enter a valid email";
    if (!contact.trim()) e.contact = "Contact is required";
    else if (!isValidPhone(contact)) e.contact = "Enter a valid 10-digit number";
    if (!agreed) e.agreed = "Please accept the terms";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const clear = (f) => errors[f] && setErrors((p) => ({ ...p, [f]: "" }));

  const handleSignIn = () => {
    if (!validate()) return;
    setShowOtp(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#EAE0FF", "#EDE4FF", "#ffffff", "#F5F1FF", "#F4F0FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.root}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#e7dbff" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={s.kavWrapper}
        >
          <View style={s.whiteCard}>
            <ScrollView
              contentContainerStyle={s.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="interactive"
            >
              {/* Title */}
              <Text style={s.title}>Create Account</Text>

              {/* Full Name */}
              <PillInput
                placeholder="Full name"
                value={fullName}
                onChangeText={(t) => { setFullName(t); clear("fullName"); }}
                autoCapitalize="words"
                autoCorrect={false}
                errorStyle={errors.fullName ? s.inputErr : null}
              />
              {errors.fullName
                ? <Text style={s.err}>⚠ {errors.fullName}</Text>
                : <View style={s.spacer} />}

              {/* Email */}
              <PillInput
                placeholder="Email"
                value={email}
                onChangeText={(t) => { setEmail(t); clear("email"); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                errorStyle={errors.email ? s.inputErr : null}
              />
              {errors.email
                ? <Text style={s.err}>⚠ {errors.email}</Text>
                : <View style={s.spacer} />}

              {/* Contact */}
              <PillInput
                placeholder="Mobile number"
                value={contact}
                onChangeText={(t) => { setContact(t); clear("contact"); }}
                keyboardType="phone-pad"
                maxLength={15}
                errorStyle={errors.contact ? s.inputErr : null}
              />
              {errors.contact
                ? <Text style={s.err}>⚠ {errors.contact}</Text>
                : <View style={s.spacer} />}

              {/* Terms */}
              <View style={s.termsRow}>
                <TouchableOpacity
                  style={[s.checkbox, agreed && s.checked]}
                  onPress={() => { setAgreed((p) => !p); clear("agreed"); }}
                  activeOpacity={0.75}
                >
                  {agreed && <CheckMark />}
                </TouchableOpacity>
                <Text style={s.termsText}>Agree with </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={s.termsLink}>Terms & conditions</Text>
                </TouchableOpacity>
              </View>
              {errors.agreed
                ? <Text style={[s.err, { marginTop: -8, marginBottom: 10 }]}>⚠ {errors.agreed}</Text>
                : null}

              {/* Sign In Button */}
              <View style={s.btnWrap}>
                <TouchableOpacity
                  onPress={handleSignIn}
                  activeOpacity={0.85}
                  style={s.btnShadow}
                >
                  <LinearGradient
                    colors={["#8048FD", "#7B43FB", "#7F48FD"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={s.signInBtn}
                  >
                    <Text style={s.signInText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={s.divRow}>
                <View style={s.divLine} />
                <Text style={s.divText}> or </Text>
                <View style={s.divLine} />
              </View>

              {/* Social Icons */}
              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image
                    source={require("../../../assets/icons/google.png")}
                    style={s.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image
                    source={require("../../../assets/icons/apple.png")}
                    style={s.socialIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <View style={s.loginRow}>
                <Text style={s.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                  <Text style={s.loginLink}>Log in</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        <OtpModal
          visible={showOtp}
          phone={contact}
          onClose={() => setShowOtp(false)}
          onVerify={async (code) => {
            setShowOtp(false);
            const normalizedName = fullName.trim();
            try {
              await AsyncStorage.setItem("CurrentUserName", normalizedName);
            } catch (error) {
              console.warn("Failed to save user name", error);
            }
            navigation.navigate("UserDashboard", {
              source: "signup",
              userName: normalizedName,
            });
          }}
          topGap={TOP_GAP}
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
  },

  kavWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  whiteCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: rs(36),
    borderTopRightRadius: rs(36),
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.85,
    // subtle upward shadow for the card lift
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: -vs(3) },
    elevation: 8,
  },

  scroll: {
    paddingHorizontal: rs(26),
    paddingTop: vs(36),
    paddingBottom: vs(36),
  },

  title: {
    fontSize: rf(26),
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: vs(28),
    letterSpacing: -0.3,
  },

  // ─── Shadow Shell ───────────────────────────────────────────────────────────
  // Matches screenshot: wide, very soft, light-gray shadow ONLY at the bottom.
  // The pill itself has no shadow — all shadow lives on this wrapper.
  shadowShell: {
    paddingBottom: vs(12),      // space below pill for shadow to render fully
    paddingHorizontal: rs(2),   // tiny horizontal room so shadow isn't clipped
    marginBottom: vs(2),
    // iOS
    shadowColor: "#A0A0A0",     // gray (not black) → lighter, truer to image
    shadowOffset: { width: 0, height: vs(10) },   // pure downward
    shadowOpacity: 0.22,         // visible but not harsh
    shadowRadius: rs(8),        // wide spread — bleeds far below the box
    // Android
    elevation: 20,           // Android's shadow is naturally bottom-biased, so no offset needed
    overflow: "visible",
    backgroundColor: "transparent",
  },

  // ─── Pill itself ────────────────────────────────────────────────────────────
  inputWrapper: {
    borderRadius: rs(18),
    backgroundColor: "#F3F3F3",
    overflow: "hidden", // clips the TextInput to the rounded pill
  },

  input: {
    paddingHorizontal: rs(22),
    paddingVertical: Platform.OS === "ios" ? vs(17) : vs(15),
    fontSize: rf(15),
    color: "#333333",
    backgroundColor: "transparent",
  },

  inputErr: {
    borderWidth: rs(1.5),
    borderColor: "#FF5A5A",
  },

  spacer: {
    height: vs(16),
  },

  err: {
    color: "#FF5A5A",
    fontSize: rf(12),
    marginTop: vs(4),
    marginBottom: vs(8),
    marginLeft: rs(4),
    fontWeight: "500",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(4),
    marginBottom: vs(22),
    marginLeft: rs(2),
  },

  checkbox: {
    width: rs(17),
    height: rs(17),
    borderRadius: rs(3),
    borderWidth: rs(1.5),
    borderColor: "#C0C0C0",
    marginRight: rs(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  checked: {
    backgroundColor: "#7B5FEB",
    borderColor: "#7B5FEB",
  },

  termsText: {
    fontSize: rf(14),
    color: "#555",
  },

  termsLink: {
    fontSize: rf(14),
    color: "#7B5FEB",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  btnWrap: {
    alignItems: "center",
    marginBottom: vs(22),
  },

  btnShadow: {
    borderRadius: rs(50),
    shadowColor: "#7B5FEB",
    shadowOpacity: 0.42,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(5) },
    elevation: 8,
  },

  signInBtn: {
    borderRadius: rs(50),
    paddingVertical: vs(16),
    paddingHorizontal: rs(80),
    alignItems: "center",
    justifyContent: "center",
  },

  signInText: {
    color: "#fff",
    fontSize: rf(17),
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  divRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vs(18),
    paddingHorizontal: rs(20),
  },

  divLine: {
    width: rs(55),
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  divText: {
    marginHorizontal: rs(10),
    fontSize: rf(13),
    color: "#AAAAAA",
    fontWeight: "500",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: rs(35),
    marginBottom: vs(26),
  },

  socialBtn: {
    width: rs(30),
    height: rs(30),
    alignItems: "center",
    justifyContent: "center",
  },

  socialIcon: {
    width: rs(30),
    height: rs(30),
    resizeMode: "contain",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    fontSize: rf(14),
    color: "#888",
  },

  loginLink: {
    fontSize: rf(14),
    color: "#7B5FEB",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});