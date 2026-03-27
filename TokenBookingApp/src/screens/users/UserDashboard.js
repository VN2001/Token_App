import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
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
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

// ─── Responsive helpers ───────────────────────────────────────────────────────
const rs = (size) => scale(size);
const vs = (size) => verticalScale(size);
const rf = (size) => moderateScale(size);

const dash1 = require("../../../assets/dash1.jpg");
const dash2 = require("../../../assets/dash2.jpg");
const icon2 = require("../../../assets/2.png");
const icon3 = require("../../../assets/3.png");
const icon4 = require("../../../assets/4.png");
const icon5 = require("../../../assets/5.png");
const icon6 = require("../../../assets/6.png");
const icon7 = require("../../../assets/7.png");

const { width, height } = Dimensions.get("window");

const C = {
  purple: "#7B5FEB",
  purpleLight: "#EDE8FC",
  purpleMid: "#C4B0F8",
  purpleDark: "#6347D4",
  slotBadgeBg: "#32225A",
  btnIconBg: "#2D1B6B",
  textDark: "#1A1035",
  textMid: "#7B6BA8",
  bg: "#FFFFFF",
  cardBg: "#F0EEF5",
  white: "#FFFFFF",
  green: "#22C55E",
  red: "#E05252",
  grey: "#F1EFEF",
};

const HOSPITALS = [
  {
    id: 1,
    name: "Apollo Hospitals",
    address: "Anna Nagar (East), Road 45, Chennai",
    shortAddress: "Anna Nagar (East), Road 45 ...",
    avatar: "🏥",
    token: "02",
    total: "50",
    date: "Feb 12, 2026",
    time: "10:30 AM",
    amount: "₹199.00",
  },
  {
    id: 2,
    name: "MIOT International",
    address: "Mount Poonamallee Rd, Manapakkam",
    shortAddress: "Mount Poonamallee Rd ...",
    avatar: "🏨",
    token: "07",
    total: "40",
    date: "Feb 13, 2026",
    time: "02:15 PM",
    amount: "₹149.00",
  },
  {
    id: 3,
    name: "Fortis Malar Hospital",
    address: "Adyar, Chennai - 600 020",
    shortAddress: "Adyar, Chennai - 600 020 ...",
    avatar: "⚕️",
    token: "15",
    total: "60",
    date: "Feb 14, 2026",
    time: "04:45 PM",
    amount: "₹249.00",
  },
  {
    id: 4,
    name: "Sri Ramachandra Hospital",
    address: "Porur, Chennai - 600 116",
    shortAddress: "Porur, Chennai - 600 116 ...",
    avatar: "🩺",
    token: "03",
    total: "35",
    date: "Feb 15, 2026",
    time: "09:00 AM",
    amount: "₹299.00",
  },
  {
    id: 5,
    name: "Kauvery Hospital",
    address: "Alwarpet, Chennai - 600 018",
    shortAddress: "Alwarpet, Chennai - 600 018 ...",
    avatar: "🏪",
    token: "11",
    total: "45",
    date: "Feb 16, 2026",
    time: "11:30 AM",
    amount: "₹179.00",
  },
];

