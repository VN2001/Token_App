import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = 160;

const CheckMark = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

const PillInput = ({ errorStyle, ...props }) => (
  <LinearGradient
    colors={['#f6f6f6', '#f6f6f6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[s.gradientWrapper, errorStyle]}
  >
    <TextInput
      style={[s.input, errorStyle]}
      placeholderTextColor="#B0B0B8"
      {...props}
    />
  </LinearGradient>
);

export default function LoginScreen({ navigation }) {
  const [fullName, setFullName]     = useState('');
  const [mobile, setMobile]         = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors]         = useState({});
  const [showOtp, setShowOtp]       = useState(false);

  const isValidPhone = (v) => /^\d{10}$/.test(v.replace(/[^\d]/g, ''));

  const validate = () => {
    const e = {};
    if (!fullName.trim())           e.fullName = 'Full name is required';
    if (!mobile.trim())             e.mobile = 'Mobile number is required';
    else if (!isValidPhone(mobile)) e.mobile = 'Enter a valid 10-digit number';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const clear = (f) => errors[f] && setErrors(p => ({ ...p, [f]: '' }));

  const handleLogin = () => {
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
              <Text style={s.title}>Log in</Text>
              <Text style={s.subtitle}>Hi Welcome back, you've been missed</Text>

              {/* Full Name Field */}
              <View style={s.inputBlock}>
                <View style={s.shadowWrap}>
                  <PillInput
                    placeholder="Full name"
                    value={fullName}
                    onChangeText={t => { setFullName(t); clear('fullName'); }}
                    autoCapitalize="words"
                    returnKeyType="next"
                    errorStyle={errors.fullName ? s.inputErr : null}
                  />
                </View>
                {errors.fullName
                  ? <Text style={s.err}>⚠ {errors.fullName}</Text>
                  : null
                }
              </View>

              {/* Mobile Field */}
              <View style={s.inputBlock}>
                <View style={s.shadowWrap}>
                  <PillInput
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChangeText={t => { setMobile(t); clear('mobile'); }}
                    keyboardType="phone-pad"
                    maxLength={15}
                    errorStyle={errors.mobile ? s.inputErr : null}
                  />
                </View>
                {errors.mobile
                  ? <Text style={s.err}>⚠ {errors.mobile}</Text>
                  : null
                }
              </View>

              {/* Remember me */}
              <TouchableOpacity
                style={s.rememberRow}
                onPress={() => setRememberMe(p => !p)}
                activeOpacity={0.75}
              >
                <View style={[s.checkbox, rememberMe && s.checked]}>
                  {rememberMe && <CheckMark />}
                </View>
                <Text style={s.rememberText}>Remember me</Text>
              </TouchableOpacity>

              

              {/* Login Button */}
              <View style={s.btnWrap}>
                <TouchableOpacity style={s.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
                  <Text style={s.loginBtnText}>Log in</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={s.divRow}>
                <View style={s.divLine} />
                <Text style={s.divText}>or</Text>
                <View style={s.divLine} />
              </View>

              {/* Social Buttons */}
              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image
                    source={require('../../../assets/icons/google.png')}
                    style={s.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image
                    source={require('../../../assets/icons/apple.png')}
                    style={s.socialIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Sign up link */}
              <View style={s.signupRow}>
                <Text style={s.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
                  <Text style={s.signupLink}>Sign in</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f6f6',           // ← updated background
  },
  greyTop: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: TOP_GAP,
    backgroundColor: '#f6f6f6',           // ← matches root bg
  },
  kavWrapper: {
    position: 'absolute', top: TOP_GAP, left: 0, right: 0, bottom: 0,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  scroll: {
    paddingHorizontal: 26,
    paddingTop: 40,
    paddingBottom: 48,
  },

  // ── Typography ──────────────────────────────────────────────
  title: {
    fontSize: 40,                         // ← updated
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -1,
    fontFamily:"Poppins_600SemiBold"
  },
  subtitle: {
    fontSize: 18,                         // ← updated
    color: '#707070',                     // ← updated
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
  },

  // ── Inputs ──────────────────────────────────────────────────
  inputBlock: {
    marginBottom: 14,
  },
  shadowWrap: {
    borderRadius: 20,
    // Drop shadow — 20% transparency = rgba(0,0,0,0.20)
    shadowColor: '#000',
    shadowOpacity: 0.20,                  // ← 20% transparency
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  gradientWrapper: {
    borderRadius: 47,                     // ← updated radius
    overflow: 'hidden',
  },
  input: {
    borderRadius: 20,                     // ← updated radius
    paddingHorizontal: 22,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 16,                         // ← updated (matching full name spec)
    color: '#707070',                     // ← updated text color
    backgroundColor: 'transparent',      // let LinearGradient show through
  },
  inputErr: {
    borderWidth: 1.5,
    borderColor: '#FF5A5A',
  },
  err: {
    color: '#FF5A5A',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 6,
    fontWeight: '500',
  },

  // ── Remember Me ─────────────────────────────────────────────
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
    marginLeft: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#C0C0C0',
    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#7B5FEB',
    borderColor: '#7B5FEB',
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },


  // ── Button ──────────────────────────────────────────────────
  btnWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  loginBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: 50,
    paddingVertical: 17,
    paddingHorizontal: 80,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
    marginTop:65,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Divider / Social / Signup ────────────────────────────────
  divRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  divText: {
    marginHorizontal: 14,
    fontSize: 14,
    color: '#AAAAAA',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 32,
  },
  socialBtn: {
    width: 52,
    height: 52,
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
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#888',
  },
  signupLink: {
    fontSize: 14,
    color: '#7B5FEB',
    fontWeight: '700',
  },
});