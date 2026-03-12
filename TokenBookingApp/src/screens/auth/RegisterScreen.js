import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OtpModal from '../../components/OtpModal';
import Svg, { Path, Line } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = 160;

const CheckMark = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PillInput = ({ errorStyle, label, ...props }) => (
  <View style={s.shadowClip}>
    <View style={s.inputWrapper}>
      <LinearGradient
        colors={['#f6f6f6', '#f6f6f6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[s.gradientInput, errorStyle]}
      >
        <TextInput
          style={s.input}
          placeholderTextColor="#B0B0B8"
          {...props}
        />
      </LinearGradient>
    </View>
  </View>
);

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
    setShowOtp(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={s.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
        <View style={s.greyTop} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
                onChangeText={t => { setFullName(t); clear('fullName'); }}
                autoCapitalize="words"
                autoCorrect={false}
                errorStyle={errors.fullName ? s.inputErr : null}
              />
              {errors.fullName ? <Text style={s.err}>⚠ {errors.fullName}</Text> : <View style={s.spacer} />}

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
              {errors.email ? <Text style={s.err}>⚠ {errors.email}</Text> : <View style={s.spacer} />}

              {/* Contact */}
              <PillInput
                placeholder="Contact"
                value={contact}
                onChangeText={t => { setContact(t); clear('contact'); }}
                keyboardType="phone-pad"
                maxLength={15}
                errorStyle={errors.contact ? s.inputErr : null}
              />
              {errors.contact ? <Text style={s.err}>⚠ {errors.contact}</Text> : <View style={s.spacer} />}

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

              {/* Divider */}
              <View style={s.divRow}>
                <View style={s.divLine} />
                <View style={s.orBubble}>
                  <Text style={s.divText}>or</Text>
                </View>
                <View style={s.divLine} />
              </View>

              {/* Social */}
              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image source={require('../../../assets/icons/google.png')} style={s.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image source={require('../../../assets/icons/apple.png')} style={s.socialIcon} />
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
            navigation.navigate('UserDashboard');
          }}
          topGap={TOP_GAP}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f6f6f6' },
  greyTop: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: TOP_GAP, backgroundColor: '#f6f6f6',
  },
  kavWrapper: { position: 'absolute', top: TOP_GAP, left: 0, right: 0, bottom: 0 },
  whiteCard: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40, borderTopRightRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 }, elevation: 10,
  },
  scroll: { paddingHorizontal: 26, paddingTop: 36, paddingBottom: 40 },

  // Title: size 60, color #707070
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: -1,
    lineHeight: 68,
  },

  // Input wrapper with drop shadow (transparency 20 = ~0.20 opacity)
shadowClip: {
  overflow: 'hidden',
  paddingBottom: 8,      // gives room for bottom shadow to show
  paddingHorizontal: 0,
  marginBottom: 0,
},
inputWrapper: {
  borderRadius: 100,
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 3,           // smaller radius = tighter shadow
  shadowOffset: { width: 0, height: 6 },  // push shadow purely downward
  elevation: 4,
},

  // Gradient input container with radius 47
  gradientInput: {
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Text input: color #707070, size 32
  input: {
    borderRadius: 18,
    paddingHorizontal: 26,
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    fontSize: 16,
    color: '#707070',
    backgroundColor: 'transparent',
  },

  inputErr: {
    borderWidth: 1.5,
    borderColor: '#FF5A5A',
  },

  spacer: { height: 14 },
  err: {
    color: '#FF5A5A', fontSize: 13, marginTop: 5,
    marginBottom: 8, marginLeft: 8, fontWeight: '500',
  },

  // Terms row: text size 25
  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 24,marginLeft:10 },
  checkbox: {
    width: 18, height: 18, borderRadius: 2, borderWidth: 1.8,
    borderColor: '#C0C0C0', marginRight: 10, alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#fff',
  },
  checked: { backgroundColor: '#7B5FEB', borderColor: '#7B5FEB' },
  termsText: { fontSize: 16, color: '#444' },
  termsLink: { fontSize: 16, color: '#7B5FEB', fontWeight: '600', textDecorationLine: 'underline' },

  // Sign In button: text size 32
  btnWrap: { alignItems: 'center', marginBottom: 24 },
  signInBtn: {
    backgroundColor: '#7B5FEB', borderRadius: 50,
    paddingVertical: 18, paddingHorizontal: 64, minWidth: 220,
    alignItems: 'center',
    shadowColor: '#7B5FEB', shadowOpacity: 0.45,
    shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 7,
  },
  signInText: { color: '#fff', fontSize: 20, fontWeight: '700', letterSpacing: 0.2 },

  // Divider: "or" with cropped lines — white bubble masks the line behind text
  divRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 18, position: 'relative',
  },
  divLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    zIndex: 1,
  },
  divText: { fontSize: 18, color: '#AAAAAA', fontWeight: '500' },

  // Social
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: 28 },
  socialBtn: {
    width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  socialIcon: { width: 30, height: 30, resizeMode: 'contain' },

  // Login
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: '#888' },
  loginLink: { fontSize: 14, color: '#7B5FEB', fontWeight: '700' },
});