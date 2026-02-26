import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dash1 = require('../../../assets/dash1.jpg');
const dash2 = require('../../../assets/dash2.jpg');

const { width } = Dimensions.get('window');

// ─── Single source-of-truth palette ──────────────────────────────────────────
const C = {
  purple:      '#7B5FEB',
  purpleLight: '#EDE8FC',
  purpleMid:   '#C4B0F8',
  purpleDark:  '#6347D4',
  purpleDeep:  '#4A2FB8',
  textDark:    '#1A1035',
  textMid:     '#7B6BA8',
  bg:          '#F5F3FF',
  white:       '#FFFFFF',
  success:     '#00D4A0',
  green:       '#22C55E',
};

// ─── Slot data ────────────────────────────────────────────────────────────────
const SLOTS = [
  {
    id: 1,
    num: '05',
    hospital: 'Apollo Hospitals',
    address: 'Anna Nagar (East), Road 45, Chennai',
    time: '10:30 AM',
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 2,
    num: '12',
    hospital: 'MIOT International',
    address: 'Mount Poonamallee Rd, Manapakkam',
    time: '02:15 PM',
    status: 'waiting',
    statusLabel: 'Waiting',
  },
  {
    id: 3,
    num: '03',
    hospital: 'Fortis Malar Hospital',
    address: 'Adyar, Chennai – 600 020',
    time: '04:45 PM',
    status: 'upcoming',
    statusLabel: 'Upcoming',
  },
];

// ─── Recently Added States ────────────────────────────────────────────────────
// 'empty'   → No Recent Profiles
// 'listed'  → Hospital shown + Book New Slot button
// 'details' → Date/Time + Token amount pay button
// 'booked'  → Booked badge + Token Confirmed button

