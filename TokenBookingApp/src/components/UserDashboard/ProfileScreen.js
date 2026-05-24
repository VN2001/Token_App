import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../common/BottomNavbar";
import { C, rs, vs, rf } from "./Constants";
import { AuthContext } from "../../context/AuthContext";

const { width: SCREEN_W } = Dimensions.get("window");

const grpDoctor = require("../../../assets/grpDoctor.jpeg");

// ─── Black SVG Icons ──────────────────────────────────────────────────────────

const BellIcon = () => (
  <Svg width={rs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
      fill="#111827"
    />
  </Svg>
);

const ThemeIcon = () => (
  <Svg width={rs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill="#111827"
    />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width={rs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
      fill="#111827"
    />
  </Svg>
);

const TrashIcon = () => (
  <Svg width={rs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      fill="#111827"
    />
  </Svg>
);

const ChevronIcon = () => (
  <Svg width={rs(16)} height={vs(16)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
      fill="#111827"
    />
  </Svg>
);

// ─── Profile Card ─────────────────────────────────────────────────────────────
const CARD_HEIGHT = vs(102);

const ProfileCard = () => (
  <View style={cardStyles.card}>
    <View style={cardStyles.decorCircle} />
    <View style={cardStyles.decorCircle2} />

    <View style={cardStyles.row}>
      {/* Group photo — flush left, full card height */}
      <View style={cardStyles.photoWrapper}>
        
          {/* Replace with real image: */}
          <Image source={grpDoctor} style={cardStyles.photo} />
       
        <View style={cardStyles.photoFallback}>
          <Text style={cardStyles.photoInitials}>WL</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={cardStyles.info}>
        <Text style={cardStyles.name}>William Lorem</Text>
        <Text style={cardStyles.phone}>1234567890</Text>
        <Text style={cardStyles.email} numberOfLines={1}>
          william123@gmail.com...
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={cardStyles.editBtn} activeOpacity={0.85}>
        <Text style={cardStyles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
  card: {
    marginHorizontal: rs(16),
    marginTop: vs(8),
    height: CARD_HEIGHT,
    borderRadius: rs(18),
    backgroundColor: "#100fod",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#6E44E8",
    shadowOffset: { width: 0, height: vs(5) },
    shadowOpacity: 0.42,
    shadowRadius: rs(12),
  },
  decorCircle: {
    position: "absolute",
    right: -rs(18),
    top: -rs(22),
    width: rs(100),
    height: rs(100),
    borderRadius: rs(50),
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  decorCircle2: {
    position: "absolute",
    right: rs(55),
    bottom: -rs(28),
    width: rs(75),
    height: rs(75),
    borderRadius: rs(37),
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: rs(14),
  },
  photoWrapper: {
    width: rs(105),
    height: rs(90),
    borderRadius: rs(35),
    // borderBottomLeftRadius: rs(18),
    overflow: "hidden",
    marginRight: rs(12),
    marginLeft: rs(8),
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },
  photoInitials: {
    fontSize: rf(24),
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.5,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: rf(15),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: vs(4),
  },
  phone: {
    fontSize: rf(11),
    color: "rgba(255,255,255,0.78)",
    marginBottom: vs(3),
  },
  email: {
    fontSize: rf(10),
    color: "rgba(255,255,255,0.62)",
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: rs(16),
    paddingVertical: vs(7),
    borderRadius: rs(20),
    elevation: 2,
    alignSelf: "center",
  },
  editText: {
    fontSize: rf(12),
    fontWeight: "700",
    color: "#6E44E8",
    letterSpacing: 0.2,
  },
});

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <Text style={sectionStyles.title}>{title}</Text>
);

const sectionStyles = StyleSheet.create({
  title: {
    fontSize: rf(15),
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: rs(16),
    marginTop: vs(22),
    marginBottom: vs(10),
    letterSpacing: 0.1,
  },
});

// ─── Settings Card Wrapper ────────────────────────────────────────────────────
const SettingsCard = ({ children }) => (
  <View style={settingsCardStyles.card}>{children}</View>
);

const settingsCardStyles = StyleSheet.create({
  card: {
    marginHorizontal: rs(16),
    borderRadius: rs(16),
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(1) },
    shadowOpacity: 0.05,
    shadowRadius: rs(6),
  },
});

// ─── Setting Row ──────────────────────────────────────────────────────────────
// Matches screenshot:
//  • Black SVG icon, no background box, directly beside label
//  • Toggle (black when ON) or dark chevron on right
//  • Hairline divider between rows
const SettingRow = ({
  IconComponent,
  label,
  type = "arrow",   // "arrow" | "toggle" | "plain"
  value,
  onValueChange,
  onPress,
  isLast = false,
}) => (
  <TouchableOpacity
    style={[rowStyles.row, !isLast && rowStyles.rowBorder]}
    onPress={onPress}
    activeOpacity={type === "toggle" ? 1 : 0.65}
  >
    <View style={rowStyles.left}>
      {IconComponent && (
        <View style={rowStyles.iconWrap}>
          <IconComponent />
        </View>
      )}
      <Text style={rowStyles.label}>{label}</Text>
    </View>

    {type === "arrow" && <ChevronIcon />}

    {type === "toggle" && (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#DCDCE8", true: "#111827" }}
        thumbColor={"#FFFFFF"}
        ios_backgroundColor="#DCDCE8"
      />
    )}
  </TouchableOpacity>
);

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rs(18),
    paddingVertical: vs(15),
    backgroundColor: "#FFFFFF",
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  // No background box — icon sits directly in the row
  iconWrap: {
    width: rs(22),
    alignItems: "center",
    marginRight: rs(14),
  },
  label: {
    fontSize: rf(14),
    fontWeight: "400",
    color: "#111827",
    letterSpacing: 0.1,
  },
});

// ─── Profile Screen ───────────────────────────────────────────────────────────
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleLogout = () => {
    logout();
    navigation?.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const handleTabPress = (tabId) => {
    if (tabId === "home") navigation?.navigate("UserDashboard", { activeTab: "home" });
    else if (tabId === "list") navigation?.navigate("AddedProfiles", { activeTab: "list" });
    else if (tabId === "search") navigation?.navigate("UserDashboard", { activeTab: "search" });
    else if (tabId === "bell") navigation?.navigate("Notifications");
  };

  return (
    <View style={screenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5FA" />

     

      {/* Header */}
      <View style={screenStyles.header}>
        <Text style={screenStyles.headerTitle}>Profile</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={screenStyles.scrollContent}
      >
        <ProfileCard />

        {/* General */}
        <SectionHeader title="General" />
        <SettingsCard>
          <SettingRow
            IconComponent={BellIcon}
            label="Notification"
            type="toggle"
            value={notificationsOn}
            onValueChange={setNotificationsOn}
          />
          <SettingRow
            IconComponent={ThemeIcon}
            label="Theam"
            type="arrow"
            onPress={() => {}}
          />
          <SettingRow
            IconComponent={ShieldIcon}
            label="Privacy Policy"
            type="arrow"
            onPress={() => {}}
            isLast
          />
        </SettingsCard>

        {/* Account */}
        <SectionHeader title="Account" />
        <SettingsCard>
          <SettingRow
            IconComponent={TrashIcon}
            label="Delete account"
            type="plain"
            onPress={() => {}}
            isLast
          />
        </SettingsCard>

        <View style={{ height: vs(30) }} />
      </ScrollView>

      {/* Bottom Nav */}
      <BottomNavBar activeTab="profile" onTabPress={handleTabPress} />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },

  header: {
    paddingTop: vs(50),
    paddingBottom: vs(10),
    alignItems: "center",
    backgroundColor: "#F4F5FA",
  },
  headerTitle: {
    fontSize: rf(25),
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingBottom: vs(10),
  },
});

export default ProfileScreen;