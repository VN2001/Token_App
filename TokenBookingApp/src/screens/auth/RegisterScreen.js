import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeOpen = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="#7B5FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
      stroke="#7B5FEB" strokeWidth="2" />
  </Svg>
);

const EyeClosed = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12A18.45 18.45 0 015.06 5.06M9.9 4.24A9.12 9.12 0 0112 4C19 4 23 12 23 12A18.5 18.5 0 0120.71 15.71M1 1L23 23"
      stroke="#7B5FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BackArrow = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#7B5FEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── InputField ───────────────────────────────────────────────────────────────

const InputField = ({
  label, placeholder, keyboardType, autoCapitalize,
  isPassword, showPw, togglePw, value, onChangeText, error
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={[
      styles.inputWrapper,
      error && styles.inputWrapperError,
    ]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#C4B0F8"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        autoCapitalize={autoCapitalize || 'none'}
        autoCorrect={false}
        secureTextEntry={isPassword && !showPw}
        blurOnSubmit={false}
      />
      {isPassword && (
        <TouchableOpacity style={styles.eyeBtn} onPress={togglePw}>
          {showPw ? <EyeOpen /> : <EyeClosed />}
        </TouchableOpacity>
      )}
    </View>
    {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
  </View>
);

// ─── RegisterForm ─────────────────────────────────────────────────────────────

const RegisterForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/[^\d]/g, ''));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => console.log('User registered:', formData) },
      ]);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <LinearGradient
      colors={["#7B5FEB", "#9B7FF5", "#C4B0F8", "#EDE8FC", "#FFFFFF"]}
      locations={[0, 0.25, 0.5, 0.68, 0.85]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
          >
            {/* Back button */}
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <BackArrow />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Sign up to get started with <Text style={styles.horaAccent}>Hora</Text>
              </Text>
            </View>

            {/* White card */}
            <View style={styles.card}>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                autoCapitalize="words"
                value={formData.fullName}
                onChangeText={(text) => updateField('fullName', text)}
                error={errors.fullName}
              />
              <InputField
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                error={errors.email}
              />
              <InputField
                label="Phone Number"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                error={errors.phone}
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                isPassword
                showPw={showPassword}
                togglePw={() => setShowPassword(prev => !prev)}
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                isPassword
                showPw={showConfirmPassword}
                togglePw={() => setShowConfirmPassword(prev => !prev)}
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                error={errors.confirmPassword}
              />

              {/* Register Button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#7B5FEB", "#6347D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerGradient}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  kav: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#3A1EA0',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    marginBottom: 28,
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
  registerButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  registerGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: 'Poppins_700Bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  loginText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins_400Regular',
  },
  loginLink: {
    fontSize: 14,
    color: '#7B5FEB',
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
});

export default RegisterForm;