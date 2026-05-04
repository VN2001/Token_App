import React from 'react';
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

// ─── Color Tokens ────────────────────────────────────────────────────────────
const PURPLE     = '#7B5FEB'; // ← updated primary color
const TEXT_DARK  = '#1A1A2E';
const TEXT_MID   = '#555570';
const TEXT_LIGHT = '#8888A0';
const GREEN      = '#4CAF50';
const FEE_PURPLE = '#7B5FEB'; // ← updated to match primary

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
const DoctorCard = ({ doctor }) => (
  <TouchableOpacity style={styles.doctorCard} activeOpacity={0.85}>
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ClinicScreen() {
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

            {/* Rating badge */}
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
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </View>

        </View>
      </ScrollView>

      {/* ── Bottom Bar ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.85}>
          <DirectionsIcon />
          <Text style={styles.bottomBtnText}>Get Directions</Text>
        </TouchableOpacity>

        <View style={styles.bottomDivider} />

        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.85}>
          <PinIcon />
          <Text style={styles.bottomBtnText}>5km from Here</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: vs(16),
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
  },
  viewAll: {
    fontSize: rf(13),
    color: PURPLE,
    fontWeight: '600',
  },
  doctorsRow: {
    flexDirection: 'row',
    gap: rs(8),
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

  // ── Bottom Bar ────────────────────────────────────────────────────────────
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
    paddingVertical: vs(16),
    paddingHorizontal: rs(20),
    paddingBottom: vs(20),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: -vs(3) },
    elevation: 8,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
  },
  bottomIconText: {
    fontSize: rf(18),
  },
  bottomBtnText: {
    fontSize: rf(14),
    fontWeight: '700',
    color: TEXT_DARK,
  },
  bottomDivider: {
    width: 1,
    height: vs(24),
    backgroundColor: '#E0E0EE',
    alignSelf: 'center',
  },
});