import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { C, rs, vs, rf } from "./Constants";

const icon5 = require("../../../assets/5.png");
const icon7 = require("../../../assets/7.png");

const DashboardHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <View style={styles.clockIcon}>
        <Image source={icon7} style={{ width: rs(46), height: rs(46) }} />
      </View>
      <View>
        <Text style={styles.greeting}>
          Hello <Text style={styles.greetingName}>Karthik!</Text>
        </Text>
        <Text style={styles.subGreeting}>Complete Your Profile Now...</Text>
      </View>
    </View>
    <View style={styles.notifWrapper}>
      <TouchableOpacity style={styles.notifButton}>
        <Image source={icon5} style={{ width: rs(32), height: rs(32) }} />
      </TouchableOpacity>
      <View style={styles.notifBadge} />
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});

export default DashboardHeader;