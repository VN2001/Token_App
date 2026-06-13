import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { rs, vs, rf } from '../../utils/responsive';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 1, name: 'Shahul Hameed\nHameed', specialty: 'Gyno', rating: 4.5, fee: '₹199.00' },
  { id: 2, name: 'Shahul Hameed\nHameed', specialty: 'Gyno', rating: 4.5, fee: '₹199.00' },
  { id: 3, name: 'Shahul Hameed\nHameed', specialty: 'Gyno', rating: 4.5, fee: '₹199.00' },
];

const WORKING_HOURS = [
  { day: 'Monday',    time: '09.00 AM – 05.00 PM', isOpen: true },
  { day: 'Tuesday',   time: '09.00 AM – 05.00 PM', isOpen: true },
  { day: 'Wednesday', time: '09.00 AM – 05.00 PM', isOpen: true },
  { day: 'Thursday',  time: '09.00 AM – 05.00 PM', isOpen: true },
  { day: 'Friday',    time: '09.00 AM – 03.00 PM', isOpen: true },
  { day: 'Saturday',  time: 'Closed',               isOpen: false },
  { day: 'Sunday',    time: 'Closed',               isOpen: false },
];

// ─── Color Tokens ────────────────────────────────────────────────────────────
const PURPLE     = '#7B5FEB';
const TEXT_DARK  = '#1A1A2E';
const TEXT_MID   = '#555570';
const TEXT_LIGHT = '#8888A0';
const GREEN      = '#4CAF50';
const FEE_PURPLE = '#7B5FEB';

// ─── Icon Helpers ─────────────────────────────────────────────────────────────
const PersonsIcon = () => (
  <View style={styles.statIcon}>
    <Text style={styles.statIconText}>👥</Text>
  </View>
);

const VideoIcon = () => (
  <View style={styles.statIcon}>
    <Text style={styles.statIconText}>▶</Text>
  </View>
);

const StarIcon = ({ size = rf(14), color = '#F5A623' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size + rs(2) }}>★</Text>
);

const CallIcon       = () => <Text style={styles.callIconText}>📞</Text>;
const DirectionsIcon = () => <Text style={styles.bottomIconText}>⊙</Text>;
const PinIcon        = () => <Text style={styles.bottomIconText}>📍</Text>;

// ─── Doctor Card ──────────────────────────────────────────────────────────────
const DoctorCard = ({ doctor, onPress }) => (
  <TouchableOpacity style={styles.doctorCard} activeOpacity={0.85} onPress={onPress}>
    <View style={styles.doctorImageWrapper}>
      <View style={styles.doctorImagePlaceholder}>
        <Text style={styles.doctorAvatarEmoji}>👩‍⚕️</Text>
      </View>
    </View>
    <Text style={styles.doctorName}>{doctor.name}</Text>
    <View style={styles.doctorMeta}>
      <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      <View style={styles.ratingRow}>
        <StarIcon size={rf(11)} />
        <Text style={styles.ratingText}>{doctor.rating}</Text>
      </View>
    </View>
    <Text style={styles.doctorFee}>{doctor.fee}</Text>
  </TouchableOpacity>
);

// ─── Map Section ──────────────────────────────────────────────────────────────
const MapSection = () => (
  <View style={styles.mapSection}>
    {/* Map image */}
    <View style={styles.mapContainer}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
        style={styles.mapImage}
        imageStyle={{ borderRadius: rs(16) }}
        resizeMode="cover"
      >
        {/* Map pin */}
        <View style={styles.mapPinContainer}>
          <View style={styles.mapPin}>
            <Text style={styles.mapPinEmoji}>📍</Text>
          </View>
        </View>
      </ImageBackground>
    </View>

    {/* Direction strip */}
    <View style={styles.directionStrip}>
      <TouchableOpacity style={styles.directionBtn} activeOpacity={0.85}>
        <Text style={styles.directionIcon}>⊙</Text>
        <Text style={styles.directionText}>Get Directions</Text>
      </TouchableOpacity>

      <View style={styles.directionDivider} />

      <TouchableOpacity style={styles.directionBtn} activeOpacity={0.85}>
        <Text style={styles.directionPinIcon}>📍</Text>
        <Text style={styles.directionDistText}>5km from Here</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── About Section ────────────────────────────────────────────────────────────
const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const fullText =
    'Hameed Clinic has been serving the community for over 20 years with dedicated healthcare professionals. ' +
    'Our multi-specialty clinic provides a wide range of medical services with state-of-the-art facilities. ' +
    'We are committed to delivering compassionate and quality care to every patient.';
  const preview = fullText.slice(0, 120) + '...';

  return (
    <View style={styles.aboutSection}>
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>
        {expanded ? fullText : preview}
        {'  '}
        <Text style={styles.readMore} onPress={() => setExpanded(!expanded)}>
          {expanded ? 'Read Less' : 'Read More'}
        </Text>
      </Text>
    </View>
  );
};

