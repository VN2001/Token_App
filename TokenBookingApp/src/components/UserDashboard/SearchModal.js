import React, { useState, useEffect, useRef } from "react";
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.handle} />
            <Text style={styles.title}>Find a Hospital</Text>
            <View style={styles.inputWrapper}>
              <Image source={icon4} style={{ width: rs(18), height: rs(18) }} />
              <TextInput
                style={styles.input}
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
                    onPress={() => setSelected(h)}
                  >
                    <View style={styles.avatar}>
                      <Text style={{ fontSize: rf(22) }}>{h.avatar}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.name}>{h.name}</Text>
                      <Text style={styles.addr}>{h.shortAddress}</Text>
                    </View>
                    <Text style={styles.count}>
                      {h.token}/{h.total}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            {selected && (
              <TouchableOpacity
                style={styles.confirmBtn}
                activeOpacity={0.85}
                onPress={() => {
                  onSelect(selected);
                  navigation.navigate("DoctorBooking", { hospital: selected });
                  onClose();
                }}
              >
                <Text style={styles.confirmText}>Select {selected.name}</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
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

export default SearchModal;