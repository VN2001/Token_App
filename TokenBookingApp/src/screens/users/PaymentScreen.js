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

// Google Pay color icon (SVG-like using shapes)
const GooglePayIcon = ({ size = 24 }) => (
  <Image
    source={require('../../../assets/icons/gpay.png')}
    style={{ width: size, height: size, resizeMode: 'contain' }}
  />
);

const BackArrow = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#7B5FEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
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
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <Text style={styles.headerAmount}>₹199.00</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hospital Card */}
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

          {/* Google Pay Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setUpiMethod('googlepay')}
            activeOpacity={0.7}
          >
            <GooglePayIcon size={28} />
            <Text style={styles.optionLabel}>Google Pay</Text>
            <RadioButton selected={upiMethod === 'googlepay'} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Enter UPI ID Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setUpiMethod('upiid')}
            activeOpacity={0.7}
          >
            <GooglePayIcon size={28} />
            <Text style={styles.optionLabel}>Enter UPI Id</Text>
            <RadioButton selected={upiMethod === 'upiid'} />
          </TouchableOpacity>
        </View>

        {/* Preferred Options Section */}
        <View style={styles.preferredCard}>
          <Text style={styles.sectionTitleBold}>Prefered Options</Text>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPreferredMethod('googlepay')}
            activeOpacity={0.7}
          >
            <GooglePayIcon size={28} />
            <Text style={styles.optionLabel}>Google Pay</Text>
            <RadioButton selected={preferredMethod === 'googlepay'} />
          </TouchableOpacity>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payButton} activeOpacity={0.85}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    marginTop:50,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f5f5f7',
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  backArrow: {
    fontSize: 22,
    color: '#1a1a1a',
    fontWeight: '400',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: PURPLE,
  },

  // Hospital Card
  hospitalCard: {
    backgroundColor: '#f5f5f7',
    paddingVertical: 16,
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeBox: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    minWidth: 120,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  dateTimeValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  preferredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  sectionTitleBold: {
    fontSize: 16,
    fontWeight: '700',
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
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
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
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
    paddingBottom: 8,
    paddingTop: 4,
    backgroundColor: '#f5f5f7',
  },
  bottomIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: PURPLE,
  },
});