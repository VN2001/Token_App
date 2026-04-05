import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Dimensions,
} from 'react-native';
import { rs, vs, rf } from "../../utils/responsive";
import Svg, { Path } from 'react-native-svg';
import OtpModal from '../../components/OtpModal';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CheckMark = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 48 48">
    <Path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.7 13.1 17.9 9.5 24 9.5z"/>
    <Path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9C43.7 37.5 46.5 31.4 46.5 24.5z"/>
    <Path fill="#FBBC05" d="M10.8 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.3-6.1z"/>
    <Path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.1 0-11.3-3.6-13.2-9.1l-8.3 6.1C6.9 42.6 14.8 48 24 48z"/>
    <Path fill="none" d="M0 0h48v48H0z"/>
  </Svg>
);

const AppleIcon = () => (
  <Svg width="35" height="35" viewBox="0 0 24 24" fill="#000">
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </Svg>
);

const PillInput = ({ errorStyle, ...props }) => (
  <View style={[s.shadowWrap, errorStyle]}>
    <TextInput
      style={[s.input, errorStyle && { borderColor: '#FF5A5A', borderWidth: 1.5 }]}
      placeholderTextColor="#B0B0B8"
      {...props}
    />
  </View>
);

export default function LoginScreen({ navigation }) {
  const [contact, setContact]       = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors]         = useState({});
  const [showOtp, setShowOtp]       = useState(false);
const TOP_GAP = vs(160);
  const validate = () => {
    const e = {};
    if (!contact.trim()) e.contact = 'Email or mobile number is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setShowOtp(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={s.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />

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

              {/* Input */}
              <View style={s.inputBlock}>
                <PillInput
                  placeholder="Mail or Mobile number"
                  value={contact}
                  onChangeText={t => { setContact(t); setErrors({}); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  errorStyle={errors.contact ? s.inputErr : null}
                />
                {errors.contact
                  ? <Text style={s.err}>⚠ {errors.contact}</Text>
                  : null
                }
              </View>

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

              {/* Natural spacer — not flex:1 which causes oversized gap */}
              <View style={s.gap} />

              {/* Log In Button */}
              <TouchableOpacity style={s.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
                <Text style={s.loginBtnText}>Log In</Text>
              </TouchableOpacity>

              {/* Divider — fully centered */}
              <View style={s.divRow}>
                <View style={s.divLine} />
                <Text style={s.divText}>  or  </Text>
                <View style={s.divLine} />
              </View>

              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <AppleIcon />
                </TouchableOpacity>
              </View>

              <View style={s.signupRow}>
                <Text style={s.signupText}>Create an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
                  <Text style={s.signupLink}>Sign in</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        {/* ── OtpModal — identical usage to RegisterForm ── */}
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
  // Grey background — only a small peek visible at top
  root: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },

  // KAV fills full screen, card pushed to bottom so grey shows at top
  kavWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // White card — takes 88% of screen height, grey peeks at top
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(32),
    borderTopRightRadius: rs(32),
    height: SCREEN_HEIGHT * 0.88,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: -vs(3) },
    elevation: 8,
    overflow: 'hidden',
  },

  scroll: {
    paddingHorizontal: rs(26),
    paddingTop: vs(40),
    paddingBottom: vs(40),
  },

  // Title
  title: {
    fontSize: rf(28),
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: vs(8),
    letterSpacing: -0.5,
  },

  // Subtitle
  subtitle: {
    fontSize: rf(15),
    color: '#999',
    textAlign: 'center',
    marginBottom: vs(32),
    fontWeight: '400',
  },

  // Input block
  inputBlock: {
    marginBottom: vs(16),
  },

  shadowWrap: {
    borderRadius: rs(16),
    backgroundColor: '#f5f5f5',
    // Bottom-only shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: vs(4) },
    shadowRadius: rs(4),
    elevation: 3,
  },

  input: {
    borderRadius: rs(16),
    paddingHorizontal: rs(20),
    paddingVertical: Platform.OS === 'ios' ? vs(18) : vs(15),
    fontSize: rf(15),
    color: '#555',
    backgroundColor: '#f5f5f5',
  },

  inputErr: {
    borderWidth: rs(1.5),
    borderColor: '#FF5A5A',
  },

  err: {
    color: '#FF5A5A',
    fontSize: rf(12),
    marginTop: vs(5),
    marginLeft: rs(6),
    fontWeight: '500',
  },

  // Remember me
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(4),
    marginLeft: rs(2),
  },

  checkbox: {
    width: rs(18),
    height: rs(18),
    borderRadius: rs(4),
    borderWidth: rs(1.5),
    borderColor: '#C0C0C0',
    marginRight: rs(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  checked: {
    backgroundColor: '#7B5FEB',
    borderColor: '#7B5FEB',
  },

  rememberText: {
    fontSize: rf(14),
    color: '#333',
    fontWeight: '500',
  },

  // Fixed gap between remember me and button — not flex:1
  gap: {
    height: vs(80),
  },

  // Log In button — wider centered pill
  loginBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: rs(50),
    paddingVertical: vs(17),
    alignItems: 'center',
    width: '100%',              // full width like Register screen
    alignSelf: 'center',
    marginBottom: vs(26),
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.38,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 7,
  },

  loginBtnText: {
    color: '#fff',
    fontSize: rf(17),
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Divider — fully centered with equal flex lines
  divRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(20),
    paddingHorizontal: rs(40),   // equal padding both sides = centered
  },

  divLine: {
    flex: 1,                     // both lines equal flex = perfectly centered "or"
    height: 1,
    backgroundColor: '#DEDEDE',
  },

  divText: {
    fontSize: rf(13),
    color: '#AAAAAA',
    fontWeight: '400',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rs(10),
    marginBottom: vs(32),
  },

  socialBtn: {
    width: rs(56),
    height: rs(56),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Signup link
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    fontSize: rf(14),
    color: '#888',
  },

  // "Sign in" underlined to match target
  signupLink: {
    fontSize: rf(14),
    color: '#7B5FEB',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});