// ─── Working Hours Section ────────────────────────────────────────────────────
const WorkingHoursSection = () => (
  <View style={styles.hoursSection}>
    <Text style={styles.sectionTitle}>Working Hours</Text>
    <View style={styles.hoursCard}>
      {WORKING_HOURS.map((item, index) => (
        <View
          key={item.day}
          style={[
            styles.hoursRow,
            index < WORKING_HOURS.length - 1 && styles.hoursRowBorder,
          ]}
        >
          <Text style={[styles.hoursDay, item.isOpen ? styles.hoursDayOpen : styles.hoursDayClosed]}>
            {item.day}
          </Text>
          <Text style={[styles.hoursTime, !item.isOpen && styles.hoursTimeClosed]}>
            {item.time}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ClinicScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* ── Hero Image ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay} />
            <View style={styles.ratingBadge}>
              <StarIcon size={rf(16)} color={PURPLE} />
              <Text style={styles.ratingBadgeText}>4.5</Text>
            </View>
          </ImageBackground>
        </View>

        {/* ── White Card ── */}
        <View style={styles.card}>

          {/* Clinic info */}
          <Text style={styles.clinicName}>Hameed Clinic (Tirunelveli)</Text>
          <Text style={styles.doctorsAvailable}>35 Doctors available</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <PersonsIcon />
              <Text style={styles.statText}>1000+</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <PersonsIcon />
              <Text style={styles.statText}>1000+</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <VideoIcon />
              <Text style={styles.statText}>Video Served</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <StarIcon size={rf(16)} />
              <Text style={styles.statText}>4.9</Text>
            </View>
          </View>

          {/* CTA buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity style={styles.callButton} activeOpacity={0.85}>
              <View style={styles.callIconCircle}>
                <CallIcon />
              </View>
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.consultButton} activeOpacity={0.85}>
              <Text style={styles.consultButtonText}>Online Consultant</Text>
            </TouchableOpacity>
          </View>

          {/* Top Doctors header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Doctor cards */}
          <View style={styles.doctorsRow}>
            {DOCTORS.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onPress={() =>
                  navigation.navigate('DoctorBooking', { doctor: doc })
                }
              />
            ))}
          </View>

          {/* ── Map Section ── */}
          <MapSection />

          {/* ── About Section ── */}
          <AboutSection />

          {/* ── Working Hours Section ── */}
          <WorkingHoursSection />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  heroContainer: {
    width: '100%',
    height: vs(240),
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heroImageStyle: {
    borderRadius: 0,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,10,45,0.35)',
  },
  ratingBadge: {
    position: 'absolute',
    top: vs(30),
    right: rs(16),
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: rs(12),
    paddingHorizontal: rs(10),
    paddingVertical: vs(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 4,
  },
  ratingBadgeText: {
    fontSize: rf(15),
    fontWeight: '700',
    color: TEXT_DARK,
    marginLeft: rs(3),
  },

  // ── White Card ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    marginTop: -vs(24),
    paddingHorizontal: rs(20),
    paddingTop: vs(24),
    paddingBottom: vs(20),
    shadowColor: PURPLE,
    shadowOpacity: 0.08,
    shadowRadius: rs(20),
    shadowOffset: { width: 0, height: -vs(4) },
    elevation: 6,
  },
  clinicName: {
    fontSize: rf(22),
    fontWeight: '800',
    color: TEXT_DARK,
    letterSpacing: -0.5,
    marginBottom: vs(4),
  },
  doctorsAvailable: {
    fontSize: rf(13),
    color: GREEN,
    fontWeight: '600',
    marginBottom: vs(18),
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: rs(14),
    paddingVertical: vs(12),
    paddingHorizontal: rs(8),
    marginBottom: vs(18),
    borderWidth: 1,
    borderColor: '#F0F0F8',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(4),
  },
  statIcon: {
    marginRight: rs(3),
  },
  statIconText: {
    fontSize: rf(13),
  },
  statText: {
    fontSize: rf(12),
    color: TEXT_MID,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: vs(18),
    backgroundColor: '#E0E0EE',
  },

  // ── CTA Buttons ───────────────────────────────────────────────────────────
  ctaRow: {
    flexDirection: 'row',
    gap: rs(12),
    marginBottom: vs(24),
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE,
    borderRadius: rs(50),
    paddingVertical: vs(14),
    paddingHorizontal: rs(20),
    gap: rs(10),
    shadowColor: PURPLE,
    shadowOpacity: 0.38,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 6,
  },
  callIconCircle: {
    width: rs(28),
    height: rs(28),
    borderRadius: rs(14),
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIconText: {
    fontSize: rf(14),
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: rf(15),
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  consultButton: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(50),
    paddingVertical: vs(14),
    paddingHorizontal: rs(16),
    borderWidth: 1.5,
    borderColor: '#DDD6FF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 2,
  },
  consultButtonText: {
    color: TEXT_DARK,
    fontSize: rf(14),
    fontWeight: '600',
  },

  // ── Doctors Section ───────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  sectionTitle: {
    fontSize: rf(18),
    fontWeight: '800',
    color: TEXT_DARK,
    letterSpacing: -0.3,
    marginBottom: vs(12),
  },
  viewAll: {
    fontSize: rf(13),
    color: PURPLE,
    fontWeight: '600',
  },
  doctorsRow: {
    flexDirection: 'row',
    gap: rs(8),
    marginBottom: vs(28),
  },

  // ── Doctor Card ───────────────────────────────────────────────────────────
  doctorCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: rs(16),
    padding: rs(10),
    borderWidth: 1,
    borderColor: '#F0F0F8',
    alignItems: 'flex-start',
  },
  doctorImageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: rs(12),
    overflow: 'hidden',
    marginBottom: vs(8),
    backgroundColor: '#E5DCFF',
  },
  doctorImagePlaceholder: {
    flex: 1,
    backgroundColor: '#D8CCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorAvatarEmoji: {
    fontSize: rf(36),
  },
  doctorName: {
    fontSize: rf(11),
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: vs(15),
    marginBottom: vs(3),
  },
  doctorMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: vs(4),
  },
  doctorSpecialty: {
    fontSize: rf(10),
    color: TEXT_LIGHT,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(2),
  },
  ratingText: {
    fontSize: rf(10),
    color: TEXT_MID,
    fontWeight: '600',
  },
  doctorFee: {
    fontSize: rf(12),
    color: FEE_PURPLE,
    fontWeight: '800',
  },

  // ── Map Section ───────────────────────────────────────────────────────────
  mapSection: {
    marginBottom: vs(28),
  },
  mapContainer: {
    width: '100%',
    height: vs(180),
    borderRadius: rs(16),
    overflow: 'hidden',
    marginBottom: vs(12),
  },
  mapImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(20),
    padding: rs(6),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 5,
  },
  mapPinEmoji: {
    fontSize: rf(22),
  },
  directionStrip: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: rs(14),
    borderWidth: 1,
    borderColor: '#F0F0F8',
    paddingVertical: vs(12),
  },
  directionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
  },
  directionDivider: {
    width: 1,
    backgroundColor: '#E0E0EE',
    alignSelf: 'stretch',
  },
  directionIcon: {
    fontSize: rf(16),
    color: TEXT_DARK,
  },
  directionText: {
    fontSize: rf(13),
    fontWeight: '700',
    color: TEXT_DARK,
  },
  directionPinIcon: {
    fontSize: rf(16),
  },
  directionDistText: {
    fontSize: rf(13),
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── About Section ─────────────────────────────────────────────────────────
  aboutSection: {
    marginBottom: vs(28),
  },
  aboutText: {
    fontSize: rf(13),
    color: TEXT_MID,
    lineHeight: vs(21),
    fontWeight: '400',
  },
  readMore: {
    color: PURPLE,
    fontWeight: '600',
    fontSize: rf(13),
  },

  // ── Working Hours Section ─────────────────────────────────────────────────
  hoursSection: {
    marginBottom: vs(12),
  },
  hoursCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#F0F0F8',
    paddingHorizontal: rs(16),
    paddingVertical: vs(4),
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(12),
  },
  hoursRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F8',
  },
  hoursDay: {
    fontSize: rf(13),
    fontWeight: '600',
  },
  hoursDayOpen: {
    color: PURPLE,
  },
  hoursDayClosed: {
    color: TEXT_MID,
  },
  hoursTime: {
    fontSize: rf(13),
    color: TEXT_MID,
    fontWeight: '500',
  },
  hoursTimeClosed: {
    color: TEXT_LIGHT,
  },

});