import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { InteractionManager } from 'react-native';

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeOpen = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="#7B5FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke="#7B5FEB" strokeWidth="2" />
  </Svg>
);

const EyeClosed = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12A18.45 18.45 0 015.06 5.06M9.9 4.24A9.12 9.12 0 0112 4C19 4 23 12 23 12A18.5 18.5 0 0120.71 15.71M1 1L23 23"
      stroke="#7B5FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

const BackArrow = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#7B5FEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

// 3D Shield icon — same as WelcomeScreen & SplashScreen
const ShieldIcon = ({ size = 70 }) => (
  <Svg width={size} height={size} viewBox="0 0 220 220">
    <Defs>
      <RadialGradient id="shieldGradL" cx="40%" cy="30%" r="70%">
        <Stop offset="0%" stopColor="#7DDFF5" />
        <Stop offset="60%" stopColor="#3BBFE8" />
        <Stop offset="100%" stopColor="#1A9EC8" />
      </RadialGradient>
      <RadialGradient id="rimGradL" cx="40%" cy="30%" r="70%">
        <Stop offset="0%" stopColor="#4ECDF0" />
        <Stop offset="100%" stopColor="#0E85B0" />
      </RadialGradient>
      <RadialGradient id="checkGradL" cx="40%" cy="20%" r="80%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#D8EEF5" />
      </RadialGradient>
    </Defs>
    <Ellipse cx="110" cy="205" rx="55" ry="10" fill="rgba(30,100,160,0.15)" />
    <Path
      d="M110 18 L178 46 L178 108 C178 150 148 182 110 198 C72 182 42 150 42 108 L42 46 Z"
      fill="url(#rimGradL)"
    />
    <Path
      d="M110 26 L172 52 L172 108 C172 146 144 176 110 191 C76 176 48 146 48 108 L48 52 Z"
      fill="url(#shieldGradL)"
    />
    <Path
      d="M110 36 L162 58 L162 80 C140 72 120 68 110 68 L110 36 Z"
      fill="rgba(255,255,255,0.25)"
    />
    <Path
      d="M76 108 L98 132 L148 82"
      stroke="url(#checkGradL)"
      strokeWidth="18"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

// ─── Screen Content ───────────────────────────────────────────────────────────

const TEST_EMAIL = 'test@hora.com';
const TEST_PASSWORD = 'password123';

const ScreenContent = ({ navigation }) => {
  const [email, setEmail] = useState(TEST_EMAIL);
  const [password, setPassword] = useState(TEST_PASSWORD);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!email.includes('@')) newErrors.email = 'Please enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        Alert.alert('Success', 'Welcome back! Logged in as test user.');
        navigation?.navigate('UserDashboard');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    }
  };

  const clearError = (field) => {
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.content}>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <BackArrow />
        </TouchableOpacity>

        {/* Shield badge */}
        <View style={styles.logoBadge}>
          <View style={styles.logoCircle}>
            <ShieldIcon size={70} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue with <Text style={styles.horaAccent}>Hora</Text>
          </Text>
        </View>

        <View style={styles.card}>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={[
              styles.inputWrapper,
              focusedField === 'email' && styles.inputWrapperFocused,
              errors.email && styles.inputWrapperError,
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#C4B0F8"
                value={email}
                onChangeText={(text) => { setEmail(text); clearError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={false}
                onFocus={() => InteractionManager.runAfterInteractions(() => setFocusedField('email'))}
                onBlur={() => InteractionManager.runAfterInteractions(() => setFocusedField(null))}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[
              styles.inputWrapper,
              focusedField === 'password' && styles.inputWrapperFocused,
              errors.password && styles.inputWrapperError,
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#C4B0F8"
                value={password}
                onChangeText={(text) => { setPassword(text); clearError('password'); }}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                blurOnSubmit={false}
                onFocus={() => InteractionManager.runAfterInteractions(() => setFocusedField('password'))}
                onBlur={() => InteractionManager.runAfterInteractions(() => setFocusedField(null))}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeBtn}
              >
                {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
          </View>

          <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#7B5FEB", "#6347D4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginGradient}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#7B5FEB", "#9B7FF5", "#C4B0F8", "#EDE8FC", "#FFFFFF"]}
        locations={[0, 0.25, 0.5, 0.68, 0.85]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScreenContent navigation={navigation} />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 80,
    paddingBottom: 40,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3A1EA0',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logoBadge: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
    fontFamily: 'Poppins_800ExtraBold',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
  },
  horaAccent: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#3A1EA0',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7B5FEB',
    marginBottom: 8,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: 'Poppins_700Bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0D9FB',
  },
  inputWrapperFocused: {
    borderColor: '#7B5FEB',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Poppins_400Regular',
    includeFontPadding: false,
  },
  eyeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -6,
  },
  forgotPasswordText: {
    color: '#7B5FEB',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  loginButton: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  loginGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 50,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: 'Poppins_700Bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EDE8FC',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#C4B0F8',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  signupLink: {
    color: '#7B5FEB',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
});

export default LoginScreen;