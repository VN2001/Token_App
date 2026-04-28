import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { rs, vs, rf } from "../../utils/responsive";
import BottomNavBar from "../../components/common/BottomNavbar"; // ✅ your real component

const grpDoctor = require("../../../assets/grpDoctor.jpeg");

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const HOSPITALS = [
  {
    id: "1",
    name: "Hospital Name",
    address: "Anna nagar (East), Road 45 ...",
    current: 2,
    total: 50,
    image: grpDoctor,
  },
  {
    id: "2",
    name: "Hospital Name",
    address: "Anna nagar (East), Road 45 ...",
    current: 2,
    total: 50,
    image: grpDoctor,
  },
  {
    id: "3",
    name: "Hospital Name",
    address: "Anna nagar (East), Road 45 ...",
    current: 2,
    total: 50,
    image: grpDoctor,
  },
  {
    id: "4",
    name: "Hospital Name",
    address: "Anna nagar (East), Road 45 ...",
    current: 2,
    total: 50,
    image: grpDoctor,
  },
];

// ─── Hospital Card ────────────────────────────────────────────────────────────
const HospitalCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.card}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={item.image}
            style={styles.avatar}
            defaultSource={grpDoctor}
          />
        </View>

        {/* Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.hospitalName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.hospitalAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        {/* Right: badge + arrow */}
        <View style={styles.cardRight}>
          <Text style={styles.badgeText}>
            {String(item.current).padStart(2, "0")}
            <Text style={styles.badgeTotal}>/{item.total}</Text>
          </Text>
          <View style={styles.arrowButton}>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Pagination Dots ──────────────────────────────────────────────────────────
const PaginationDots = ({ total = 3, active = 0 }) => (
  <View style={styles.paginationRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[styles.dot, i === active ? styles.dotActive : styles.dotInactive]}
      />
    ))}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const AddedProfilesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("list"); // ✅ single source of truth

  const handleTabPress = (tabId) => {
    setActiveTab(tabId); // ✅ updates visual highlight
    if (tabId === "home") navigation.navigate("UserDashboard");
    if (tabId === "list") navigation.navigate("AddedProfiles");
    if (tabId === "search") navigation.navigate("Search");
    if (tabId === "bell") navigation.navigate("Notifications");
    if (tabId === "profile") navigation.navigate("Profile");
    // "list" stays on this screen
  };

  const handleCardPress = (hospital) => {
    navigation.navigate("HospitalDetail", { hospital });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EEFA" />

      {/* ── Header ── */}
      <Text style={styles.header}>Added Profiles</Text>

      {/* ── Card List ── */}
      <FlatList
        data={HOSPITALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HospitalCard item={item} onPress={() => handleCardPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* ── Pagination ── */}
      <PaginationDots total={3} active={0} />

      {/* ── Bottom Nav Bar ── */}
      <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />

    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0EEFA",
  },


  // ── Header ──
  header: {
     
    fontSize: rf(22),
    fontWeight: "700",
    color: "#1A1A2E",
    textAlign: "center",
    marginTop: vs(50),
    marginBottom: vs(20),
    letterSpacing: 0.3,
  },

  // ── List ──
  listContent: {
    paddingHorizontal: rs(20),
    paddingBottom: vs(16),
  },

  // ── Card ──
  cardWrapper: {
    marginBottom: vs(14),
    borderRadius: rs(20),
    shadowColor: "#9B8EC4",
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.12,
    shadowRadius: rs(12),
    elevation: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: rs(20),
    paddingVertical: vs(14),
    paddingHorizontal: rs(14),
  },

  // Avatar
  avatarContainer: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(16),
    overflow: "hidden",
    backgroundColor: "#E8E0F7",
    marginRight: rs(12),
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Info
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  hospitalName: {
    fontSize: rf(15),
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: vs(4),
    letterSpacing: 0.1,
  },
  hospitalAddress: {
    fontSize: rf(12),
    color: "#9A9AB0",
    letterSpacing: 0.1,
  },

  // Right side
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: vs(46),
    marginLeft: rs(8),
  },
  badgeText: {
    fontSize: rf(13),
    fontWeight: "700",
    color: "#6C3FCF",
  },
  badgeTotal: {
    fontWeight: "400",
    color: "#6C3FCF",
  },
  arrowButton: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(8),
    backgroundColor: "#F4F0FC",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    fontSize: rf(15),
    color: "#1A1A2E",
    fontWeight: "600",
  },

  // ── Pagination ──
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: vs(16),
    gap: rs(6),
  },
  dot: {
    height: vs(6),
    borderRadius: rs(10),
  },
  dotActive: {
    width: rs(33),
    backgroundColor: "#000000",
  },
  dotInactive: {
    width: rs(16),
    backgroundColor: "#C5BAE8",
  },
});

export default AddedProfilesScreen;