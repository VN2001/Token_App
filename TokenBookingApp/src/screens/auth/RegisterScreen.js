import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = 200;

// ─── Icons ──────────────────────────────────────────────────────────────────────

const BackArrow = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckMark = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Pill Input with side-only shadow ──────────────────────────────────────────

const PillInput = ({ style, errorStyle, ...props }) => (
  <View style={s.shadowRight}>
    <View style={s.shadowLeft}>
      <TextInput
        style={[s.input, errorStyle]}
        placeholderTextColor="#B0B0B8"
        {...props}
      />
    </View>
  </View>
);

// ─── OTP Modal ───────────────────────────────────────────────────────────────────

const OtpModal = ({ visible, phone, onClose, onVerify }) => {
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
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [visible, timer]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleChange = (text, i) => {
    const d = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp]; next[i] = d; setOtp(next);
    if (d && i < 3) { inputRefs.current[i + 1]?.focus(); setFocusedIndex(i + 1); }
  };

  const handleKey = (e, i) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus(); setFocusedIndex(i - 1);
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length < 4) { Alert.alert('Error', 'Please enter the complete 4-digit OTP'); return; }
    setLoading(true);
    // ✅ TODO: Replace → await verifyOtp(phone, code)
    setTimeout(() => { setLoading(false); onVerify(code); }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(143); setOtp(['', '', '', '']);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
    // ✅ TODO: Replace → await sendOtp(phone)
    Alert.alert('OTP Resent', 'A new code has been sent.');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={otp_s.overlay}>
          <View style={otp_s.topBar} />
          <View style={otp_s.card}>
            <TouchableOpacity style={otp_s.backBtn} onPress={onClose}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={otp_s.title}>Check your phone</Text>
            <Text style={otp_s.subtitle}>We've send a code to your number</Text>

            <View style={otp_s.otpRow}>
              {otp.map((v, i) => (
                <TextInput
                  key={i}
                  ref={el => (inputRefs.current[i] = el)}
                  style={[otp_s.box, focusedIndex === i && otp_s.boxFocused]}
                  value={v}
                  onChangeText={t => handleChange(t, i)}
                  onKeyPress={e => handleKey(e, i)}
                  onFocus={() => setFocusedIndex(i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                  caretHidden
                />
              ))}
            </View>

            <Text style={otp_s.timer}>
              Code expires in : <Text style={otp_s.timerBold}>{fmt(timer)}</Text>
            </Text>

            <TouchableOpacity style={otp_s.btn} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={otp_s.btnText}>Submit</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={[otp_s.btn, otp_s.resendBtn, timer > 0 && otp_s.resendDisabled]}
              onPress={handleResend}
              activeOpacity={0.85}
            >
              <Text style={otp_s.btnText}>Send again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// ─── Main Register Screen ────────────────────────────────────────────────────────

export default function RegisterForm({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [contact, setContact]   = useState('');
  const [agreed, setAgreed]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [showOtp, setShowOtp]   = useState(false);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v) => /^\d{10}$/.test(v.replace(/[^\d]/g, ''));

  const validate = () => {
    const e = {};
    if (!fullName.trim())            e.fullName = 'Full name is required';
    if (!email.trim())               e.email    = 'Email is required';
    else if (!isValidEmail(email))   e.email    = 'Enter a valid email';
    if (!contact.trim())             e.contact  = 'Contact is required';
    else if (!isValidPhone(contact)) e.contact  = 'Enter a valid 10-digit number';
    if (!agreed)                     e.agreed   = 'Please accept the terms';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const clear = (f) => errors[f] && setErrors(p => ({ ...p, [f]: '' }));

  const handleSignIn = () => {
    if (!validate()) return;
    // ✅ TODO: Call your OTP send API → sendOtp(contact)
    setShowOtp(true);
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#E5E5EA" />
      <View style={s.greyTop} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.kavWrapper}
      >
        <View style={s.whiteCard}>
          <ScrollView
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={s.title}>Create Account</Text>

            {/* Full Name */}
            <PillInput
              placeholder="Full name"
              value={fullName}
              onChangeText={t => { setFullName(t); clear('fullName'); }}
              autoCapitalize="words"
              autoCorrect={false}
              errorStyle={errors.fullName ? s.inputErr : null}
            />
            {errors.fullName
              ? <Text style={s.err}>⚠ {errors.fullName}</Text>
              : <View style={s.spacer} />
            }

            {/* Email */}
            <PillInput
              placeholder="Email"
              value={email}
              onChangeText={t => { setEmail(t); clear('email'); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              errorStyle={errors.email ? s.inputErr : null}
            />
            {errors.email
              ? <Text style={s.err}>⚠ {errors.email}</Text>
              : <View style={s.spacer} />
            }

            {/* Contact */}
            <PillInput
              placeholder="Contact"
              value={contact}
              onChangeText={t => { setContact(t); clear('contact'); }}
              keyboardType="phone-pad"
              maxLength={15}
              errorStyle={errors.contact ? s.inputErr : null}
            />
            {errors.contact
              ? <Text style={s.err}>⚠ {errors.contact}</Text>
              : <View style={s.spacer} />
            }

            {/* Terms */}
            <View style={s.termsRow}>
              <TouchableOpacity
                style={[s.checkbox, agreed && s.checked]}
                onPress={() => { setAgreed(p => !p); clear('agreed'); }}
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
              ? <Text style={[s.err, { marginTop: -12, marginBottom: 10 }]}>⚠ {errors.agreed}</Text>
              : null
            }

            {/* Sign In Button */}
            <View style={s.btnWrap}>
              <TouchableOpacity style={s.signInBtn} onPress={handleSignIn} activeOpacity={0.85}>
                <Text style={s.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* OR Divider */}
            <View style={s.divRow}>
              <View style={s.divLine} />
              <Text style={s.divText}>or</Text>
              <View style={s.divLine} />
            </View>

            {/* Social Icons — use your own images */}
            <View style={s.socialRow}>
              <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                <Image
                  source={require('../../../assets/icons/google.png')} // 👈 your path
                  style={s.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                <Image
                  source={require('../../../assets/icons/apple.png')} // 👈 your path
                  style={s.socialIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={s.loginRow}>
              <Text style={s.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
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
        onVerify={(code) => {
          setShowOtp(false);
           navigation.navigate('UserDashboard') 
          
        }}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5EA',
  },
  greyTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: TOP_GAP,
    backgroundColor: '#E5E5EA',
  },
  kavWrapper: {
    position: 'absolute',
    top: TOP_GAP,
    left: 0, right: 0, bottom: 0,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  scroll: {
    paddingHorizontal: 26,
    paddingTop: 36,
    paddingBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#111',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: -0.4,
  },

  // ── Pill input — two wrapper trick for left+right end shadow only ──
  shadowRight: {
    borderRadius: 50,
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 5,
    shadowOffset: { width: 7, height: 0 },   // right end shadow
    elevation: 3,
  },
  shadowLeft: {
    borderRadius: 50,
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 5,
    shadowOffset: { width: -7, height: 0 },  // left end shadow
    elevation: 3,
  },
  input: {
    borderRadius: 50,
    paddingHorizontal: 22,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#F2F2F7',
  },
  inputErr: {
    borderWidth: 1.5,
    borderColor: '#FF5A5A',
    backgroundColor: '#FFF4F4',
  },
  spacer: { height: 14 },
  err: {
    color: '#FF5A5A',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: '500',
  },

  // Terms
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  checkbox: {
    width: 20, height: 20,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#C0C0C0',
    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checked: { backgroundColor: '#7B5FEB', borderColor: '#7B5FEB' },
  termsText: { fontSize: 14, color: '#444' },
  termsLink: {
    fontSize: 14,
    color: '#7B5FEB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Sign In
  btnWrap: { alignItems: 'center', marginBottom: 24 },
  signInBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 64,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  signInText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Divider
  divRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  divLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  divText: { marginHorizontal: 14, fontSize: 14, color: '#AAAAAA' },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 28,
  },
  socialBtn: {
    width: 52, height: 52,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  // Login
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: { fontSize: 14, color: '#888' },
  loginLink: { fontSize: 14, color: '#7B5FEB', fontWeight: '700' },
});

// ─── OTP Modal Styles ─────────────────────────────────────────────────────────────

const otp_s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end' },
  topBar: { height: TOP_GAP },
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
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F0F0F5',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 22, fontWeight: '800', color: '#111',
    textAlign: 'center', marginBottom: 8,
  },
  subtitle: {
    fontSize: 14, color: '#999',
    textAlign: 'center', marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 14, marginBottom: 22,
  },
  box: {
    width: 64, height: 64, borderRadius: 12,
    backgroundColor: '#F2F2F7',
    fontSize: 24, fontWeight: '700', color: '#111',
    textAlign: 'center',
  },
  boxFocused: {
    borderWidth: 2, borderColor: '#7B5FEB',
    backgroundColor: '#F3F0FD',
  },
  timer: { textAlign: 'center', fontSize: 13, color: '#999', marginBottom: 24 },
  timerBold: { color: '#7B5FEB', fontWeight: '700' },
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
  resendBtn: { marginBottom: 0 },
  resendDisabled: { backgroundColor: '#C4B5FD' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});