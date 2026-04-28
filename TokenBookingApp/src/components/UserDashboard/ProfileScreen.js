import React, { useState, useEffect, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../common/BottomNavbar";
import { C, rs, vs, rf } from "./Constants";
import { AuthContext } from "../../context/AuthContext";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// ─── Profile Card ─────────────────────────────────────────────────────────────
const ProfileCard = () => (
  <View style={cardStyles.card}>
    <View style={cardStyles.decorCircle} />
    <View style={cardStyles.decorCircle2} />

    <View style={cardStyles.row}>
      {/* Avatar */}
      <View style={cardStyles.avatarRing}>
        <View style={cardStyles.avatarInner}>
          {/* Replace with actual user image:
              <Image source={{ uri: userImageUrl }} style={cardStyles.avatarImg} />
          */}
          <Text style={cardStyles.avatarFallback}>WL</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={cardStyles.info}>
        <Text style={cardStyles.name}>William Lorem</Text>
        <Text style={cardStyles.phone}>1234567890</Text>
        <Text style={cardStyles.email} numberOfLines={1}>
          william123@gmail.com
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
    borderRadius: rs(20),
    backgroundColor: C.purple,
    padding: rs(18),
    overflow: "hidden",
    elevation: 8,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: vs(6) },
    shadowOpacity: 0.4,
    shadowRadius: rs(14),
  },
  decorCircle: {
    position: "absolute",
    right: -rs(25),
    top: -rs(25),
    width: rs(120),
    height: rs(120),
    borderRadius: rs(60),
    backgroundColor: "rgba(255,255,255,0.09)",
  },
  decorCircle2: {
    position: "absolute",
    right: rs(30),
    bottom: -rs(35),
    width: rs(90),
    height: rs(90),
    borderRadius: rs(45),
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarRing: {
    width: rs(62),
    height: rs(62),
    borderRadius: rs(31),
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.55)",
    padding: rs(3),
    marginRight: rs(12),
  },
  avatarInner: {
    flex: 1,
    borderRadius: rs(28),
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: rs(28),
  },
  avatarFallback: {
    fontSize: rf(18),
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: rf(16),
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.3,
    marginBottom: vs(3),
  },
  phone: {
    fontSize: rf(12),
    color: "rgba(255,255,255,0.82)",
    marginBottom: vs(2),
  },
  email: {
    fontSize: rf(11),
    color: "rgba(255,255,255,0.68)",
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: rs(16),
    paddingVertical: vs(7),
    borderRadius: rs(20),
    elevation: 2,
  },
  editText: {
    fontSize: rf(12),
    fontWeight: "700",
    color: C.purple,
    letterSpacing: 0.2,
  },
});

// ─── Section Header ──────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <Text style={sectionStyles.title}>{title}</Text>
);

const sectionStyles = StyleSheet.create({
  title: {
    fontSize: rf(15),
    fontWeight: "700",
    color: C.textDark,
    marginHorizontal: rs(16),
    marginTop: vs(24),
    marginBottom: vs(10),
    letterSpacing: 0.2,
  },
});

// ─── Settings Card Wrapper ───────────────────────────────────────────────────
const SettingsCard = ({ children }) => (
  <View style={settingsCardStyles.card}>{children}</View>
);

const settingsCardStyles = StyleSheet.create({
  card: {
    marginHorizontal: rs(16),
    borderRadius: rs(16),
    backgroundColor: C.white,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(2) },
    shadowOpacity: 0.05,
    shadowRadius: rs(8),
  },
});

