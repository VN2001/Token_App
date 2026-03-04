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

const dash1 = require("../../../assets/dash1.jpg");
const dash2 = require("../../../assets/dash2.jpg");
const icon2 = require("../../../assets/2.png"); // Home
const icon3 = require("../../../assets/3.png"); // List (after home)
const icon4 = require("../../../assets/4.png"); // Search
const icon5 = require("../../../assets/5.png"); // Notification
const icon6 = require("../../../assets/6.png"); // Profile
const icon7 = require("../../../assets/7.png"); // Profile avatar icon

const { width, height } = Dimensions.get("window");

const C = {
  purple: "#7B5FEB",
  purpleLight: "#EDE8FC",
  purpleMid: "#C4B0F8",
  purpleDark: "#6347D4",
  textDark: "#1A1035",
  textMid: "#7B6BA8",
  bg: "#F5F3FF",
  white: "#FFFFFF",
  green: "#22C55E",
  red: "#E05252",
  grey: "#F2F2F2",
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
      h.address.toLowerCase().includes(query.toLowerCase()),
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
              <Image source={icon4} style={{ width: 18, height: 18 }} />
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
                  <Text style={{ color: C.textMid, fontSize: 18 }}>✕</Text>
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
                      <Text style={{ fontSize: 22 }}>{h.avatar}</Text>
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
}) => {
  const renderContent = () => {
    switch (bookingState) {
      case "empty":
        return (
          <View style={s.emptyBox}>
            <Text style={s.emptyText}>No Recent Profiles</Text>
          </View>
        );

      case "listed":
        return (
          <>
            <View style={s.hospitalRow}>
              <View style={s.hospitalAvatar}>
                <Text style={{ fontSize: 24 }}>{hospital?.avatar}</Text>
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
                <Text style={{ fontSize: 24 }}>{hospital?.avatar}</Text>
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
                <Text style={{ fontSize: 24 }}>{hospital?.avatar}</Text>
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
      <View style={s.recentlyAddedRow}>
        <Text style={s.recentlyAddedText}>Recently Added</Text>
        <Text style={s.filterIcon}>⇅</Text>
      </View>
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
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sc) => {
    const m = Math.floor(sc / 60)
      .toString()
      .padStart(2, "0");
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
              <Image source={icon7} style={{ width: 26, height: 26 }} />
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
              <Image source={icon5} style={{ width: 22, height: 22 }} />
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

        <RecentlyAddedSection
          bookingState={bookingState}
          setBookingState={setBookingState}
          hospital={selectedHospital}
          navigation={navigation}
        />

        {/* Create New Slot */}
        <View style={s.createSection}>
          <TouchableOpacity
            style={s.createButton}
            activeOpacity={0.85}
            onPress={() => setSearchVisible(true)}
          >
            <Text style={s.createIcon}>+</Text>
          </TouchableOpacity>
          <Text style={s.createLabel}>Create a New Slot</Text>
        </View>
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    maxHeight: height * 0.82,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: C.textDark,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.purpleLight,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: C.purpleMid,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: C.textDark,
    fontWeight: "600",
    padding: 0,
  },
  list: { maxHeight: height * 0.38 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8F6FF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  itemSelected: { borderColor: C.purple, backgroundColor: C.purpleLight },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.purpleLight,
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "800", color: C.textDark },
  addr: { fontSize: 11, color: C.textMid, marginTop: 2 },
  count: { fontSize: 13, fontWeight: "800", color: C.purple },
  emptyResult: {
    backgroundColor: C.grey,
    borderRadius: 16,
    paddingVertical: 36,
    alignItems: "center",
  },
  emptyText: { fontSize: 16, fontWeight: "700", color: C.red },
  confirmBtn: {
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 6,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
});

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg, marginTop: 40 },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  clockIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.purple,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "800",
    color: C.textDark,
    letterSpacing: 0.2,
  },
  greetingName: { color: C.purple, fontWeight: "800" },
  subGreeting: {
    fontSize: 11,
    color: C.textMid,
    marginTop: 2,
    fontWeight: "600",
  },
  notifWrapper: { position: "relative" },
  notifButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: C.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
    borderWidth: 2,
    borderColor: C.white,
  },
  tokenCard: {
    backgroundColor: C.purple,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
    elevation: 8,
  },
  tokenBox: {
    backgroundColor: C.white,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    minWidth: 130,
  },
  tokenLabel: {
    fontSize: 12,
    color: C.textMid,
    fontWeight: "700",
    textAlign: "center",
  },
  tokenNumber: {
    fontSize: 64,
    fontWeight: "900",
    color: C.textDark,
    lineHeight: 70,
    marginVertical: 4,
  },
  slotBadge: {
    backgroundColor: C.purple,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    alignItems: "center",
    width: "100%",
  },
  slotBadgeSmall: {
    fontSize: 9,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
  },
  timerText: {
    fontSize: 16,
    color: C.white,
    fontWeight: "800",
    letterSpacing: 1,
  },
  imageGrid: { flex: 1, gap: 8 },
  imageTop: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: C.purpleMid,
    minHeight: 90,
    overflow: "hidden",
  },
  dashImageTop: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    resizeMode: "cover",
  },
  imageBottom: { flexDirection: "row", gap: 8 },
  imageSmall: {
    flex: 1,
    height: 68,
    borderRadius: 14,
    backgroundColor: "#B8A3F5",
    overflow: "hidden",
  },
  dashImageSmall: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.purpleMid,
    opacity: 0.4,
  },
  dotActive: { width: 20, backgroundColor: C.purpleDark, opacity: 1 },
  bottomCard: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 18,
    elevation: 4,
    marginBottom: 20,
  },
  recentlyAddedRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  recentlyAddedText: { fontSize: 12, color: C.textMid, fontWeight: "700" },
  filterIcon: { fontSize: 14, color: C.textMid },
  emptyBox: {
    backgroundColor: C.white,
    borderRadius: 16,
    paddingVertical: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyText: { fontSize: 15, fontWeight: "700", color: C.red },
  hospitalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  hospitalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.purpleLight,
    justifyContent: "center",
    alignItems: "center",
  },
  hospitalInfo: { flex: 1 },
  hospitalName: { fontSize: 15, fontWeight: "800", color: C.textDark },
  hospitalSub: { fontSize: 11, color: C.textMid, marginTop: 2 },
  hospitalRight: { alignItems: "flex-end", gap: 4 },
  hospitalCount: { fontSize: 13, fontWeight: "800", color: C.purple },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: C.purpleMid,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: { fontSize: 14, color: C.textDark, fontWeight: "700" },
  bookButton: {
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 6,
  },
  bookIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookIconText: {
    fontSize: 20,
    color: C.white,
    fontWeight: "300",
    lineHeight: 24,
  },
  bookText: {
    fontSize: 15,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
  dtRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  dtPill: {
    flex: 1,
    backgroundColor: C.purpleLight,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dtLabel: {
    fontSize: 11,
    color: C.textMid,
    fontWeight: "600",
    marginBottom: 2,
  },
  dtValue: { fontSize: 15, fontWeight: "800", color: C.textDark },
  payRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: C.purpleMid,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: { fontSize: 18, color: C.textDark, fontWeight: "700" },
  payButton: {
    flex: 1,
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 6,
  },
  payTextCol: { flexDirection: "column" },
  payLabel: { fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: "700" },
  payAmount: {
    fontSize: 18,
    color: C.white,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  payArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  payArrowText: { fontSize: 18, color: C.white, fontWeight: "700" },
  bookedBadge: { fontSize: 13, fontWeight: "800", color: C.green },
  confirmedButton: {
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: C.white,
  },
  confirmedIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.green,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmedIcon: { fontSize: 18, color: C.white, fontWeight: "800" },
  confirmedText: { fontSize: 16, fontWeight: "800", color: C.textDark },
  createSection: { alignItems: "center", marginBottom: 20 },
  createButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.purple,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    marginBottom: 6,
  },
  createIcon: {
    fontSize: 26,
    color: C.white,
    fontWeight: "300",
    lineHeight: 30,
  },
  createLabel: { fontSize: 12, color: C.textMid, fontWeight: "700" },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: C.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  navItem: { flex: 1, alignItems: "center", paddingVertical: 4 },
  navIcon: { width: 24, height: 24, resizeMode: "contain" },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.purple,
    marginTop: 3,
  },
});

export default UserDashboard;
