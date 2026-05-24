import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../common/BottomNavbar";
import { C, rs, vs, rf } from "./Constants";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

const CheckIcon = () => (
  <Svg width={rs(22)} height={rs(22)} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#4CC4A3" opacity="0.2" />
    <Path
      d="M7.5 12L10.5 15L16.5 9"
      stroke="#4CC4A3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ active = false, color = "#9CA3AF", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const CardIcon = () => (
  <Svg width={rs(22)} height={rs(22)} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="5" width="20" height="14" rx="3" stroke="#3B82F6" strokeWidth="2" />
    <Line x1="2" y1="10" x2="22" y2="10" stroke="#3B82F6" strokeWidth="2" />
    <Circle cx="7" cy="15" r="1.5" fill="#3B82F6" />
    <Rect x="11" y="14" width="7" height="2" rx="1" fill="#3B82F6" />
  </Svg>
);

// ─── Notification Data ────────────────────────────────────────────────────────

const notifications = [
  {
    id: "1",
    title: "Confirmation",
    subtitle: "Your token #A102 with Dr. Kumar is confirmed for 10:30 AM today.",
    time: "10 min",
    type: "check",
    badgeBg: "#E8FBF5",
  },
  {
    id: "2",
    title: "Reminder!",
    subtitle: "Your token #C45 will be called soon. Please stay near the waiting area.",
    time: "2 min",
    type: "bell",
    badgeBg: "#FFF8ED",
  },
  {
    id: "3",
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "2 min",
    type: "card",
    badgeBg: "#EBF3FF",
  },
  {
    id: "4",
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "2 days",
    type: "card",
    badgeBg: "#EBF3FF",
  },
  {
    id: "5",
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "3 days",
    type: "card",
    badgeBg: "#EBF3FF",
  },
];

// ─── Badge Icon Resolver ──────────────────────────────────────────────────────

const BadgeIcon = ({ type }) => {
  switch (type) {
    case "check":
      return <CheckIcon />;
    case "bell":
      return <BellIcon color="#FFB33A" size={rs(22)} />;
    case "card":
      return <CardIcon />;
    default:
      return null;
  }
};

// ─── Notification Card ────────────────────────────────────────────────────────

const NotificationCard = ({ item }) => (
  <View style={cardStyles.card}>
    <View style={[cardStyles.badge, { backgroundColor: item.badgeBg }]}>
      <BadgeIcon type={item.type} />
    </View>
    <View style={cardStyles.content}>
      <View style={cardStyles.row}>
        <Text style={cardStyles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={cardStyles.time}>{item.time}</Text>
      </View>
      <Text style={cardStyles.subtitle}>{item.subtitle}</Text>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const NotificationScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    if (tabId === "home") {
      navigation.navigate("UserDashboard", { activeTab: "home" });
    } else if (tabId === "list") {
      navigation.navigate("AddedProfiles", { activeTab: "list" });
    } else if (tabId === "search") {
      navigation.navigate("UserDashboard", { activeTab: "search" });
    } else if (tabId === "bell") {
      navigation.navigate("Notifications");
    } else if (tabId === "profile") {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5FA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Scroll Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.subTitle}>Recent updates for your bookings</Text> */}
        {notifications.map((item) => (
          <NotificationCard item={item} key={item.id} />
        ))}
        <View style={{ height: vs(20) }} />
      </ScrollView>

      <BottomNavBar activeTab="bell" onTabPress={handleTabPress} />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? vs(54) : vs(34),
    paddingBottom: vs(14),
    alignItems: "center",
    backgroundColor: "#F4F5FA",
  },
  headerTitle: {
    fontSize: rf(20),
    fontWeight: "800",
    color: "#1a1a2e",
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: vs(12),
  },
  subTitle: {
    fontSize: rf(13),
    color: "#7C7C8A",
    fontWeight: "600",
    marginBottom: vs(14),
    marginTop: vs(4),
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: rs(20),
    padding: rs(14),
    marginBottom: vs(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(2) },
    shadowOpacity: 0.05,
    shadowRadius: rs(12),
    elevation: 3,
    gap: rs(12),
  },
  badge: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(14),
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(5),
  },
  title: {
    fontSize: rf(15),
    fontWeight: "700",
    color: "#1a1a2e",
    flex: 1,
  },
  time: {
    fontSize: rf(11),
    fontWeight: "800",
    color: "#9E75FD",
    marginLeft: rs(8),
    whiteSpace: "nowrap",
  },
  subtitle: {
    fontSize: rf(12),
    color: "#7C7C8A",
    fontWeight: "500",
    lineHeight: rf(18),
  },
});



export default NotificationScreen;