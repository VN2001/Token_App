import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
        <TouchableOpacity style={styles.payButton} activeOpacity={0.85}>
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
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  backBtn: {
    padding: 4,
    marginTop:70,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
        marginTop:70,

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: PURPLE,
  },

  // Hospital
  hospitalCard: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeBox: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    minWidth: 120,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
    fontWeight: '500',
  },
  dateTimeValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  preferredCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 14,
  },

  // Payment Option Row
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ebebeb',
    marginVertical: 6,
  },

  // Radio
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: PURPLE,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: PURPLE,
  },

  // Pay Button
  payButton: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Bottom
  bottomBar: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 6,
    backgroundColor: BG,
  },
  bottomIndicator: {
    width: 110,
    height: 4,
    borderRadius: 2,
    backgroundColor: PURPLE, // purple like the target screenshot
  },
});