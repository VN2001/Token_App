import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { rs, vs, rf } from '../../utils/responsive';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const doctorImg = require('../../../assets/Doctor_img.png');
const grpDoctor = require('../../../assets/grpDoctor.jpeg');

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const StarIcon = ({ size = 16, color = '#7B5FEB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

const VideoIcon = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
  </Svg>
);

const AlertIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="#FF4444" />
    <Rect x="11" y="7" width="2" height="6" rx="1" fill="#fff" />
    <Circle cx="12" cy="16.5" r="1.2" fill="#fff" />
  </Svg>
);

const ChevronDown = ({ size = 12, color = '#999' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BackIcon = ({ size = 20, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Team Placeholder ─────────────────────────────────────────────────────────
/**
 * Displays 3 overlapping circular avatars using the grpDoctor image.
 * Each circle uses a different `objectPosition`-style offset via negative
 * left/top margins on the Image so that each avatar crops to a different
 * "face" region of the group photo, mimicking the reference design.
 *
 * Layout: avatars sit at the bottom of the left panel, overlapping by ~35%,
 * identical to the screenshot provided.
 */
const AVATAR_SIZE = rs(46); // diameter of each circle — responsive
const OVERLAP    = rs(16);  // how much each circle slides under the previous

// X-offset percentages into the group photo width for each "face" crop
const CROP_OFFSETS = [
  { x: 0,    y: 0 },   // left-most person
  { x: -rs(36), y: 0 }, // middle person
  { x: -rs(72), y: 0 }, // right-most person
];

const TeamPlaceholder = () => (
  <View style={styles.teamPlaceholder}>
    {CROP_OFFSETS.map((offset, i) => (
      <View
        key={i}
        style={[
          styles.teamAvatarCircle,
          {
            marginLeft: i === 0 ? 0 : -OVERLAP,
            zIndex: CROP_OFFSETS.length - i,
          },
        ]}
      >
        {/*
          We render the full group image inside each circle and shift it
          horizontally so each circle reveals a different face.
          The width of the image is set wider than the circle so there's
          enough image to pan across.
        */}
        <Image
          source={grpDoctor}
          style={[
            styles.teamAvatarImage,
            { transform: [{ translateX: offset.x }, { translateY: offset.y }] },
          ]}
          resizeMode="cover"
        />
      </View>
    ))}
  </View>
);

// ─── Underline Input ──────────────────────────────────────────────────────────
const UnderlineInput = ({ placeholder, value, onChangeText, keyboardType, half }) => (
  <View style={[styles.underlineInputWrap, half && { width: '47%' }]}>
    <TextInput
      style={styles.underlineInput}
      placeholder={placeholder}
      placeholderTextColor="#BBBBBB"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
    />
    <View style={styles.underlineLine} />
  </View>
);

// ─── Dropdown Input ───────────────────────────────────────────────────────────
const UnderlineDropdown = ({ placeholder, half }) => (
  <TouchableOpacity style={[styles.underlineInputWrap, half && { width: '47%' }]} activeOpacity={0.7}>
    <View style={styles.dropdownRow}>
      <Text style={styles.dropdownPlaceholder}>{placeholder}</Text>
      <ChevronDown />
    </View>
    <View style={styles.underlineLine} />
  </TouchableOpacity>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function DoctorBookingScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('live');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const hospital = route?.params?.hospital;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0FF" translucent />

      {/* ── Hero Section (Lavender BG) ── */}
      <View style={styles.heroBg}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.75}
        >
          <BackIcon />
        </TouchableOpacity>

        {/* Doctor info row */}
        <View style={styles.heroContent}>
          {/* Doctor image left */}
          <View style={styles.doctorImageWrap}>
            <Image source={doctorImg} style={styles.doctorImage} />
          </View>

          {/* Info right */}
          <View style={styles.heroInfo}>
            {/* Rating badge */}
            <View style={styles.ratingBadge}>
              <StarIcon size={rs(14)} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>

            <Text style={styles.doctorName}>Doctor Rahul{'\n'}Hameed</Text>
            <Text style={styles.specialty}>(Cardiocologist)</Text>
            {!!hospital?.name && (
              <Text style={styles.hospitalName}>{hospital.name}</Text>
            )}

            <View style={styles.slotRow}>
              <Text style={styles.slotLabel}>Available Slots</Text>
              <View style={styles.slotBadge}>
                <Text style={styles.slotBadgeText}>02/50</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* ── White Card ── */}
      <View style={styles.whiteCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Booking Header */}
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>Booking Details</Text>
            <View style={styles.alertRow}>
              <AlertIcon size={rs(26)} />
              <Text style={styles.alertSlotText}>Available Slots</Text>
            </View>
          </View>

          {/* Tab Toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'live' && styles.tabBtnActive]}
              onPress={() => setActiveTab('live')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'live' && styles.tabTextActive]}>
                Live Meet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'video' && styles.tabBtnActive]}
              onPress={() => setActiveTab('video')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'video' && styles.tabTextActive]}>
                Video Call
              </Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Banner */}
          <View style={styles.scheduleBanner}>
            {/* Left — team photo */}
            <View style={styles.bannerLeft}>
              <TeamPlaceholder />
            </View>

            {/* Right — text */}
            <View style={styles.bannerRight}>
              <View style={styles.bannerIconWrap}>
                <VideoIcon size={rs(20)} />
              </View>
              <Text style={styles.bannerTitle}>Schedule Live{'\n'}Video Meet</Text>
              <View style={styles.bannerBottom}>
                <Text style={styles.bannerAvail}>Now Available</Text>
                <View style={styles.bannerSlotBadge}>
                  <Text style={styles.bannerSlotText}>02/50</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formRow}>
            <UnderlineInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              half
            />
            <UnderlineInput
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              half
            />
          </View>

          <View style={styles.formRow}>
            <UnderlineDropdown placeholder="Gender" half />
            <UnderlineInput placeholder="Time" half />
          </View>

          {/* Bottom Info Row */}
          <View style={styles.bottomRow}>
            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardLabel}>Date</Text>
              <Text style={styles.bottomCardValue}>Feb 12,2026</Text>
            </View>

            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardLabel}>Time</Text>
              <Text style={styles.bottomCardValue}>11:45pm</Text>
            </View>

            <View style={[styles.bottomCard, styles.countCard]}>
              <Text style={styles.bottomCardValue}>Count </Text>
              <Text style={styles.countNumber}>3</Text>
              <ChevronDown size={rs(12)} color="#333" />
            </View>
          </View>

          {/* Book Button */}
          <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
            <Text style={styles.bookBtnText}>Book Appointment</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EEF0FF',
  },

  // ── Hero ──
  heroBg: {
    backgroundColor: '#EEF0FF',
    paddingTop: Platform.OS === 'ios' ? vs(54) : vs(40),
    paddingHorizontal: rs(20),
    paddingBottom: vs(28),
  },

  backBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(12),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: rs(6),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 3,
  },

  heroContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  doctorImageWrap: {
    width: SCREEN_WIDTH * 0.42,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  doctorImage: {
    width: rs(140),
    height: rs(180),
    resizeMode: 'contain',
  },

  heroInfo: {
    flex: 1,
    paddingLeft: rs(8),
    paddingBottom: vs(8),
  },

  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: rs(10),
    paddingVertical: vs(5),
    borderRadius: rs(20),
    marginBottom: vs(8),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: rs(4),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 3,
    gap: rs(4),
  },

  ratingText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: '#222',
  },

  doctorName: {
    fontSize: rf(19),
    fontWeight: '800',
    color: '#111',
    lineHeight: rf(26),
    marginBottom: vs(4),
  },

  specialty: {
    fontSize: rf(13),
    color: '#555',
    marginBottom: vs(10),
  },
  hospitalName: {
    fontSize: rf(13),
    color: '#333',
    fontWeight: '700',
    marginTop: -vs(6),
    marginBottom: vs(10),
  },

  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },

  slotLabel: {
    fontSize: rf(12),
    color: '#7B5FEB',
    fontWeight: '500',
  },

  slotBadge: {
    backgroundColor: '#7B5FEB',
    borderRadius: rs(10),
    paddingHorizontal: rs(15),
    paddingVertical: vs(4),
  },

  slotBadgeText: {
    color: '#fff',
    fontSize: rf(12),
    fontWeight: '700',
  },

  // ── White Card ──
  whiteCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: -vs(4) },
    elevation: 10,
  },

  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: vs(22),
    paddingBottom: vs(40),
  },

  // ── Booking Header ──
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(18),
  },

  bookingTitle: {
    fontSize: rf(20),
    fontWeight: '800',
    color: '#111',
  },

  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
  },

  alertSlotText: {
    fontSize: rf(13),
    color: '#7B5FEB',
    fontWeight: '500',
  },

  // ── Tab Toggle ──
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: rs(50),
    padding: rs(4),
    marginBottom: vs(18),
  },

  tabBtn: {
    flex: 1,
    paddingVertical: vs(10),
    alignItems: 'center',
    borderRadius: rs(50),
  },

  tabBtnActive: {
    backgroundColor: '#7B5FEB',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.3,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: vs(3) },
    elevation: 5,
  },

  tabText: {
    fontSize: rf(14),
    fontWeight: '600',
    color: '#888',
  },

  tabTextActive: {
    color: '#fff',
  },

  // ── Schedule Banner ──
  scheduleBanner: {
    backgroundColor: '#7B5FEB',
    borderRadius: rs(20),
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: vs(24),
    minHeight: vs(110),
  },

  bannerLeft: {
    width: '40%',
    justifyContent: 'flex-end',   // push avatars to bottom
    alignItems: 'flex-start',
    paddingLeft: rs(10),
    paddingBottom: vs(12),
  },

  // ── Team Placeholder (fixed) ──
  teamPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  teamAvatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: rs(2.5),
    borderColor: '#7B5FEB',     // matches banner bg → seamless outline
    backgroundColor: '#9B59B6', // fallback while image loads
  },

  /**
   * The image is rendered wider than the circle so we can pan (translateX)
   * to reveal different face regions across the 3 avatars.
   * Width = AVATAR_SIZE * 3 gives enough canvas to shift across 3 columns.
   */
  teamAvatarImage: {
    width: AVATAR_SIZE * 3,
    height: AVATAR_SIZE,
  },

  bannerRight: {
    flex: 1,
    padding: rs(14),
    justifyContent: 'center',
  },

  bannerIconWrap: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(6),
  },

  bannerTitle: {
    fontSize: rf(15),
    fontWeight: '800',
    color: '#fff',
    lineHeight: rf(21),
    marginBottom: vs(8),
  },

  bannerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },

  bannerAvail: {
    fontSize: rf(12),
    color: 'rgba(255,255,255,0.8)',
  },

  bannerSlotBadge: {
    backgroundColor: '#fff',
    borderRadius: rs(20),
    paddingHorizontal: rs(10),
    paddingVertical: vs(3),
  },

  bannerSlotText: {
    fontSize: rf(12),
    color: '#333',
    fontWeight: '700',
  },

  // ── Form ──
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(18),
  },

  underlineInputWrap: {
    width: '100%',
  },

  underlineInput: {
    fontSize: rf(15),
    color: '#333',
    paddingBottom: vs(6),
    paddingTop: 0,
  },

  underlineLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: vs(6),
  },

  dropdownPlaceholder: {
    fontSize: rf(15),
    color: '#BBBBBB',
  },

  // ── Bottom Row ──
  bottomRow: {
    flexDirection: 'row',
    gap: rs(8),
    marginTop: vs(10),
    marginBottom: vs(24),
  },

  bottomCard: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    borderRadius: rs(14),
    paddingVertical: vs(10),
    paddingHorizontal: rs(10),
  },

  bottomCardLabel: {
    fontSize: rf(11),
    color: '#999',
    marginBottom: vs(3),
  },

  bottomCardValue: {
    fontSize: rf(13),
    fontWeight: '700',
    color: '#222',
  },

  countCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(14),
  },

  countNumber: {
    fontSize: rf(18),
    fontWeight: '800',
    color: '#222',
  },

  // ── Book Button ──
  bookBtn: {
    backgroundColor: '#7B5FEB',
    borderRadius: rs(50),
    paddingVertical: vs(16),
    alignItems: 'center',
    shadowColor: '#7B5FEB',
    shadowOpacity: 0.35,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 7,
  },

  bookBtnText: {
    color: '#fff',
    fontSize: rf(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});