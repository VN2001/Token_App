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
import Svg, { Path } from 'react-native-svg';

const BackArrow = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#333"
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
            <TouchableOpacity style={styles.backBtn} onPress={onClose}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={styles.title}>Check your phone</Text>
            <Text style={styles.subtitle}>We've send a code to your number</Text>
            <View style={styles.otpRow}>
              {otp.map((v, i) => (
                <TextInput
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  style={[styles.box, focusedIndex === i && styles.boxFocused]}
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
              ))}
            </View>
            <Text style={styles.timer}>
              Code expires in : <Text style={styles.timerBold}>{fmt(timer)}</Text>
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Submit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.resendBtn, timer > 0 && styles.resendDisabled]}
              onPress={handleResend}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Send again</Text>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 22,
  },
  box: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  boxFocused: {
    borderWidth: 2,
    borderColor: '#7B5FEB',
    backgroundColor: '#F3F0FD',
  },
  timer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    marginBottom: 24,
  },
  timerBold: {
    color: '#7B5FEB',
    fontWeight: '700',
  },
  btn: {
    backgroundColor: '#7B5FEB',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 13,
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  resendBtn: {
    marginBottom: 0,
  },
  resendDisabled: {
    backgroundColor: '#C4B5FD',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OtpModal;