// ─── Setting Row ──────────────────────────────────────────────────────────────
const SettingRow = ({
  icon,
  label,
  type = "arrow",     // "arrow" | "toggle"
  value,
  onValueChange,
  onPress,
  isLast = false,
  danger = false,
}) => (
  <TouchableOpacity
    style={[rowStyles.row, !isLast && rowStyles.rowBorder]}
    onPress={onPress}
    activeOpacity={type === "toggle" ? 1 : 0.7}
  >
    <View style={rowStyles.left}>
      <View style={[rowStyles.iconBox, danger && rowStyles.iconBoxDanger]}>
        <Text style={rowStyles.iconText}>{icon}</Text>
      </View>
      <Text style={[rowStyles.label, danger && rowStyles.labelDanger]}>
        {label}
      </Text>
    </View>

    {type === "arrow" && (
      <Text style={[rowStyles.arrow, danger && rowStyles.arrowDanger]}>›</Text>
    )}
    {type === "toggle" && (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E0E0EE", true: "#000" }}
        thumbColor={C.white}
        ios_backgroundColor="#E0E0EE"
      />
    )}
  </TouchableOpacity>
);

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rs(16),
    paddingVertical: vs(14),
    backgroundColor: C.white,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAF2",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(10),
    backgroundColor: "#F0ECFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: rs(14),
  },
  iconBoxDanger: {
    backgroundColor: "#FFF0F1",
  },
  iconText: {
    fontSize: rf(17),
  },
  label: {
    fontSize: rf(14),
    fontWeight: "500",
    color: C.textDark,
    letterSpacing: 0.1,
  },
  labelDanger: {
    color: "#FF4757",
  },
  arrow: {
    fontSize: rf(24),
    color: "#000",
    lineHeight: rf(26),
  },
  arrowDanger: {
    color: "#FF4757",
  },
});

// ─── Profile Screen ───────────────────────────────────────────────────────────
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleLogout = () => {
    logout();
    navigation?.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleTabPress = (tabId) => {
    if (tabId === "home") {
      navigation?.navigate("UserDashboard", { activeTab: "home" });
    } else if (tabId === "list") {
      navigation?.navigate("AddedProfiles", { activeTab: "list" });
    } else if (tabId === "search") {
      navigation?.navigate("UserDashboard", { activeTab: "search" });
    } else if (tabId === "bell") {
      navigation?.navigate("Notifications");
    }
    // profile tab already on profile screen, so no navigation needed
  };

  return (
    <View style={screenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5FA" />

      {/* ── Header ── */}
      <View style={screenStyles.header}>
        <Text style={screenStyles.headerTitle}>Profile</Text>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={screenStyles.scrollContent}
      >
        {/* Profile Card */}
        <ProfileCard />

        {/* General */}
        <SectionHeader title="General" />
        <SettingsCard>
          <SettingRow
            icon="🔔"
            label="Notification"
            type="toggle"
            value={notificationsOn}
            onValueChange={setNotificationsOn}
          />
          <SettingRow
            icon="🎨"
            label="Theme"
            type="arrow"
            onPress={() => {}}
          />
          <SettingRow
            icon="🔒"
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
            icon="🗑️"
            label="Delete account"
            type="arrow"
            danger
            onPress={() => {}}
            isLast
          />
        </SettingsCard>

        {/* Logout */}
        <TouchableOpacity 
          style={screenStyles.logoutBtn} 
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={screenStyles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: vs(20) }} />
      </ScrollView>

      {/* ── Bottom Nav ── */}
      <BottomNavBar
        activeTab="profile"
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? vs(54) : vs(34),
    paddingBottom: vs(12),
    alignItems: "center",
    backgroundColor: "#F4F5FA",
  },
  headerTitle: {
    fontSize: rf(18),
    fontWeight: "700",
    color: C.textDark,
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingBottom: vs(8),
  },
  logoutBtn: {
    marginHorizontal: rs(16),
    marginTop: vs(28),
    borderWidth: 1.5,
    borderColor: C.purple,
    borderRadius: rs(14),
    paddingVertical: vs(14),
    alignItems: "center",
  },
  logoutText: {
    fontSize: rf(15),
    fontWeight: "600",
    color: C.purple,
    letterSpacing: 0.3,
  },
});

export default ProfileScreen;