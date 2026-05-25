import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TextInput,
  Image,
} from "react-native";
import { C, rs, vs, rf, height, HOSPITALS } from "./Constants";
import { LinearGradient } from "expo-linear-gradient";

const icon4 = require("../../../assets/4.png");

const SearchModal = ({ visible, onClose, onSelect, navigation }) => {
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
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <LinearGradient
            colors={["#EEE5FF", "#EFE8FF", "#EBE2FF", "#F0E8FF", "#f6f2ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {/* Handle bar */}
              <View style={styles.handle} />

              {/* Title + underline accent */}
              <View style={styles.titleRow}>
                <Text style={styles.title}>Add to Home</Text>
                <View style={styles.titleAccent} />
              </View>

              {/* Search input */}
              <View style={styles.inputWrapper}>
                <Image source={icon4} style={{ width: rs(18), height: rs(18) }} />
                <TextInput
                  style={styles.input}
                  placeholder="Search Hospital name or Doctor..."
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

              {/* Hospital list */}
              <ScrollView
                style={styles.list}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {filtered.length === 0 ? (
                  <View style={styles.emptyResult}>
                    <Text style={styles.emptyText}>No hospitals found</Text>
                  </View>
                ) : (
                  filtered.map((h) => (
                    <TouchableOpacity
                      key={h.id}
                      style={[
                        styles.item,
                        selected?.id === h.id && styles.itemSelected,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelected(h);
                        onSelect(h);
                        navigation.navigate("Clinic", { hospital: h });
                        onClose();
                      }}
                    >
                      {/* Avatar */}
                      <View style={styles.avatar}>
                        <Text style={{ fontSize: rf(22) }}>{h.avatar}</Text>
                      </View>

                      {/* Info */}
                      <View style={styles.info}>
                        <Text style={styles.name}>{h.name}</Text>
                        <Text style={styles.addr}>{h.shortAddress}</Text>
                      </View>

                      {/* Right side: token count + arrow */}
                      <View style={styles.rightCol}>
                        <Text style={styles.count}>
                          {h.token}/{h.total}
                        </Text>
                        <View style={styles.arrowBtn}>
                          <Text style={styles.arrowText}>›</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>

              {/* Confirm button (shown when something is selected via long-press / explicit selection) */}
              {selected && (
                <TouchableOpacity
                  style={styles.confirmBtn}
                  activeOpacity={0.85}
                  onPress={() => {
                    onSelect(selected);
                    navigation.navigate("Clinic", { hospital: selected });
                    onClose();
                  }}
                >
                  <Text style={styles.confirmText}>
                    Select {selected.name}
                  </Text>
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    overflow: "hidden",
    maxHeight: height * 0.82,
  },
  gradient: {
    padding: rs(20),
    paddingBottom: Platform.OS === "ios" ? vs(40) : vs(24),
  },

  /* Handle */
  handle: {
    width: rs(36),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: "#C8BFD8",
    alignSelf: "center",
    marginBottom: vs(16),
  },

  /* Title */
  titleRow: {
    alignItems: "center",
    marginBottom: vs(18),
  },
  title: {
    fontSize: rf(20),
    fontWeight: "800",
    color: C.textDark,
    textAlign: "center",
    marginBottom: vs(6),
  },
  titleAccent: {
    width: rs(28),
    height: vs(3),
    borderRadius: rs(2),
    backgroundColor: C.purple,
  },

  /* Search */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: rs(50),
    paddingHorizontal: rs(16),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    borderWidth: rs(1.5),
    borderColor: "#C8B8EE",
    gap: rs(8),
  },
  input: {
    flex: 1,
    fontSize: rf(13),
    color: C.textDark,
    fontWeight: "500",
    padding: 0,
  },

  /* List */
  list: { maxHeight: height * 0.38 },

  /* Hospital card */
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(12),
    backgroundColor: "#FFFFFF",
    borderRadius: rs(16),
    padding: rs(12),
    marginBottom: vs(10),
    borderWidth: rs(1.5),
    borderColor: "transparent",
    // subtle shadow
    shadowColor: "#7840C0",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  itemSelected: {
    borderColor: C.purple,
    backgroundColor: "#F0EBFF",
  },

  /* Avatar circle */
  avatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: "#E8E0F8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  /* Text */
  info: { flex: 1 },
  name: {
    fontSize: rf(13),
    fontWeight: "800",
    color: C.textDark,
  },
  addr: {
    fontSize: rf(10),
    color: C.textMid,
    marginTop: vs(2),
  },

  /* Right column */
  rightCol: {
    alignItems: "flex-end",
    gap: vs(4),
    flexShrink: 0,
  },
  count: {
    fontSize: rf(11),
    fontWeight: "800",
    color: C.purple,
  },
  arrowBtn: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: "#F0EBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: rf(18),
    color: C.purple,
    lineHeight: rf(20),
    marginTop: -vs(1),
  },

  /* Empty state */
  emptyResult: {
    backgroundColor: "#f1f1f1",
    borderRadius: rs(16),
    paddingVertical: vs(36),
    alignItems: "center",
  },
  emptyText: {
    fontSize: rf(16),
    fontWeight: "700",
    color: C.red,
  },

  /* Confirm button */
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
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});

export default SearchModal;