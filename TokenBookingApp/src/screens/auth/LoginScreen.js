import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import OtpModal from '../../components/OtpModal';
import Svg, { Path } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = 200;

const CheckMark = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

const PillInput = ({ errorStyle, ...props }) => (
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

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile]         = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors]         = useState({});
  const [showOtp, setShowOtp]       = useState(false);

  const isValidPhone = (v) => /^\d{10}$/.test(v.replace(/[^\d]/g, ''));

  const validate = () => {
    const e = {};
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
        <StatusBar barStyle="dark-content" backgroundColor="#E5E5EA" />
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

              <View style={s.inputBlock}>
                <PillInput
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChangeText={t => { setMobile(t); clear('mobile'); }}
                  keyboardType="phone-pad"
                  maxLength={15}
                  errorStyle={errors.mobile ? s.inputErr : null}
                />
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

              <Text style={s.otpInfo}>
                A 4 digit OTP will be sent to via SMS to verify your mobile number
              </Text>

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

        <OtpModal
          visible={showOtp}
          phone={mobile}
          onClose={() => setShowOtp(false)}
          onVerify={(code) => {
            setShowOtp(false);
            navigation?.navigate('UserDashboard');
          }}
          topGap={TOP_GAP}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5EA',
  },
  greyTop: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: TOP_GAP,
    backgroundColor: '#E5E5EA',
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
  },
  inputBlock: {
    marginBottom: 8,
  },
  shadowRight: {
    borderRadius: 50,
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 5,
    shadowOffset: { width: 7, height: 0 },
    elevation: 3,
  },
  shadowLeft: {
    borderRadius: 50,
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 5,
    shadowOffset: { width: -7, height: 0 },
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
  err: {
    color: '#FF5A5A',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 6,
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
  otpInfo: {
    fontSize: 13,
    color: '#555',
    marginBottom: 32,
    marginLeft: 4,
    lineHeight: 19,
  },
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
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
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