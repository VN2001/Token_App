import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const BackArrow = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#707070"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OtpModal = ({ visible, phone, onClose, onVerify, topGap = 200 }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(143);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (visible) {
      setOtp(['', '', '', '']);
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
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleChange = (text, i) => {
    const d = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 3) {
      inputRefs.current[i + 1]?.focus();
      setFocusedIndex(i + 1);
    }
  };

  const handleKey = (e, i) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
      setFocusedIndex(i - 1);
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP');
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
    setOtp(['', '', '', '']);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
    Alert.alert('OTP Resent', 'A new code has been sent.');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.topBar, { height: topGap }]} />
          <View style={styles.card}>

            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={onClose}>
              <BackArrow />
              <Text style={styles.backText}>Go back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Check your phone</Text>
            <Text style={styles.subtitle}>We've send a code to your number</Text>

            {/* OTP Boxes */}
            <View style={styles.otpRow}>
              {otp.map((v, i) => (
                <LinearGradient
                  key={i}
                  colors={['#f6f6f6', '#f6f6f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.boxGradient,
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
                </LinearGradient>
              ))}
            </View>

            {/* Timer */}
            <Text style={styles.timer}>
              Code expires in :{' '}
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
                colors={['#763ef9', '#814afe', '#763ff7']}
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
                colors={
                  timer > 0
                    ? ['#b89ffc', '#c4b0fd', '#b89ffc']
                    : ['#763ef9', '#814afe', '#763ff7']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Resend Code</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  topBar: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 50,
    elevation: 24,
  },

  // Back button
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  backText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16, // ~32sp scaled for typical usage; adjust if using sp units
    color: '#707070',
  },

  // Titles
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#707070',
    textAlign: 'center',
    marginBottom: 32,
  },

  // OTP Row
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 22,
  },
  boxGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFocused: {
    borderWidth: 2,
    borderColor: '#763ef9',
  },
  boxInput: {
    width: '100%',
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    borderRadius: 20,
  },

  // Timer
  timer: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 14,
    color: '#707070',
    marginBottom: 24,
  },
  timerBold: {
    fontFamily: 'Poppins-Bold',
    color: '#707070',
    fontWeight: '700',
  },

  // Buttons
  btnWrapper: {
    marginBottom: 13,
    borderRadius: 100,
    overflow: 'hidden',
  },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default OtpModal;