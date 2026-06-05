import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { rs, vs, rf } from "../../utils/responsive";
import { SafeAreaView } from 'react-native-safe-area-context';


const GooglePayIcon = ({ size = 26 }) => (
  <Image
    source={require('../../../assets/icons/gpay.png')}
    style={{ width: size, height: size, resizeMode: 'contain' }}
  />
);

const BackArrow = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#1a1a1a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RadioButton = ({ selected }) => (
  <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
    {selected && <View style={styles.radioInner} />}
  </View>
);

export default function PaymentScreen({ navigation, route }) {
  const [upiMethod, setUpiMethod] = useState('googlepay');
  const [preferredMethod, setPreferredMethod] = useState('googlepay');

  const handlePayNow = async () => {
    try {
      const savedBooking = await AsyncStorage.getItem('LastDoctorBooking');
      if (savedBooking) {
        await AsyncStorage.setItem('ConfirmedDoctorBooking', savedBooking);
      }

      const bookedHospital =
        route?.params?.hospital || route?.params?.bookingInfo?.hospital;

      Alert.alert('Booking Confirmed', 'Your appointment is confirmed.', [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{
                name: 'UserDashboard',
                params: {
                  bookingConfirmed: true,
                  hospital: bookedHospital,
                },
              }],
            }),
        },
      ]);
    } catch (error) {
      console.warn('Payment confirmation error', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── White top header (Payment + amount on one line) ── */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <BackArrow />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerAmount}>₹199.00</Text>
        </View>

        {/* Spacer to balance the back button */}
        <View style={{ width: rs(32) }} />
      </View>

      <LinearGradient
        colors={["#e7dbff", "#f5f1ff", "#f4efff", "#ffffff", "#f6f2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* ── Hospital section — NO card background ── */}
          <View style={styles.hospitalSection}>
            <View style={styles.hospitalTopRow}>
              <Image
                source={require('../../../assets/grpDoctor.jpeg')}
                style={styles.hospitalPhoto}
              />
              <View style={styles.hospitalTextBlock}>
                <Text style={styles.hospitalName}>Hospital Name</Text>
                <Text style={styles.hospitalAddress}>Anna nagar (East), Road 45 ....</Text>
              </View>
            </View>

            {/* Date / Time / Tokens — WHITE background chips */}
            <View style={styles.hospitalInfoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>Feb 12, 2026</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>11:45pm</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tokens</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs(4) }}>
                  <Text style={styles.infoValue}>2</Text>
                  <Text style={{ color: '#888', fontSize: rf(11) }}>▼</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── UPI Card ── */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>UPI</Text>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setUpiMethod('googlepay')}
              activeOpacity={0.7}
            >
              <GooglePayIcon size={26} />
              <Text style={styles.optionLabel}>Google Pay</Text>
              <RadioButton selected={upiMethod === 'googlepay'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setUpiMethod('upiid')}
              activeOpacity={0.7}
            >
              <GooglePayIcon size={26} />
              <Text style={styles.optionLabel}>Enter UPI Id</Text>
              <RadioButton selected={upiMethod === 'upiid'} />
            </TouchableOpacity>
          </View>

          {/* ── Preferred Options Card ── */}
          <View style={styles.preferredCard}>
            <Text style={styles.sectionTitle}>Preferred Options</Text>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPreferredMethod('googlepay')}
              activeOpacity={0.7}
            >
              <GooglePayIcon size={26} />
              <Text style={styles.optionLabel}>Google Pay</Text>
              <RadioButton selected={preferredMethod === 'googlepay'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.payButton} activeOpacity={0.85} onPress={handlePayNow}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>

          <View style={{ height: vs(30) }} />
        </ScrollView>

        
      </LinearGradient>
    </SafeAreaView>
  );
}

const PURPLE = '#7B5EA7';
const BG = '#f4f4f7';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff', // white so header matches SafeAreaView bg
  },

  // ── White header bar ─────────────────────────────
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: rs(16),
    paddingVertical: vs(14),
  },

  headerCenter: {
    flexDirection: 'row',        // Payment + amount side by side
    alignItems: 'center',
    gap: rs(8),
  },

  headerTitle: {
    fontSize: rf(18),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  headerAmount: {
    fontSize: rf(18),
    fontWeight: '800',
    color: PURPLE,
  },

  backBtn: {
    width: rs(32),
    height: rs(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: rs(12),
    elevation: 3,
  },

  // ── Gradient + Scroll ────────────────────────────
  gradient: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: vs(20),
  },

  // ── Hospital section (NO card background) ────────
  hospitalSection: {
    // No backgroundColor, no elevation — transparent on gradient
    marginBottom: vs(18),
    paddingHorizontal: rs(4),
  },

  hospitalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
    marginBottom: vs(14),
  },

  hospitalPhoto: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(14),
    resizeMode: 'cover',
  },

  hospitalTextBlock: {
    flex: 1,
  },

  hospitalName: {
    fontSize: rf(20),
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: vs(4),
  },

  hospitalAddress: {
    fontSize: rf(13),
    color: '#686868',
    lineHeight: vs(20),
  },

  // ── Date / Time / Token chips — WHITE background ─
  hospitalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: rs(10),
  },

  infoItem: {
    flex: 1,
    backgroundColor: '#ffffff',      // WHITE (was LIGHT_PURPLE)
    borderRadius: rs(16),
    paddingVertical: vs(14),
    paddingHorizontal: rs(10),
    alignItems: 'center',
    elevation: 1,
  },

  infoLabel: {
    fontSize: rf(12),
    color: '#8d8d9c',
    marginBottom: vs(6),
    fontWeight: '600',
  },

  infoValue: {
    fontSize: rf(12),
    color: '#1a1a1a',
    fontWeight: '700',
  },

  // ── Cards ────────────────────────────────────────
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(22),
    padding: rs(18),
    marginBottom: vs(16),
    elevation: 2,
  },

  preferredCard: {
    backgroundColor: '#fff',
    borderRadius: rs(22),
    padding: rs(18),
    marginBottom: vs(20),
    elevation: 2,
  },

  sectionTitle: {
    fontSize: rf(16),
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: vs(14),
  },

  // ── Payment Option Row ───────────────────────────
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(14),
    gap: rs(12),
  },

  optionLabel: {
    flex: 1,
    fontSize: rf(15),
    color: '#1a1a1a',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#ebebeb',
    marginVertical: vs(6),
  },

  // ── Radio Button ─────────────────────────────────
  radioOuter: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: rs(2),
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: PURPLE,
  },

  radioInner: {
    width: rs(11),
    height: rs(11),
    borderRadius: rs(5.5),
    backgroundColor: PURPLE,
  },

  // ── Pay Button ───────────────────────────────────
  payButton: {
    backgroundColor: PURPLE,
    borderRadius: rs(24),
    paddingVertical: vs(16),
    alignItems: 'center',
    marginHorizontal: rs(14),
    marginTop: vs(10),
    elevation: 4,
  },

  payButtonText: {
    color: '#fff',
    fontSize: rf(16),
    fontWeight: '700',
    letterSpacing: 0.6,
  },

});