// ─── Search Modal ─────────────────────────────────────────────────────────────
const SearchModal = ({ visible, onClose, onSelect }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : height,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
    if (visible) {
      setQuery("");
      setSelected(null);
    }
  }, [visible]);

  const filtered = HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={mS.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[mS.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={mS.handle} />
            <Text style={mS.title}>Find a Hospital</Text>
            <View style={mS.inputWrapper}>
              <Image source={icon4} style={{ width: rs(18), height: rs(18) }} />
              <TextInput
                style={mS.input}
                placeholder="Search hospital name or area..."
                placeholderTextColor={C.textMid}
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery("")}>
                  <Text style={{ color: C.textMid, fontSize: rf(18) }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              style={mS.list}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {filtered.length === 0 ? (
                <View style={mS.emptyResult}>
                  <Text style={mS.emptyText}>No hospitals found</Text>
                </View>
              ) : (
                filtered.map((h) => (
                  <TouchableOpacity
                    key={h.id}
                    style={[mS.item, selected?.id === h.id && mS.itemSelected]}
                    activeOpacity={0.8}
                    onPress={() => setSelected(h)}
                  >
                    <View style={mS.avatar}>
                      <Text style={{ fontSize: rf(22) }}>{h.avatar}</Text>
                    </View>
                    <View style={mS.info}>
                      <Text style={mS.name}>{h.name}</Text>
                      <Text style={mS.addr}>{h.shortAddress}</Text>
                    </View>
                    <Text style={mS.count}>
                      {h.token}/{h.total}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            {selected && (
              <TouchableOpacity
                style={mS.confirmBtn}
                activeOpacity={0.85}
                onPress={() => {
                  onSelect(selected);
                  onClose();
                }}
              >
                <Text style={mS.confirmText}>Select {selected.name}</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ─── Recently Added Section ───────────────────────────────────────────────────
const RecentlyAddedSection = ({
  bookingState,
  setBookingState,
  hospital,
  navigation,
  onAddNew,
}) => {
  const renderContent = () => {
    switch (bookingState) {
      case "empty":
        return (
          <>
            <View style={s.emptyBox}>
              <Text style={s.emptyText}>No Recent Profiles</Text>
            </View>
            <TouchableOpacity
              style={s.bookButton}
              activeOpacity={0.85}
              onPress={onAddNew}
            >
              <View style={s.bookIconCircle}>
                <Text style={s.bookIconText}>+</Text>
              </View>
              <Text style={s.bookText}>Create New Slot</Text>
            </TouchableOpacity>
          </>
        );

      case "listed":
        return (
          <>
            <View style={s.hospitalRow}>
              <View style={s.hospitalAvatar}>
                <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
              </View>
              <View style={s.hospitalInfo}>
                <Text style={s.hospitalName}>{hospital?.name}</Text>
                <Text style={s.hospitalSub}>{hospital?.shortAddress}</Text>
              </View>
              <View style={s.hospitalRight}>
                <Text style={s.hospitalCount}>
                  {hospital?.token}/{hospital?.total}
                </Text>
                <View style={s.arrowCircle}>
                  <Text style={s.arrowText}>→</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={s.bookButton}
              activeOpacity={0.85}
              onPress={() => setBookingState("details")}
            >
              <View style={s.bookIconCircle}>
                <Text style={s.bookIconText}>+</Text>
              </View>
              <Text style={s.bookText}>Book New Slot</Text>
            </TouchableOpacity>
          </>
        );

      case "details":
        return (
          <>
            <View style={s.hospitalRow}>
              <View style={s.hospitalAvatar}>
                <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
              </View>
              <View style={s.hospitalInfo}>
                <Text style={s.hospitalName}>{hospital?.name}</Text>
                <Text style={s.hospitalSub}>{hospital?.shortAddress}</Text>
              </View>
              <Text style={s.hospitalCount}>
                {hospital?.token}/{hospital?.total}
              </Text>
            </View>
            <View style={s.dtRow}>
              <View style={s.dtPill}>
                <Text style={s.dtLabel}>Date</Text>
                <Text style={s.dtValue}>{hospital?.date}</Text>
              </View>
              <View style={s.dtPill}>
                <Text style={s.dtLabel}>Time</Text>
                <Text style={s.dtValue}>{hospital?.time}</Text>
              </View>
            </View>
            <View style={s.payRow}>
              <TouchableOpacity
                style={s.backCircle}
                onPress={() => setBookingState("listed")}
              >
                <Text style={s.backArrow}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.payButton}
                activeOpacity={0.85}
                onPress={() => {
                  setBookingState("booked");
                  navigation.navigate("Payment", { hospital });
                }}
              >
                <View style={s.payTextCol}>
                  <Text style={s.payLabel}>Token amount</Text>
                  <Text style={s.payAmount}>{hospital?.amount}</Text>
                </View>
                <View style={s.payArrowCircle}>
                  <Text style={s.payArrowText}>→</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );

      case "booked":
        return (
          <>
            <View style={s.hospitalRow}>
              <View style={s.hospitalAvatar}>
                <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
              </View>
              <View style={s.hospitalInfo}>
                <Text style={s.hospitalName}>{hospital?.name}</Text>
                <Text style={s.hospitalSub}>{hospital?.shortAddress}</Text>
              </View>
              <Text style={s.bookedBadge}>Booked</Text>
            </View>
            <View style={s.confirmedButton}>
              <View style={s.confirmedIconCircle}>
                <Text style={s.confirmedIcon}>✓</Text>
              </View>
              <Text style={s.confirmedText}>Token Confirmed</Text>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={s.bottomCard}>
    
      {renderContent()}
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const UserDashboard = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("home");
  const [seconds, setSeconds] = useState(89);
  const [bookingState, setBookingState] = useState("empty");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setSeconds((sc) => (sc > 0 ? sc - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sc) => {
    const m = Math.floor(sc / 60).toString().padStart(2, "0");
    const sec = (sc % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const tabs = [
    { id: "home", icon: icon2 },
    { id: "list", icon: icon3 },
    { id: "search", icon: icon4 },
    { id: "bell", icon: icon5 },
    { id: "profile", icon: icon6 },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "search") setSearchVisible(true);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <SearchModal
        visible={searchVisible}
        onClose={() => {
          setSearchVisible(false);
          setActiveTab("home");
        }}
        onSelect={(hospital) => {
          setSelectedHospital(hospital);
          setBookingState("listed");
        }}
      />

      <ScrollView
        style={s.container}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <View style={s.clockIcon}>
              <Image source={icon7} style={{ width: rs(46), height: rs(46) }} />
            </View>
            <View>
              <Text style={s.greeting}>
                Hello <Text style={s.greetingName}>Karthik!</Text>
              </Text>
              <Text style={s.subGreeting}>Complete Your Profile Now...</Text>
            </View>
          </View>
          <View style={s.notifWrapper}>
            <TouchableOpacity style={s.notifButton}>
              <Image source={icon5} style={{ width: rs(32), height: rs(32) }} />
            </TouchableOpacity>
            <View style={s.notifBadge} />
          </View>
        </View>

        {/* Token Card */}
        <View style={s.tokenCard}>
          <View style={s.tokenBox}>
            <Text style={s.tokenLabel}>Token Number</Text>
            <Text style={s.tokenNumber}>05</Text>
            <View style={s.slotBadge}>
              <Text style={s.slotBadgeSmall}>Slot Starts Soon</Text>
              <Text style={s.timerText}>{formatTime(seconds)}</Text>
            </View>
          </View>
          <View style={s.imageGrid}>
            <View style={s.imageTop}>
              <Image source={dash1} style={s.dashImageTop} />
            </View>
            <View style={s.imageBottom}>
              <View style={s.imageSmall}>
                <Image source={dash2} style={s.dashImageSmall} />
              </View>
            </View>
          </View>
        </View>

        {/* Dots */}
        <View style={s.dotsContainer}>
          <View style={[s.dot, s.dotActive]} />
          <View style={s.dot} />
          <View style={s.dot} />
        </View>

        {/* Recently Added */}
        <RecentlyAddedSection
          bookingState={bookingState}
          setBookingState={setBookingState}
          hospital={selectedHospital}
          navigation={navigation}
          onAddNew={() => setSearchVisible(true)}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={s.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={s.navItem}
              onPress={() => handleTabPress(tab.id)}
            >
              <Image
                source={tab.icon}
                style={[
                  s.navIcon,
                  { tintColor: isActive ? C.purple : C.textDark },
                ]}
              />
              {isActive && <View style={s.navDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const mS = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    padding: rs(20),
    paddingBottom: Platform.OS === "ios" ? vs(40) : vs(24),
    maxHeight: height * 0.82,
  },
  handle: {
    width: rs(40),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: vs(20),
  },
  title: {
    fontSize: rf(20),
    fontWeight: "800",
    color: C.textDark,
    marginBottom: vs(16),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.purpleLight,
    borderRadius: rs(14),
    paddingHorizontal: rs(14),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    borderWidth: rs(1.5),
    borderColor: C.purpleMid,
    gap: rs(8),
  },
  input: {
    flex: 1,
    fontSize: rf(14),
    color: C.textDark,
    fontWeight: "600",
    padding: 0,
  },
  list: { maxHeight: height * 0.38 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(12),
    backgroundColor: "#F8F6FF",
    borderRadius: rs(16),
    padding: rs(12),
    marginBottom: vs(8),
    borderWidth: rs(1.5),
    borderColor: "transparent",
  },
  itemSelected: { borderColor: C.purple, backgroundColor: C.purpleLight },
  avatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: C.purpleLight,
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1 },
  name: { fontSize: rf(14), fontWeight: "800", color: C.textDark },
  addr: { fontSize: rf(11), color: C.textMid, marginTop: vs(2) },
  count: { fontSize: rf(13), fontWeight: "800", color: C.purple },
  emptyResult: {
    backgroundColor: "#f1f1f1",
    borderRadius: rs(16),
    paddingVertical: vs(36),
    alignItems: "center",
  },
  emptyText: { fontSize: rf(16), fontWeight: "700", color: C.red },
  confirmBtn: {
    backgroundColor: C.purple,
    borderRadius: rs(50),
    paddingVertical: vs(15),
    alignItems: "center",
    marginTop: vs(10),
    elevation: 6,
  },
  confirmText: {
    fontSize: rf(15),
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
});

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg, marginTop: vs(40) },
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: rs(18),
    paddingTop: vs(12),
    paddingBottom: vs(24),
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(18),
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: rs(12) },
  clockIcon: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
    backgroundColor: C.white,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: rf(18),
    fontWeight: "800",
    color: C.textDark,
    letterSpacing: 0.2,
  },
  greetingName: { color: C.purple, fontWeight: "800" },
  subGreeting: {
    fontSize: rf(11),
    color: C.textMid,
    marginTop: vs(2),
    fontWeight: "600",
  },
  notifWrapper: { position: "relative" },
  notifButton: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(5),
    backgroundColor: C.grey,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  notifBadge: {
    position: "absolute",
    top: vs(6),
    right: rs(6),
    width: rs(10),
    height: rs(10),
    borderRadius: rs(5),
    backgroundColor: "#FF3B30",
    borderWidth: rs(2),
    borderColor: C.white,
  },

  // Token Card
  tokenCard: {
    backgroundColor: C.purple,
    borderRadius: rs(24),
    padding: rs(14),
    flexDirection: "row",
    gap: rs(12),
    marginBottom: vs(16),
    elevation: 8,
    minHeight: vs(190),
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

  // Dots
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: rs(6),
    marginBottom: vs(20),
  },
  dot: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(4),
    backgroundColor: C.purpleMid,
    opacity: 0.4,
  },
  dotActive: { width: rs(20), backgroundColor: C.purpleDark, opacity: 1 },

  // Bottom card
  bottomCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: rs(28),
    padding: rs(20),
    paddingTop: vs(14),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(2) },
    shadowOpacity: 0.06,
    shadowRadius: rs(8),
    marginBottom: vs(20),
  },



  // Empty state
  emptyBox: {
    
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(20),  // reduced from 40 → 20
  marginBottom: vs(8),
  },
  emptyText: {
    fontSize: rf(15),
    fontWeight: "700",
    color: C.red,
    letterSpacing: 0.2,
  },

  // Hospital row
  hospitalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(12),
    marginBottom: vs(16),
  },
  hospitalAvatar: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    backgroundColor: C.purpleLight,
    justifyContent: "center",
    alignItems: "center",
  },
  hospitalInfo: { flex: 1 },
  hospitalName: { fontSize: rf(15), fontWeight: "800", color: C.textDark },
  hospitalSub: { fontSize: rf(11), color: C.textMid, marginTop: vs(2) },
  hospitalRight: { alignItems: "flex-end", gap: vs(4) },
  hospitalCount: { fontSize: rf(13), fontWeight: "800", color: C.purple },
  arrowCircle: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    borderWidth: rs(1.5),
    borderColor: C.purpleMid,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: { fontSize: rf(14), color: C.textDark, fontWeight: "700" },

  // Book button
  bookButton: {
    backgroundColor: C.purple,
    borderRadius: rs(50),
    paddingVertical: vs(5),
    paddingRight: rs(16),
    paddingLeft: rs(5),
    marginBottom:rs(15),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "72%",
    elevation: 4,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.35,
    shadowRadius: rs(10),
  },
  bookIconCircle: {
    width: rs(50),
    height: rs(50),
    borderRadius: rs(25),
    backgroundColor: C.btnIconBg,
    justifyContent: "center",
    alignItems: "center",
  },
  bookIconText: {
    fontSize: rf(42),
    color: C.white,
    fontWeight: "300",
    lineHeight: vs(34),
    includeFontPadding: false,
  },
  bookText: {
    flex: 1,
    fontSize: rf(15),
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.2,
    textAlign: "center",
  },

  // Date / Time pills
  dtRow: { flexDirection: "row", gap: rs(12), marginBottom: vs(16) },
  dtPill: {
    flex: 1,
    backgroundColor: C.purpleLight,
    borderRadius: rs(14),
    paddingVertical: vs(10),
    paddingHorizontal: rs(14),
  },
  dtLabel: {
    fontSize: rf(11),
    color: C.textMid,
    fontWeight: "600",
    marginBottom: vs(2),
  },
  dtValue: { fontSize: rf(15), fontWeight: "800", color: C.textDark },

  // Pay row
  payRow: { flexDirection: "row", alignItems: "center", gap: rs(12) },
  backCircle: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: rs(1.5),
    borderColor: C.purpleMid,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: { fontSize: rf(18), color: C.textDark, fontWeight: "700" },
  payButton: {
    flex: 1,
    backgroundColor: C.purple,
    borderRadius: rs(50),
    paddingVertical: vs(12),
    paddingHorizontal: rs(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 6,
  },
  payTextCol: { flexDirection: "column" },
  payLabel: {
    fontSize: rf(10),
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
  },
  payAmount: {
    fontSize: rf(18),
    color: C.white,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  payArrowCircle: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  payArrowText: { fontSize: rf(18), color: C.white, fontWeight: "700" },

  // Booked / Confirmed
  bookedBadge: { fontSize: rf(13), fontWeight: "800", color: C.green },
  confirmedButton: {
    borderRadius: rs(50),
    borderWidth: rs(1.5),
    borderColor: "#E0E0E0",
    paddingVertical: vs(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: rs(12),
    backgroundColor: C.white,
  },
  confirmedIconCircle: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    backgroundColor: C.green,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmedIcon: { fontSize: rf(18), color: C.white, fontWeight: "800" },
  confirmedText: { fontSize: rf(16), fontWeight: "800", color: C.textDark },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: C.white,
    paddingVertical: vs(10),
    paddingHorizontal: rs(16),
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -vs(3) },
    shadowOpacity: 0.08,
    shadowRadius: rs(10),
  },
  navItem: { flex: 1, alignItems: "center", paddingVertical: vs(4) },
  navIcon: { width: rs(24), height: rs(24), resizeMode: "contain" },
  navDot: {
    width: rs(6),
    height: rs(6),
    borderRadius: rs(3),
    backgroundColor: C.purple,
    marginTop: vs(4),
  },
});

export default UserDashboard;