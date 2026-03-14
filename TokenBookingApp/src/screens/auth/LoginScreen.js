import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

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

// Inline Google "G" icon (no asset required)
const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 48 48">
    <Path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.7 13.1 17.9 9.5 24 9.5z"/>
    <Path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9C43.7 37.5 46.5 31.4 46.5 24.5z"/>
    <Path fill="#FBBC05" d="M10.8 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.3-6.1z"/>
    <Path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.1 0-11.3-3.6-13.2-9.1l-8.3 6.1C6.9 42.6 14.8 48 24 48z"/>
    <Path fill="none" d="M0 0h48v48H0z"/>
  </Svg>
);

// Inline Apple icon
const AppleIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
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

  const validate = () => {
    const e = {};
    if (!contact.trim()) e.contact = 'Email or mobile number is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = () => {
    if (!validate()) return;
    // proceed with login / OTP flow
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={s.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />

        {/* Grey top area */}
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
              {/* Header */}
              <Text style={s.title}>Log in</Text>
              <Text style={s.subtitle}>Hi Welcome back, you've been missed</Text>

              {/* Single combined input */}
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

              {/* Spacer to push button down like in the design */}
              <View style={{ flex: 1, minHeight: 80 }} />

              {/* Log In Button — full width */}
              <TouchableOpacity style={s.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
                <Text style={s.loginBtnText}>Log In</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={s.divRow}>
                <View style={s.divLine} />
                <Text style={s.divText}>or</Text>
                <View style={s.divLine} />
              </View>

              {/* Social Buttons */}
              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <AppleIcon />
                </TouchableOpacity>
              </View>

              {/* Sign up link */}
              <View style={s.signupRow}>
                <Text style={s.signupText}>Create an account? </Text>
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
    backgroundColor: '#f2f2f2',
  },
  greyTop: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: TOP_GAP,
    backgroundColor: '#f2f2f2',
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
    paddingTop: 44,
    paddingBottom: 48,
    flexGrow: 1,
  },

  // ── Typography ──────────────────────────────────────────────
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '400',
  },

  // ── Input ───────────────────────────────────────────────────
  inputBlock: {
    marginBottom: 18,
  },
  shadowWrap: {
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  input: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 18 : 15,
    fontSize: 16,
    color: '#555',
    backgroundColor: '#f5f5f5',
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
    marginLeft: 2,
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

  // ── Button — full width ─────────────────────────────────────
  loginBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    width: '50%',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
    marginLeft: '25%',
    marginBottom: 28,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
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
    backgroundColor: '#E5E5E5',
  },
  divText: {
    marginHorizontal: 14,
    fontSize: 14,
    color: '#AAAAAA',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 36,
  },
  socialBtn: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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