import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { C, rs, vs, rf } from "./Constants";

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
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No Recent Profiles</Text>
            </View>
            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.85}
              onPress={onAddNew}
            >
              <View style={styles.bookIconCircle}>
                <Text style={styles.bookIconText}>+</Text>
              </View>
              <Text style={styles.bookText}>Create New Slot</Text>
            </TouchableOpacity>
          </>
        );

      case "listed":
        return (
          <>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalAvatar}>
                <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{hospital?.name}</Text>
                <Text style={styles.hospitalSub}>{hospital?.shortAddress}</Text>
              </View>
              <View style={styles.hospitalRight}>
                <Text style={styles.hospitalCount}>
                  {hospital?.token}/{hospital?.total}
                </Text>
                <View style={styles.arrowCircle}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.85}
              onPress={() => setBookingState("details")}
            >
              <View style={styles.bookIconCircle}>
                <Text style={styles.bookIconText}>+</Text>
              </View>
              <Text style={styles.bookText}>Book New Slot</Text>
            </TouchableOpacity>
          </>
        );

      case "details":
        return (
          <>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalAvatar}>
                <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{hospital?.name}</Text>
                <Text style={styles.hospitalSub}>{hospital?.shortAddress}</Text>
              </View>
              <Text style={styles.hospitalCount}>
                {hospital?.token}/{hospital?.total}
              </Text>
            </View>
            <View style={styles.dtRow}>
              <View style={styles.dtPill}>
                <Text style={styles.dtLabel}>Date</Text>
                <Text style={styles.dtValue}>{hospital?.date}</Text>
              </View>
              <View style={styles.dtPill}>
                <Text style={styles.dtLabel}>Time</Text>
                <Text style={styles.dtValue}>{hospital?.time}</Text>
              </View>
            </View>
            <View style={styles.payRow}>
              <TouchableOpacity
                style={styles.backCircle}
                onPress={() => setBookingState("listed")}
              >
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                activeOpacity={0.85}
                onPress={() => {
                  setBookingState("booked");
                  navigation.navigate("Payment", { hospital });
                }}
              >
                <View style={styles.payTextCol}>
                  <Text style={styles.payLabel}>Token amount</Text>
                  <Text style={styles.payAmount}>{hospital?.amount}</Text>
                </View>
                <View style={styles.payArrowCircle}>
                  <Text style={styles.payArrowText}>→</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );

      case "booked":
  return (
    <>
      <View style={styles.hospitalRow}>
        {/* ✅ Use Image instead of emoji text */}
        <View style={styles.hospitalAvatar}>
          {hospital?.image ? (
            <Image
              source={hospital.image}
              style={{ width: rs(32), height: rs(32), resizeMode: "contain" }}
            />
          ) : (
            <Text style={{ fontSize: rf(24) }}>{hospital?.avatar}</Text>
          )}
        </View>
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName}>{hospital?.name}</Text>
          <Text style={styles.hospitalSub}>{hospital?.shortAddress}</Text>
        </View>
        {/* ✅ Green "Booked" badge */}
        <Text style={styles.bookedBadge}>Booked</Text>
      </View>

      {/* ✅ Token Confirmed row */}
      <View style={styles.confirmedButton}>
        <View style={styles.confirmedIconCircle}>
          <Text style={styles.confirmedIcon}>✓</Text>
        </View>
        <Text style={styles.confirmedText}>Token Confirmed</Text>
      </View>
    </>
  );

      default:
        return null;
    }
  };

  return <View style={styles.bottomCard}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
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
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(20),
    marginBottom: vs(8),
  },
  emptyText: {
    fontSize: rf(15),
    fontWeight: "700",
    color: C.red,
    letterSpacing: 0.2,
  },
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
  bookButton: {
    backgroundColor: C.purple,
    borderRadius: rs(50),
    paddingVertical: vs(5),
    paddingRight: rs(16),
    paddingLeft: rs(5),
    marginBottom: rs(15),
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
});

export default RecentlyAddedSection;