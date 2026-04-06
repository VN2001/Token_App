import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, StatusBar,
  TouchableWithoutFeedback, Keyboard, Image, Dimensions,
} from 'react-native';
import OtpModal from '../../components/OtpModal';
import Svg, { Path } from 'react-native-svg';
import { rs, vs, rf } from "../../utils/responsive";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = vs(160);

const CheckMark = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12"
      stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PillInput = ({ errorStyle, ...props }) => (
  // shadowClip trims left/right shadow bleed on iOS so only bottom shadow shows
  <View style={s.shadowClip}>
    <View style={[s.inputWrapper, errorStyle]}>
      <TextInput
        style={s.input}
        placeholderTextColor="#B0B0B8"
        {...props}
      />
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
        <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.kavWrapper}
        >
          {/* White card sitting on grey background */}
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
                ? <Text style={[s.err, { marginTop: -8, marginBottom: 10 }]}>⚠ {errors.agreed}</Text>
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
                <Text style={s.divText}>  or  </Text>
                <View style={s.divLine} />
              </View>

              {/* Social — bare icons, no background box */}
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

  // Grey background visible behind card
  root: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },

  kavWrapper: {
    flex: 1,
    justifyContent: 'flex-end',   // card sits at bottom, grey shows at top
  },

  // White card with visible rounded top corners on grey bg
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(36),
    borderTopRightRadius: rs(36),
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.85,  // grey peeks at top
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: -vs(3) },
    elevation: 8,
  },

  scroll: {
    paddingHorizontal: rs(26),
    paddingTop: vs(36),
    paddingBottom: vs(36),
  },

  // Title
  title: {
    fontSize: rf(26),
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: vs(28),
    letterSpacing: -0.3,
  },

  // Input — pill shaped with more radius
  inputWrapper: {
    borderRadius: rs(18),
    backgroundColor: '#F2F2F2',
    // Bottom-only shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: vs(4) },  // only downward
    shadowOpacity: 0.10,
    shadowRadius: rs(4),
    elevation: 3,
  },

  input: {
    borderRadius: rs(18),
    paddingHorizontal: rs(22),
    paddingVertical: Platform.OS === 'ios' ? vs(17) : vs(15),
    fontSize: rf(15),
    color: '#333333',
    backgroundColor: 'transparent',
  },

  inputErr: {
    borderWidth: rs(1.5),
    borderColor: '#FF5A5A',
  },

  // Clips left/right shadow — only bottom shadow shows
  shadowClip: {
    overflow: "hidden",
    paddingBottom: 6,
    marginBottom: 0,
  },

  // More vertical space between fields
  spacer: {
    height: vs(16),
  },

  err: {
    color: '#FF5A5A',
    fontSize: rf(12),
    marginTop: vs(4),
    marginBottom: vs(8),
    marginLeft: rs(4),
    fontWeight: '500',
  },

  // Terms row
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(4),
    marginBottom: vs(22),
    marginLeft: rs(2),
  },

  checkbox: {
    width: rs(17),
    height: rs(17),
    borderRadius: rs(3),
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

  termsText: {
    fontSize: rf(14),
    color: '#555',
  },

  termsLink: {
    fontSize: rf(14),
    color: '#7B5FEB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Sign In button — wider pill
  btnWrap: {
    alignItems: 'center',
    marginBottom: vs(22),
  },

  signInBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: rs(50),
    paddingVertical: vs(16),
    paddingHorizontal: rs(80),     // wider than before
    alignItems: 'center',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.38,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 7,
  },

  signInText: {
    color: '#fff',
    fontSize: rf(17),
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Divider
  divRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(18),
    paddingHorizontal: rs(10),
  },

  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  divText: {
    fontSize: rf(13),
    color: '#AAAAAA',
    fontWeight: '500',
  },

  // Social — NO background box, just icons
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rs(35),
    marginBottom: vs(26),
  },

  socialBtn: {
    width: rs(30),
    height: rs(30),
    alignItems: 'center',
    justifyContent: 'center',
    // no backgroundColor — bare icons
  },

  socialIcon: {
    width: rs(30),
    height: rs(30),
    resizeMode: 'contain',
  },

  // Login link
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: rf(14),
    color: '#888',
  },

  loginLink: {
    fontSize: rf(14),
    color: '#7B5FEB',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});