const RecentlyAddedSection = ({ bookingState, setBookingState, navigation }) => {
  const renderContent = () => {
    switch (bookingState) {
      // ── State 1: Empty ──────────────────────────────────────────────────────
      case 'empty':
        return (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No Recent Profiles</Text>
          </View>
        );

      // ── State 2: Hospital Listed + Book New Slot ────────────────────────────
      case 'listed':
        return (
          <>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalAvatar}>
                <Text style={styles.avatarEmoji}>👨‍👩‍👧</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>Hospital Name</Text>
                <Text style={styles.hospitalSub}>Anna nagar (East), Road 45 ...</Text>
              </View>
              <View style={styles.hospitalRight}>
                <Text style={styles.hospitalCount}>02/50</Text>
                <View style={styles.arrowCircle}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.85}
              onPress={() => setBookingState('details')}
            >
              <View style={styles.bookIconCircle}>
                <Text style={styles.bookIconText}>+</Text>
              </View>
              <Text style={styles.bookText}>Book New Slot</Text>
            </TouchableOpacity>
          </>
        );

      // ── State 3: Booking Details + Token Amount ─────────────────────────────
      case 'details':
        return (
          <>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalAvatar}>
                <Text style={styles.avatarEmoji}>👨‍👩‍👧</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>Hospital Name</Text>
                <Text style={styles.hospitalSub}>Anna nagar (East), Road 45 ...</Text>
              </View>
              <View style={styles.hospitalRight}>
                <Text style={styles.hospitalCount}>02/50</Text>
              </View>
            </View>

            {/* Date & Time pills */}
            <View style={styles.dtRow}>
              <View style={styles.dtPill}>
                <Text style={styles.dtLabel}>Date</Text>
                <Text style={styles.dtValue}>Feb 12,2026</Text>
              </View>
              <View style={styles.dtPill}>
                <Text style={styles.dtLabel}>Time</Text>
                <Text style={styles.dtValue}>11:45pm</Text>
              </View>
            </View>

            {/* Pay row */}
            <View style={styles.payRow}>
              <TouchableOpacity
                style={styles.backCircle}
                onPress={() => setBookingState('listed')}
              >
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                activeOpacity={0.85}
                onPress={() => {
                  setBookingState('booked');
                  navigation.navigate('Payment');
                }}
              >
                <View style={styles.payTextCol}>
                  <Text style={styles.payLabel}>Token amount</Text>
                  <Text style={styles.payAmount}>₹199.00</Text>
                </View>
                <View style={styles.payArrowCircle}>
                  <Text style={styles.payArrowText}>→</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );

      // ── State 4: Booked / Confirmed ─────────────────────────────────────────
      case 'booked':
        return (
          <>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalAvatar}>
                <Text style={styles.avatarEmoji}>👨‍👩‍👧</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>Hospital Name</Text>
                <Text style={styles.hospitalSub}>Anna nagar (East), Road 45 ...</Text>
              </View>
              <Text style={styles.bookedBadge}>Booked</Text>
            </View>
            <View style={styles.confirmedButton}>
              <View style={styles.confirmedIconCircle}>
                <Text style={styles.confirmedIcon}>✓</Text>
              </View>
              <Text style={styles.confirmedText}>Token Confirmed</Text>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.bottomCard}>
      <View style={styles.recentlyAddedRow}>
        <Text style={styles.recentlyAddedText}>Recently Added</Text>
        <Text style={styles.filterIcon}>⇅</Text>
      </View>
      {renderContent()}
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const UserDashboard = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('home');
  const [seconds, setSeconds] = useState(89);

  // Controls which state the "Recently Added" card shows
  // Toggle between 'empty' | 'listed' | 'details' | 'booked'
  const [bookingState, setBookingState] = useState('empty');

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = s => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const getTabIconName = (tabId, isActive) => {
    switch (tabId) {
      case 'home':
        return isActive ? 'home' : 'home-outline';
      case 'list':
        return isActive ? 'list' : 'list-outline';
      case 'search':
        return isActive ? 'search' : 'search-outline';
      case 'bell':
        return isActive ? 'notifications' : 'notifications-outline';
      case 'profile':
        return isActive ? 'person' : 'person-outline';
      default:
        return isActive ? 'ellipse' : 'ellipse-outline';
    }
  };

  const tabs = [
    { id: 'home' },
    { id: 'list' },
    { id: 'search' },
    { id: 'bell' },
    { id: 'profile' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.clockIcon}>
              <Text style={styles.clockText}>🕐</Text>
            </View>
            <View>
              <Text style={styles.greeting}>
                Hello <Text style={styles.greetingName}>Karthik!</Text>
              </Text>
              <Text style={styles.subGreeting}>Complete Your Profile Now...</Text>
            </View>
          </View>
          <View style={styles.notifWrapper}>
            <View style={styles.notifButton}>
              <Text style={styles.notifIcon}>🔔</Text>
            </View>
            <View style={styles.notifBadge} />
          </View>
        </View>

        {/* Token Card */}
        <View style={styles.tokenCard}>
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Token Number</Text>
            <Text style={styles.tokenNumber}>05</Text>
            <View style={styles.slotBadge}>
              <Text style={styles.slotBadgeSmall}>Slot Starts Soon</Text>
              <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>
          </View>
          <View style={styles.imageGrid}>
            <View style={styles.imageTop}>
              <Image source={dash1} style={styles.dashImageTop} />
            </View>
            <View style={styles.imageBottom}>
              <View style={styles.imageSmall}>
                <Image source={dash2} style={styles.dashImageSmall} />
              </View>
            </View>
          </View>
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Recently Added Card — 4 states */}
        <RecentlyAddedSection
          bookingState={bookingState}
          setBookingState={setBookingState}
          navigation={navigation}
        />

        {/* Available Slots */}
        <View style={styles.slotsSection}>
          <Text style={styles.slotsSectionTitle}>Available Slots</Text>

          {SLOTS.map(slot => (
            <View key={slot.id} style={styles.slotCard}>
              <View style={styles.slotInfoBox}>
                <Text style={styles.slotNumLabel}>Token No.</Text>
                <Text style={styles.slotNum}>{slot.num}</Text>
                <View style={styles.slotTimeBadge}>
                  <Text style={styles.slotTimeBadgeSmall}>Time</Text>
                  <Text style={styles.slotTimeText}>{slot.time}</Text>
                </View>
              </View>
              <View style={styles.slotDetails}>
                <Text style={styles.slotHospitalName}>{slot.hospital}</Text>
                <Text style={styles.slotAddress}>{slot.address}</Text>
                <View style={styles.slotStatusRow}>
                  <View style={[
                    styles.slotStatusBadge,
                    slot.status === 'active' && styles.slotStatusBadgeActive,
                  ]}>
                    <Text style={styles.slotStatusText}>{slot.statusLabel}</Text>
                  </View>
                  <View style={styles.slotArrow}>
                    <Text style={styles.slotArrowText}>→</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Create New Slot */}
        <View style={styles.createSection}>
          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.85}
            onPress={() => {
              setBookingState('listed');
              navigation.navigate('BookingSlot');
            }}
          >
            <Text style={styles.createIcon}>+</Text>
          </TouchableOpacity>
          <Text style={styles.createLabel}>Create a New Slot</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={getTabIconName(tab.id, activeTab === tab.id)}
              size={24}
              color={C.textDark}
            />
            {activeTab === tab.id && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
    marginTop: 40,
  },
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  clockIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.purple,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: C.purpleDark,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  clockText: { fontSize: 22 },
  greeting: { fontSize: 18, fontWeight: '800', color: C.textDark, letterSpacing: 0.2 },
  greetingName: { color: C.purple, fontWeight: '800' },
  subGreeting: { fontSize: 11, color: C.textMid, marginTop: 2, fontWeight: '600' },
  notifWrapper: { position: 'relative' },
  notifButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: C.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: C.purple,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  notifIcon: { fontSize: 20 },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: C.white,
  },

  // Token Card
  tokenCard: {
    backgroundColor: C.purple,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tokenBox: {
    backgroundColor: C.white,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    minWidth: 130,
    flexShrink: 0,
  },
  tokenLabel: { fontSize: 12, color: C.textMid, fontWeight: '700', textAlign: 'center' },
  tokenNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: C.textDark,
    lineHeight: 70,
    marginVertical: 4,
  },
  slotBadge: {
    backgroundColor: C.purple,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    alignItems: 'center',
    width: '100%',
  },
  slotBadgeSmall: { fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: '700' },
  timerText: { fontSize: 16, color: C.white, fontWeight: '800', letterSpacing: 1 },
  imageGrid: { flex: 1, gap: 8 },
  imageTop: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: C.purpleMid,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 90,
    opacity: 0.9,
  },
  dashImageTop: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    resizeMode: 'cover',
  },
  imageBottom: { flexDirection: 'row', gap: 8 },
  imageSmall: {
    flex: 1,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#B8A3F5',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  dashImageSmall: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    resizeMode: 'cover',
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.purpleMid, opacity: 0.4 },
  dotActive: { width: 20, backgroundColor: C.purpleDark, opacity: 1 },

  // ── Bottom White Card (Recently Added) ──────────────────────────────────────
  bottomCard: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 18,
    shadowColor: C.purple,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 20,
  },
  recentlyAddedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  recentlyAddedText: { fontSize: 12, color: C.textMid, fontWeight: '700' },
  filterIcon: { fontSize: 14, color: C.textMid },

  // State 1 — Empty
  emptyBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E05252',
  },

  // State 2 & 3 & 4 — Hospital row
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  hospitalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.purpleLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarEmoji: { fontSize: 26 },
  hospitalInfo: { flex: 1 },
  hospitalName: { fontSize: 15, fontWeight: '800', color: C.textDark },
  hospitalSub: { fontSize: 11, color: C.textMid, marginTop: 2 },
  hospitalRight: { alignItems: 'flex-end', gap: 4 },
  hospitalCount: { fontSize: 13, fontWeight: '800', color: C.purple },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: C.purpleMid,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: { fontSize: 14, color: C.textDark, fontWeight: '700' },

  // State 2 — Book New Slot button
  bookButton: {
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  bookIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookIconText: { fontSize: 20, color: C.white, fontWeight: '300', lineHeight: 24 },
  bookText: { fontSize: 15, fontWeight: '800', color: C.white, letterSpacing: 0.3 },

  // State 3 — Date/Time pills
  dtRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dtPill: {
    flex: 1,
    backgroundColor: C.purpleLight,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dtLabel: { fontSize: 11, color: C.textMid, fontWeight: '600', marginBottom: 2 },
  dtValue: { fontSize: 15, fontWeight: '800', color: C.textDark },

  // State 3 — Pay row
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: C.purpleMid,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  backArrow: { fontSize: 18, color: C.textDark, fontWeight: '700' },
  payButton: {
    flex: 1,
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: C.purpleDark,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  payTextCol: { flexDirection: 'column' },
  payLabel: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  payAmount: { fontSize: 18, color: C.white, fontWeight: '900', letterSpacing: 0.3 },
  payArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payArrowText: { fontSize: 18, color: C.white, fontWeight: '700' },

  // State 4 — Booked badge
  bookedBadge: {
    fontSize: 13,
    fontWeight: '800',
    color: C.green,
  },

  // State 4 — Token Confirmed button
  confirmedButton: {
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: C.white,
  },
  confirmedIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmedIcon: { fontSize: 18, color: C.white, fontWeight: '800' },
  confirmedText: { fontSize: 16, fontWeight: '800', color: C.textDark },

  // Available Slots
  slotsSection: { marginBottom: 20 },
  slotsSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: C.textDark,
    marginBottom: 14,
  },
  slotCard: {
    backgroundColor: C.purple,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  slotInfoBox: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
    flexShrink: 0,
    justifyContent: 'center',
  },
  slotNumLabel: { fontSize: 10, color: C.textMid, fontWeight: '700' },
  slotNum: {
    fontSize: 48,
    fontWeight: '900',
    color: C.textDark,
    lineHeight: 54,
    marginVertical: 2,
  },
  slotTimeBadge: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
  },
  slotTimeBadgeSmall: { fontSize: 8, color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  slotTimeText: { fontSize: 12, color: C.white, fontWeight: '800', letterSpacing: 0.6 },
  slotDetails: { flex: 1, justifyContent: 'space-between' },
  slotHospitalName: { fontSize: 14, fontWeight: '800', color: C.white, marginBottom: 4 },
  slotAddress: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 16,
    marginBottom: 12,
  },
  slotStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotStatusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  slotStatusBadgeActive: { backgroundColor: '#00D4A0' },
  slotStatusText: { fontSize: 10, color: C.white, fontWeight: '800' },
  slotArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotArrowText: { fontSize: 13, color: C.white, fontWeight: '700' },

  // Create section
  createSection: { alignItems: 'center', marginBottom: 20 },
  createButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.purple,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: C.purpleDark,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginBottom: 6,
  },
  createIcon: { fontSize: 26, color: C.white, fontWeight: '300', lineHeight: 30 },
  createLabel: { fontSize: 12, color: C.textMid, fontWeight: '700' },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: C.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  navIcon: { fontSize: 22, color: C.purpleMid },
  navIconActive: { color: C.purple },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.purple,
    marginTop: 3,
  },
});

export default UserDashboard;