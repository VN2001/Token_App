import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Path, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rs, vs, rf } from '../../utils/responsive';

// ── Icons ──────────────────────────────────────────────────────────────────

const NavigationIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11l19-9-9 19-2-8-8-2z"
      stroke="#7B5EA7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PinIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 10 10">
    <Circle cx="5" cy="5" r="5" fill="#ee0033" />
  </Svg>
);

// ── Data ───────────────────────────────────────────────────────────────────

const WORKING_HOURS = [
  { day: 'Monday',    time: '08:00 AM – 09:00 PM', purple: true },
  { day: 'Tuesday',   time: '08:00 AM – 09:00 PM', purple: true },
  { day: 'Wednesday', time: '08:00 AM – 09:00 PM', purple: true },
  { day: 'Thursday',  time: '08:00 AM – 09:00 PM', purple: true },
  { day: 'Friday',    time: '08:00 AM – 09:00 PM', purple: false },
  { day: 'Saturday',  time: '09:00 AM – 05:00 PM', purple: false },
  { day: 'Sunday',    time: 'Closed',               purple: false, closed: true },
];

// ── Hospital coordinates (replace with your actual coords) ─────────────────
const HOSPITAL_COORDS = {
  latitude: 11.0168,
  longitude: 76.9558,
};

const REGION = {
  ...HOSPITAL_COORDS,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// ── Screen ─────────────────────────────────────────────────────────────────

export default function HospitalInfoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Map ── */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={REGION}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            <Marker coordinate={HOSPITAL_COORDS} />
          </MapView>

          {/* Overlay buttons */}
          <View style={styles.mapBtnRow}>
            <TouchableOpacity style={styles.mapBtn}>
              <NavigationIcon />
              <Text style={styles.mapBtnText}>Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mapBtn}>
              <PinIcon />
              <Text style={styles.mapBtnText}>5km from Here</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            This chat won't appear in your chat history, and won't be used to
            train our models. This chat won't appear in your chat history, and
            won't be used to train our models.{' '}
            <Text style={styles.readMore}>Read More</Text>
          </Text>

          <View style={styles.divider} />

          {/* Working Hours */}
          <Text style={styles.sectionTitle}>Working Hours</Text>

          <View style={styles.hoursCard}>
            {WORKING_HOURS.map((item, index) => (
              <View
                key={item.day}
                style={[
                  styles.hourRow,
                  index === WORKING_HOURS.length - 1 && styles.hourRowLast,
                ]}
              >
                <Text
                  style={[
                    styles.hourDay,
                    item.purple ? styles.hourDayPurple : styles.hourDayBlack,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.hourTime,
                    item.closed && styles.hourTimeClosed,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Bottom indicator */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const PURPLE = '#7B5EA7';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: vs(20),
  },

  // ── Map ────────────────────────────────
  mapContainer: {
    height: vs(200),
    position: 'relative',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  mapBtnRow: {
    position: 'absolute',
    top: vs(12),
    left: rs(12),
    right: rs(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },

  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
    backgroundColor: '#fff',
    borderRadius: rs(20),
    paddingHorizontal: rs(13),
    paddingVertical: vs(7),
    elevation: 3,
  },

  mapBtnText: {
    fontSize: rf(12),
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // ── Body ───────────────────────────────
  body: {
    paddingHorizontal: rs(18),
    paddingTop: vs(18),
  },

  sectionTitle: {
    fontSize: rf(17),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: vs(8),
  },

  aboutText: {
    fontSize: rf(12),
    color: '#666',
    lineHeight: vs(20),
  },

  readMore: {
    color: PURPLE,
    fontWeight: '600',
  },

  divider: {
    height: 0.5,
    backgroundColor: '#ebebeb',
    marginVertical: vs(16),
  },

  // ── Hours card ─────────────────────────
  hoursCard: {
    backgroundColor: '#f7f7f8',
    borderRadius: rs(16),
    overflow: 'hidden',
  },

  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(11),
    paddingHorizontal: rs(16),
    borderBottomWidth: 0.5,
    borderBottomColor: '#ebebeb',
  },

  hourRowLast: {
    borderBottomWidth: 0,
  },

  hourDay: {
    fontSize: rf(12),
    fontWeight: '700',
    width: rs(80),
  },

  hourDayPurple: {
    color: PURPLE,
  },

  hourDayBlack: {
    color: '#1a1a1a',
  },

  hourTime: {
    fontSize: rf(12),
    color: '#555',
    textAlign: 'right',
  },

  hourTimeClosed: {
    color: '#ee0033',
    fontWeight: '600',
  },

  // ── Bottom indicator ───────────────────
  bottomBar: {
    alignItems: 'center',
    paddingVertical: vs(10),
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ebebeb',
  },

  bottomIndicator: {
    width: rs(100),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: PURPLE,
  },
});