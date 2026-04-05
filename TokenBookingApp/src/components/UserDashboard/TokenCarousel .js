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
const videoIcon = require("../../../assets/video_icon.png");
const nurseImg = require("../../../assets/Nurse_img.png");

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
const EmergencyCallCard = () => (
  <View style={[styles.card, styles.emergencyCard]}>

    {/* Doctor image — tall rounded rectangle filling left side */}
   <View style={styles.doctorImageWrapper}>
  <Image 
    source={nurseImg} 
    style={styles.doctorImage}
    resizeMode="cover"
  />
</View>

    {/* Right info panel */}
    <View style={styles.emergencyInfo}>

      {/* Zoom-style icon + title */}
      <View style={styles.emergencyTopRow}>
        {/* Blue filled circle with camera — like Zoom logo */}
        <View style={styles.videoBadge}>
  <Image
    source={videoIcon}
    style={styles.videoIcon}
    resizeMode="contain"
  />
</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.emergencyTitle}>Emergency</Text>
          <Text style={styles.emergencyTitle}>Call Meet</Text>
        </View>
      </View>

      {/* Meta: specialist pill + token badge */}
      <View style={styles.emergencyMeta}>
        <View >
          <Text style={styles.specialistText}>(Cardiocologist)</Text>
        </View>
        <View style={styles.tokenBadge}>
          <Text style={styles.tokenBadgeText}>02/50</Text>
        </View>
      </View>
    </View>

    {/* Tap to Call — absolute bottom full width */}
    <TouchableOpacity style={styles.tapToCallBtn} activeOpacity={0.85}>
      <View style={styles.callIconCircle}>
        <Text style={{ fontSize: rf(15) }}>❗</Text>
      </View>
      <Text style={styles.tapToCallText}>Tap to Call</Text>
      <Text style={styles.chevrons}>{"«««"}</Text>
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
  height: vs(190),      // fixed height for both cards
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

  // ── Emergency Card ────────────────────────────────────────────────
  emergencyCard: {
  backgroundColor: "#7B5FEB",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: rs(10),
  paddingBottom: vs(70),
  paddingTop: rs(12),
  paddingHorizontal: rs(12),
  position: "relative",
  overflow: "hidden",       // change from "visible" to "hidden"
},

  // Tall rounded rectangle — fills from top almost to button
doctorImageWrapper: {
  width: rs(145),
  height: vs(90),
  borderRadius: rs(18),
  overflow: "hidden",  // this clips the image to rounded corners
},

doctorImage: {
  width: "100%",
  height: "100%",
},


  emergencyInfo: {
    flex: 1,
    paddingTop: vs(8),
    gap: vs(14),
  },

  emergencyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(8),
  },

 videoBadge: {
  width: rs(36),
  height: rs(36),
  borderRadius: rs(18),
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
},

videoIcon: {
  width: rs(30),
  height: rs(30),
},

  emergencyTitle: {
    fontSize: rf(16),
    fontWeight: "600",
    fontFamily:"Poppins",
    color: C.white,
    lineHeight: vs(21),
    letterSpacing: 0.1,
  },

  emergencyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(3),
    flexWrap: "nowrap",
  },

  specialistText: {
    fontSize: rf(12),
    color: C.white,
    fontWeight: "600",
  },

  // Solid white pill
  tokenBadge: {
    backgroundColor: C.white,
    borderRadius: rs(20),
    paddingVertical: vs(2),
    paddingHorizontal: rs(12),
  },

  tokenBadgeText: {
    fontSize: rf(10),
    fontWeight: "900",
    color: C.textDark,
  },

  // ── Tap to Call button ─────────────────────────────────────────────
  tapToCallBtn: {
    position: "absolute",
    bottom: rs(12),
    left: rs(50),
    right: rs(50),
    backgroundColor: "#E53E3E",
    borderRadius: rs(50),
    paddingVertical: vs(2),
    paddingLeft: rs(5),
    paddingRight: rs(16),
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#E53E3E",
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.5,
    shadowRadius: rs(10),
  },

  callIconCircle: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: rs(4),
  },

  tapToCallText: {
    flex: 1,
    fontSize: rf(18),
    fontWeight: "500",
    color: C.white,
    letterSpacing: 0.4,
    textAlign: "center",
  },

  // «« left-pointing, tightly spaced
  chevrons: {
    fontSize: rf(30),
    color: C.white,
    fontWeight: "900",
    letterSpacing: -4,
    marginBottom: rs(5),

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