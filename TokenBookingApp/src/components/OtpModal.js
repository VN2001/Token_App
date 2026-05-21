import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { rs, vs, rf } from "../utils/responsive";

const BackArrow = () => (
  <Svg width={rs(20)} height={vs(20)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#2A2A2A"
      strokeWidth="3" // stronger arrow
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OtpModal = ({ visible, phone, onClose, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(143);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (visible) {
      setOtp(["", "", "", ""]);
      setTimer(143);
      setFocusedIndex(0);
      setTimeout(() => inputRefs.current[0]?.focus(), 400);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [visible, timer]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleChange = (text, i) => {
    const d = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 3) {
      inputRefs.current[i + 1]?.focus();
      setFocusedIndex(i + 1);
    }
  };

  const handleKey = (e, i) => {
    if (e.nativeEvent.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
      setFocusedIndex(i - 1);
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length < 4) {
      Alert.alert("Error", "Please enter the complete 4-digit OTP");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify(code);
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(143);
    setOtp(["", "", "", ""]);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
    Alert.alert("OTP Resent", "A new code has been sent.");
  };

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Gradient fills the entire screen, sits behind everything */}
      <LinearGradient
        colors={["#e7dbff", "#f5f1ff", "#f4efff", "#ffffff", "#f6f2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screen}
      >
        {/*
          KeyboardAvoidingView shrinks the available space above the keyboard.
          ScrollView lets the inner content scroll up so nothing overlaps.
          TouchableWithoutFeedback wraps the scroll content to dismiss keyboard on tap.
        */}
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Go Back — absolutely pinned to top-left, never moves */}
          <View style={styles.header} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.backBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <View style={styles.arrowWrap}>
                <BackArrow />
              </View>

              <Text style={styles.backText}>Go Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                {/* Title block — sits below the Go Back header area */}
                <Text style={styles.title}>Check your phone</Text>
                <Text style={styles.subtitle}>
                  We've send a code to your number
                </Text>

                {/* OTP Boxes */}
                <View style={styles.otpRow}>
                  {otp.map((v, i) => (
                    <View
                      key={i}
                      style={[
                        styles.boxWrapper,
                        focusedIndex === i && styles.boxFocused,
                      ]}
                    >
                      <TextInput
                        ref={(el) => (inputRefs.current[i] = el)}
                        style={styles.boxInput}
                        value={v}
                        onChangeText={(t) => handleChange(t, i)}
                        onKeyPress={(e) => handleKey(e, i)}
                        onFocus={() => setFocusedIndex(i)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectTextOnFocus
                        caretHidden
                      />
                    </View>
                  ))}
                </View>

                {/* Timer */}
                <Text style={styles.timer}>
                  Code expires in :{" "}
                  <Text style={styles.timerBold}>{fmt(timer)}</Text>
                </Text>

                {/* Verify Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.85}
                  style={styles.btnWrapper}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#8b5cf6", "#7c3aed"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.btn}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.btnText}>Verify Code</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Resend Button */}
                <TouchableOpacity
                  onPress={handleResend}
                  activeOpacity={0.85}
                  style={styles.btnWrapper}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#8b5cf6", "#7c3aed"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.btn}
                  >
                    <Text style={styles.btnText}>Resend Code</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Bottom home indicator spacer */}
                <View style={styles.bottomSpacer} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ── Screen & KAV ───────────────────
  screen: {
    flex: 1,
  },

  kav: {
    flex: 1,
  },

  // ── Go Back header — sits above scroll, never moves ──
  header: {
    position: "absolute",
    top: vs(58),
    left: rs(20),
    zIndex: 10,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: rs(10),
  },

  arrowWrap: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(10),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#763ef9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  backText: {
    fontFamily: "Poppins-Regular",
    fontSize: rf(15),
    color: "#4a4a4a",
    fontWeight: "700",
  },

  // ── ScrollView content ─────────────
  // minHeight: full screen so content stays centered when keyboard is closed
  scrollContent: {
    flexGrow: 1,
  },

  // inner View takes full height and centers content below the header area
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: rs(26),
    // top padding reserves space for the absolutely-positioned Go Back button
    paddingTop: vs(120),
    paddingBottom: vs(20),
  },

  // ── Titles ─────────────────────────
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: rf(22),
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: vs(8),
    fontWeight: "700",
  },

  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: rf(14),
    color: "#6b6b6b",
    textAlign: "center",
    marginBottom: vs(40),
  },

  // ── OTP Boxes ──────────────────────
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: rs(14),
    marginBottom: vs(28),
  },

  boxWrapper: {
    width: rs(50),
    height: rs(50),
    borderRadius: rs(18),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#763ef9",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: rs(1.5),
    borderColor: "transparent",
  },

  boxFocused: {
    borderColor: "#7c3aed",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  boxInput: {
    width: "100%",
    height: "100%",
    fontFamily: "Poppins-SemiBold",
    fontSize: rf(26),
    color: "#1a1a1a",
    textAlign: "center",
    borderRadius: rs(18),
    backgroundColor: "transparent",
  },

  // ── Timer ──────────────────────────
  timer: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: rf(14),
    color: "#6b6b6b",
    marginBottom: vs(32),
  },

  timerBold: {
    fontFamily: "Poppins-Bold",
    color: "#3d3d3d",
    fontWeight: "700",
  },

  // ── Buttons ────────────────────────
  btnWrapper: {
  width: rs(250),
  alignSelf: "center",
  marginBottom: vs(14),
  borderRadius: rs(100),
  overflow: "hidden",
  shadowColor: "#7c3aed",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 12,
  elevation: 5,
},

  btn: {
    borderRadius: rs(100),
    paddingVertical: vs(16),
    alignItems: "center",
  },

  btnText: {
    fontFamily: "Poppins-SemiBold",
    color: "#ffffff",
    fontSize: rf(16),
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // ── Bottom spacer ──────────────────
  bottomSpacer: {
    height: vs(34),
  },
});

export default OtpModal;
