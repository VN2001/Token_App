import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { C, rs, vs, rf } from "../UserDashboard/Constants";

const icon2 = require("../../../assets/2.png");
const icon3 = require("../../../assets/3.png");
const icon4 = require("../../../assets/4.png");
const icon5 = require("../../../assets/5.png");
const icon6 = require("../../../assets/6.png");

const TABS = [
  { id: "home", icon: icon2 },
  { id: "list", icon: icon3 },
  { id: "search", icon: icon4 },
  { id: "bell", icon: icon5 },
  { id: "profile", icon: icon6 },
];

const BottomNavBar = ({ activeTab, onTabPress }) => (
  <View style={styles.bottomNav}>
    {TABS.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <TouchableOpacity
          key={tab.id}
          style={styles.navItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Image
            source={tab.icon}
            style={[
              styles.navIcon,
              { tintColor: isActive ? C.purple : C.textDark },
            ]}
          />
          {isActive && <View style={styles.navDot} />}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
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

export default BottomNavBar;