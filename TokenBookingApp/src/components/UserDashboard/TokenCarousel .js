import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { C, rs, vs, rf } from "./Constants";

const dash1 = require("../../../assets/dash1.jpg");
const dash2 = require("../../../assets/dash2.jpg");

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - rs(36); // account for paddingHorizontal 18 on each side

// ─── Card 1: Token Number Card ────────────────────────────────────────────────
const TokenCard = ({ seconds }) => {
  const formatTime = (sc) => {
    const m = Math.floor(sc / 60).toString().padStart(2, "0");
    const sec = (sc % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <View style={[styles.card, styles.tokenCard]}>
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
  );
};

// ─── Card 2: Emergency Call Card ─────────────────────────────────────────────
// ─── Card 2: Emergency Call Card ─────────────────────────────────────────────
const EmergencyCallCard = () => (
  <View style={[styles.card, styles.emergencyCard]}>
    {/* Doctor image */}
    <View style={styles.doctorImageWrapper}>
      <View style={styles.doctorImagePlaceholder}>
        {/* Top half: light gray bg */}
        <View style={styles.doctorBgTop} />
        {/* Doctor emoji centered, large */}
        <Text style={styles.doctorEmoji}>👩‍⚕️</Text>
      </View>
    </View>

    {/* Right info panel */}
    <View style={styles.emergencyInfo}>
      <View style={styles.emergencyTopRow}>
        {/* Circle video badge */}
        <View style={styles.videoBadge}>
          <Text style={styles.videoBadgeIcon}>📹</Text>
        </View>
        <View>
          <Text style={styles.emergencyTitle}>Emergency</Text>
          <Text style={styles.emergencyTitle}>Call Meet</Text>
        </View>
      </View>

      <View style={styles.emergencyMeta}>
        <View style={styles.specialistBadge}>
          <Text style={styles.specialistText}>(Cardiocologist)</Text>
        </View>
        <View style={styles.tokenBadge}>
          <Text style={styles.tokenBadgeText}>02/50</Text>
        </View>
      </View>
    </View>

    {/* Tap to Call button — inside card, absolute bottom */}
    <TouchableOpacity style={styles.tapToCallBtn} activeOpacity={0.85}>
      <View style={styles.callIconCircle}>
        <Text style={{ fontSize: rf(16) }}>❗</Text>
      </View>
      <Text style={styles.tapToCallText}>Tap to Call</Text>
      <Text style={styles.chevrons}>{"<<<"}</Text>
    </TouchableOpacity>
  </View>
);

// ─── Carousel Wrapper ─────────────────────────────────────────────────────────
const TokenCarousel = ({ seconds }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH}
        contentContainerStyle={{ gap: 0 }}
      >
        <View style={{ width: CARD_WIDTH }}>
          <TokenCard seconds={seconds} />
        </View>
        <View style={{ width: CARD_WIDTH }}>
          <EmergencyCallCard />
        </View>
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        {[0, 1].map((i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: { marginBottom: vs(4) },

  // Shared card base
  card: {
    borderRadius: rs(24),
    padding: rs(14),
    elevation: 8,
    minHeight: vs(190),
    marginBottom: vs(0),
  },

  // ── Token Card ──────────────────────────────────────────────────────────────
  tokenCard: {
    backgroundColor: C.purple,
    flexDirection: "row",
    gap: rs(12),
  },
  tokenBox: {
    backgroundColor: C.purpleLight,
    borderRadius: rs(20),
    padding: rs(12),
    alignItems: "center",
    width: rs(148),
    justifyContent: "center",
  },
  tokenLabel: {
    fontSize: rf(13),
    color: C.textDark,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: vs(2),
  },
  tokenNumber: {
    fontSize: rf(72),
    fontWeight: "900",
    color: C.textDark,
    lineHeight: vs(78),
    marginVertical: vs(2),
    includeFontPadding: false,
  },
  slotBadge: {
    backgroundColor: C.slotBadgeBg,
    borderRadius: rs(30),
    paddingVertical: vs(6),
    paddingHorizontal: rs(10),
    alignItems: "center",
    width: "100%",
    marginTop: vs(4),
  },
  slotBadgeSmall: {
    fontSize: rf(8),
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  timerText: {
    fontSize: rf(17),
    color: C.white,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  imageGrid: { flex: 1, gap: vs(8) },
  imageTop: {
    flex: 1,
    borderRadius: rs(14),
    backgroundColor: C.purpleMid,
    overflow: "hidden",
  },
  dashImageTop: {
    width: "100%",
    height: "100%",
    borderRadius: rs(14),
    resizeMode: "cover",
  },
  imageBottom: { flexDirection: "row", gap: rs(8) },
  imageSmall: {
    flex: 1,
    height: vs(80),
    borderRadius: rs(14),
    backgroundColor: "#B8A3F5",
    overflow: "hidden",
  },
  dashImageSmall: {
    width: "100%",
    height: "100%",
    borderRadius: rs(14),
    resizeMode: "cover",
  },

  // ── Emergency Card ──────────────────────────────────────────────────────────
  emergencyCard: {
    backgroundColor: C.purple,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: rs(10),
    paddingBottom: vs(58),
    paddingTop: rs(14),
    paddingHorizontal: rs(14),
    position: "relative",
    overflow: "hidden",
    minHeight: vs(190),
  },

  doctorImageWrapper: {
    width: rs(115),
    alignSelf: "stretch",          // fills full card height
    borderRadius: rs(18),
    overflow: "hidden",
  },

  doctorImagePlaceholder: {
    flex: 1,
    backgroundColor: "#E8E0FF",   // light lavender like target
    justifyContent: "center",
    alignItems: "center",
    minHeight: vs(140),
    position: "relative",
  },

  doctorBgTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "#D6CCEE",   // slightly darker top portion (headset area)
  },

  doctorEmoji: {
    fontSize: rf(64),
    textAlign: "center",
    zIndex: 1,
    marginTop: vs(10),            // push slightly down so head is centered
  },

  emergencyInfo: {
    flex: 1,
    paddingTop: vs(4),
    gap: vs(10),
  },

  emergencyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(8),
  },

  videoBadge: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),          // perfect circle
    backgroundColor: C.white,     // solid white circle like target
    justifyContent: "center",
    alignItems: "center",
  },

  videoBadgeIcon: { fontSize: rf(16) },

  emergencyTitle: {
    fontSize: rf(17),
    fontWeight: "900",
    color: C.white,
    lineHeight: vs(22),
    letterSpacing: 0.2,
  },

  emergencyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(6),
    flexWrap: "wrap",
  },

  specialistBadge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: rs(20),
    paddingVertical: vs(4),
    paddingHorizontal: rs(8),
  },

  specialistText: {
    fontSize: rf(10),
    color: C.white,
    fontWeight: "600",
  },

  tokenBadge: {
    backgroundColor: C.white,     // solid white like target
    borderRadius: rs(20),
    paddingVertical: vs(4),
    paddingHorizontal: rs(10),
  },

  tokenBadgeText: {
    fontSize: rf(12),
    fontWeight: "900",
    color: C.textDark,
  },

  // ── Tap to Call ─────────────────────────────────────────────────────────────
  tapToCallBtn: {
    position: "absolute",
    bottom: rs(12),
    left: rs(12),
    right: rs(12),
    backgroundColor: C.red,
    borderRadius: rs(50),
    paddingVertical: vs(8),
    paddingLeft: rs(4),
    paddingRight: rs(14),
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
    shadowColor: C.red,
    shadowOffset: { width: 0, height: vs(3) },
    shadowOpacity: 0.45,
    shadowRadius: rs(8),
  },

  callIconCircle: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: rs(4),
  },

  tapToCallText: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
    textAlign: "center",
  },

  chevrons: {
    fontSize: rf(15),
    color: C.white,
    fontWeight: "900",
    letterSpacing: -3,
  },

  // Dots
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: rs(6),
    marginTop: vs(14),
    marginBottom: vs(8),
  },
  dot: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(4),
    backgroundColor: C.purpleMid,
    opacity: 0.4,
  },
  dotActive: { width: rs(20), backgroundColor: C.purpleDark, opacity: 1 },
});

export default TokenCarousel;