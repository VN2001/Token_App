import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Svg, { Path, Ellipse, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rs, vs, rf } from '../../utils/responsive';

// ── Icons ─────────────────────────────────────────────────────────────────────

const CameraIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke="#333"
      strokeWidth="2"
    />
  </Svg>
);

const MicIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Rect x="9" y="2" width="6" height="11" rx="3" stroke="#333" strokeWidth="2" />
    <Path
      d="M5 10a7 7 0 0 0 14 0M12 19v3M9 22h6"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const VideoIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 8.5l-6 3.5V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4l6 3.5V8.5z"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneOffIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.26 13 19.79 19.79 0 0 1 1.19 4.36 2 2 0 0 1 3.16 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.14 9.94"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M23 1 1 23" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ── Timer ─────────────────────────────────────────────────────────────────────

function useCountdown(initial = 89) {
  const [seconds, setSeconds] = useState(initial);
  const ref = useRef(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 0) { clearInterval(ref.current); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function BookAppointmentCallScreen({ navigation }) {
  const timer = useCountdown(89);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book an appointment</Text>
      </View>

      {/* Video area */}
      <View style={styles.videoContainer}>

        {/* Doctor background image */}
        <Image
          source={require('../../../assets/Doctor_img.png')}
          style={styles.doctorImage}
          resizeMode="cover"
        />

        {/* Slot timer badge */}
        <View style={styles.slotBadge}>
          <Text style={styles.slotLabel}>Slot Ends in</Text>
          <Text style={styles.slotTime}>{timer}</Text>
        </View>

        {/* PiP thumbnail */}
        <View style={styles.pip}>
          <Image
            source={require('../../../assets/grpDoctor.jpeg')}
            style={styles.pipImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsBar}>
        <TouchableOpacity style={styles.ctrlBtn} activeOpacity={0.75}>
          <CameraIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctrlBtn} activeOpacity={0.75}>
          <MicIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctrlBtn} activeOpacity={0.75}>
          <VideoIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ctrlBtn, styles.endBtn]}
          activeOpacity={0.75}
          onPress={() => navigation?.goBack()}
        >
          <PhoneOffIcon />
        </TouchableOpacity>
      </View>

      {/* Bottom indicator */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const PURPLE = '#7B5EA7';
const PURPLE_DARK = '#5b3fa0';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── Header ─────────────────────────────
  header: {
    alignItems: 'center',
    paddingVertical: vs(14),
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // ── Video area ─────────────────────────
  videoContainer: {
    marginHorizontal: rs(16),
    borderRadius: rs(24),
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#d4c5f0',
    position: 'relative',
  },

  doctorImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  // ── Slot badge ─────────────────────────
  slotBadge: {
    position: 'absolute',
    top: vs(14),
    right: rs(14),
    backgroundColor: PURPLE_DARK,
    borderRadius: rs(20),
    paddingHorizontal: rs(14),
    paddingVertical: vs(7),
    alignItems: 'center',
  },

  slotLabel: {
    fontSize: rf(10),
    color: '#c9b8f0',
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: vs(1),
  },

  slotTime: {
    fontSize: rf(18),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },

  // ── Picture-in-picture ─────────────────
  pip: {
    position: 'absolute',
    bottom: vs(14),
    right: rs(14),
    width: rs(88),
    height: vs(72),
    borderRadius: rs(16),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },

  pipImage: {
    width: '100%',
    height: '100%',
  },

  // ── Controls ───────────────────────────
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rs(16),
    backgroundColor: '#f5f5f7',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    paddingVertical: vs(18),
    paddingHorizontal: rs(24),
    marginTop: vs(10),
  },

  ctrlBtn: {
    width: rs(54),
    height: rs(54),
    borderRadius: rs(27),
    backgroundColor: '#e2e2e6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  endBtn: {
    backgroundColor: '#ef4444',
  },

  // ── Bottom indicator ───────────────────
  bottomBar: {
    alignItems: 'center',
    paddingVertical: vs(10),
    backgroundColor: '#f5f5f7',
  },

  bottomIndicator: {
    width: rs(100),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: PURPLE,
  },
});