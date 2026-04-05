import React, { useState } from 'react';
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
import { rs, vs, rf } from "../../utils/responsive";
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ correct



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

export default function PaymentScreen({ navigation }) {
  const [upiMethod, setUpiMethod] = useState('googlepay');
  const [preferredMethod, setPreferredMethod] = useState('googlepay');

  const handlePayNow = async () => {
    try {
      const savedBooking = await AsyncStorage.getItem('LastDoctorBooking');
      if (savedBooking) {
        await AsyncStorage.setItem('ConfirmedDoctorBooking', savedBooking);
      }

      Alert.alert('Booking Confirmed', 'Your appointment is confirmed. Returning to dashboard.', [
        {
          text: 'OK',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'UserDashboard' }] }),
        },
      ]);
    } catch (error) {
      console.warn('Payment confirmation error', error);
      Alert.alert('Error', 'Unable to complete payment confirmation. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerAmount}>₹199.00</Text>
        </View>
        {/* Spacer to balance the back button */}
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Hospital Info */}
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>Hospital Name</Text>
          <Text style={styles.hospitalAddress}>Anna nagar (East), Road 45 ....</Text>

          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeBox}>
              <Text style={styles.dateTimeLabel}>Date</Text>
              <Text style={styles.dateTimeValue}>Feb 12,2026</Text>
            </View>
            <View style={styles.dateTimeBox}>
              <Text style={styles.dateTimeLabel}>Time</Text>
              <Text style={styles.dateTimeValue}>11:45pm</Text>
            </View>
          </View>
        </View>

        {/* UPI Section */}
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

        {/* Preferred Options Section */}
        <View style={styles.preferredCard}>
          <Text style={styles.sectionTitle}>Prefered Options</Text>

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

        {/* Pay Now Button — centered with horizontal margin like screenshot */}
        <TouchableOpacity style={styles.payButton} activeOpacity={0.85} onPress={handlePayNow}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <View style={{ height: 36 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#7B5EA7';
const LIGHT_PURPLE = '#EDE9F6';
const BG = '#f4f4f7';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: rs(16),
  },

  // ─── Header ─────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    paddingVertical: vs(14),
    backgroundColor: '#ffffff',
  },

  backBtn: {
    padding: rs(4),
  },

  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rs(8),
  },

  headerTitle: {
    fontSize: rf(20),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  headerAmount: {
    fontSize: rf(20),
    fontWeight: '700',
    color: PURPLE,
  },

  // ─── Hospital ───────────────────────
  hospitalCard: {
    paddingTop: vs(8),
    paddingBottom: vs(24),
  },

  hospitalName: {
    fontSize: rf(22),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: vs(4),
  },

  hospitalAddress: {
    fontSize: rf(13),
    color: '#aaa',
    marginBottom: vs(16),
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: rs(12),
  },

  dateTimeBox: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: rs(12),
    paddingVertical: vs(10),
    paddingHorizontal: rs(12),
    flex: 1, // ✅ responsive width
  },

  dateTimeLabel: {
    fontSize: rf(12),
    color: '#aaa',
    marginBottom: vs(2),
    fontWeight: '500',
  },

  dateTimeValue: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // ─── Cards ─────────────────────────
  card: {
    backgroundColor: '#fff',
    borderRadius: rs(18),
    padding: rs(18),
    marginBottom: vs(16),
    elevation: 2,
  },

  preferredCard: {
    backgroundColor: '#fff',
    borderRadius: rs(18),
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

  // ─── Payment Option ────────────────
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(10),
    gap: rs(12),
  },

  optionLabel: {
    flex: 1,
    fontSize: rf(15),
    color: '#1a1a1a',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#ebebeb',
    marginVertical: vs(6),
  },

  // ─── Radio ─────────────────────────
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

  // ─── Pay Button ────────────────────
  payButton: {
    backgroundColor: PURPLE,
    borderRadius: rs(20),
    paddingVertical: vs(16),
    alignItems: 'center',
    marginHorizontal: rs(12),
    marginTop: vs(10),
    elevation: 4,
  },

  payButtonText: {
    color: '#fff',
    fontSize: rf(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─── Bottom ────────────────────────
  bottomBar: {
    alignItems: 'center',
    paddingBottom: vs(10),
    paddingTop: vs(6),
    backgroundColor: BG,
  },

  bottomIndicator: {
    width: rs(110),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: PURPLE,
  },
});