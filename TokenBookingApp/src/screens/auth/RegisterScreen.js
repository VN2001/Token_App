import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import OtpModal from '../../components/OtpModal';
import Svg, { Path } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = 200;

const CheckMark = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PillInput = ({ errorStyle, ...props }) => (
  <View style={s.shadowRight}>
    <View style={s.shadowLeft}>
      <TextInput style={[s.input, errorStyle]} placeholderTextColor="#B0B0B8" {...props} />
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
    // ✅ FIX 1: Outer TouchableWithoutFeedback dismisses keyboard on tap outside inputs
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={s.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#E5E5EA" />
        <View style={s.greyTop} />

        {/* ✅ FIX 2: behavior={undefined} on Android — disables broken height adjustment
                    that leaves a phantom gap when keyboard closes. iOS keeps 'padding'. */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.kavWrapper}
        >
          <View style={s.whiteCard}>
            <ScrollView
              contentContainerStyle={s.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="interactive"  // ✅ FIX 3: Smooth dismiss, no stale space
            >
              <Text style={s.title}>Create Account</Text>

              <PillInput
                placeholder="Full name"
                value={fullName}
                onChangeText={t => { setFullName(t); clear('fullName'); }}
                autoCapitalize="words"
                autoCorrect={false}
                errorStyle={errors.fullName ? s.inputErr : null}
              />
              {errors.fullName ? <Text style={s.err}>⚠ {errors.fullName}</Text> : <View style={s.spacer} />}

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

              <PillInput
                placeholder="Contact"
                value={contact}
                onChangeText={t => { setContact(t); clear('contact'); }}
                keyboardType="phone-pad"
                maxLength={15}
                errorStyle={errors.contact ? s.inputErr : null}
              />
              {errors.contact ? <Text style={s.err}>⚠ {errors.contact}</Text> : <View style={s.spacer} />}

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

              <View style={s.btnWrap}>
                <TouchableOpacity style={s.signInBtn} onPress={handleSignIn} activeOpacity={0.85}>
                  <Text style={s.signInText}>Sign In</Text>
                </TouchableOpacity>
              </View>

              <View style={s.divRow}>
                <View style={s.divLine} />
                <Text style={s.divText}>or</Text>
                <View style={s.divLine} />
              </View>

              <View style={s.socialRow}>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image source={require('../../../assets/icons/google.png')} style={s.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                  <Image source={require('../../../assets/icons/apple.png')} style={s.socialIcon} />
                </TouchableOpacity>
              </View>

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
  root: { flex: 1, backgroundColor: '#E5E5EA' },
  greyTop: { position: 'absolute', top: 0, left: 0, right: 0, height: TOP_GAP, backgroundColor: '#E5E5EA' },
  kavWrapper: { position: 'absolute', top: TOP_GAP, left: 0, right: 0, bottom: 0 },
  whiteCard: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 }, elevation: 10,
  },
  scroll: { paddingHorizontal: 26, paddingTop: 36, paddingBottom: 40 },
  title: { fontSize: 27, fontWeight: '900', color: '#111', textAlign: 'center', marginBottom: 32, letterSpacing: -0.4 },
  shadowRight: { borderRadius: 50, backgroundColor: '#F2F2F7', shadowColor: '#000', shadowOpacity: 0.13, shadowRadius: 5, shadowOffset: { width: 7, height: 0 }, elevation: 3 },
  shadowLeft:  { borderRadius: 50, backgroundColor: '#F2F2F7', shadowColor: '#000', shadowOpacity: 0.13, shadowRadius: 5, shadowOffset: { width: -7, height: 0 }, elevation: 3 },
  input: { borderRadius: 50, paddingHorizontal: 22, paddingVertical: Platform.OS === 'ios' ? 16 : 14, fontSize: 15, color: '#111', backgroundColor: '#F2F2F7' },
  inputErr: { borderWidth: 1.5, borderColor: '#FF5A5A', backgroundColor: '#FFF4F4' },
  spacer: { height: 14 },
  err: { color: '#FF5A5A', fontSize: 12, marginTop: 5, marginBottom: 8, marginLeft: 6, fontWeight: '500' },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderRadius: 5, borderWidth: 1.8, borderColor: '#C0C0C0', marginRight: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  checked: { backgroundColor: '#7B5FEB', borderColor: '#7B5FEB' },
  termsText: { fontSize: 14, color: '#444' },
  termsLink: { fontSize: 14, color: '#7B5FEB', fontWeight: '600', textDecorationLine: 'underline' },
  btnWrap: { alignItems: 'center', marginBottom: 24 },
  signInBtn: { backgroundColor: '#7B5FEB', borderRadius: 50, paddingVertical: 16, paddingHorizontal: 64, minWidth: 200, alignItems: 'center', shadowColor: '#7B5FEB', shadowOpacity: 0.45, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 7 },
  signInText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.2 },
  divRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  divLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  divText: { marginHorizontal: 14, fontSize: 14, color: '#AAAAAA' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: 28 },
  socialBtn: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  socialIcon: { width: 28, height: 28, resizeMode: 'contain' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: '#888' },
  loginLink: { fontSize: 14, color: '#7B5FEB', fontWeight: '700' },
});