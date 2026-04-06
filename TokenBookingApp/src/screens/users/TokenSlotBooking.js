import  { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import { rs, vs, rf } from "../../utils/responsive";

// ─── Same palette as UserDashboard ───────────────────────────────────────────
const C = {
  purple:      '#7B5FEB',
  purpleLight: '#EDE8FC',
  purpleMid:   '#C4B0F8',
  purpleDark:  '#6347D4',
  purpleDeep:  '#4A2FB8',
  textDark:    '#1A1035',
  textMid:     '#7B6BA8',
  bg:          '#F5F3FF',
  white:       '#FFFFFF',
  success:     '#00D4A0',
};

const MOCK_AVAILABLE_SLOTS = [
  { id: '1', time: '09:00 AM', date: 'Today',    amount: 50  },
  { id: '2', time: '10:30 AM', date: 'Today',    amount: 75  },
  { id: '3', time: '02:00 PM', date: 'Today',    amount: 50  },
  { id: '4', time: '04:15 PM', date: 'Today',    amount: 100 },
  { id: '5', time: '09:00 AM', date: 'Tomorrow', amount: 50  },
  { id: '6', time: '11:00 AM', date: 'Tomorrow', amount: 75  },
];

const TokenSlotBooking = () => {
  const [selectedSlot, setSelectedSlot]       = useState(null);
  const [showAmountModal, setShowAmountModal] = useState(false);

  const handleSlotPress = (slot) => {
    setSelectedSlot(slot);
    setShowAmountModal(true);
  };

  const closeModal = () => {
    setShowAmountModal(false);
    setSelectedSlot(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>

      <View style={styles.slotListContent}>
        {MOCK_AVAILABLE_SLOTS.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          return (
            <TouchableOpacity
              key={slot.id}
              style={[styles.slotCard, isSelected && styles.slotCardSelected]}
              onPress={() => handleSlotPress(slot)}
              activeOpacity={0.82}
            >
              {/* Left: white info box — mirrors tokenBox style */}
              <View style={styles.slotInfoBox}>
                <Text style={styles.slotInfoLabel}>Time</Text>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{slot.date}</Text>
                </View>
              </View>

              {/* Right: rupee indicator */}
              <View style={styles.slotRight}>
                <Text style={styles.slotRightLabel}>Consultation</Text>
                <Text style={styles.slotRightSub}>Tap to view amount</Text>
                <View style={styles.rupeeCircle}>
                  <Text style={styles.rupeeText}>₹</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Amount Modal ── */}
      <Modal
        visible={showAmountModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>

            {/* Modal header — purple card style */}
            <View style={styles.modalHeader}>
              {/* White token-style box */}
              <View style={styles.modalTokenBox}>
                <Text style={styles.modalTokenLabel}>Token</Text>
                <Text style={styles.modalTokenNum}>—</Text>
                <View style={styles.modalTimeBadge}>
                  <Text style={styles.modalTimeBadgeSmall}>Time</Text>
                  <Text style={styles.modalTimeBadgeText}>
                    {selectedSlot?.time ?? ''}
                  </Text>
                </View>
              </View>

              {/* Info on the right */}
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>Slot Details</Text>
                <Text style={styles.modalDate}>{selectedSlot?.date}</Text>
                <View style={styles.modalAmountBadge}>
                  <Text style={styles.modalAmountLabel}>Amount to Pay</Text>
                  <Text style={styles.modalAmountValue}>
                    ₹{selectedSlot?.amount}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action buttons */}
            <TouchableOpacity style={styles.confirmButton} activeOpacity={0.85}>
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={closeModal} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: vs(18),
  },

  title: {
    fontSize: rf(16),
    fontWeight: '800',
    color: C.textDark,
    marginBottom: vs(14),
  },

  slotListContent: {
    gap: vs(12),
    paddingBottom: vs(4),
  },

  // ── Slot Card ─────────────────────────
  slotCard: {
    backgroundColor: C.purple,
    borderRadius: rs(22),
    padding: rs(14),
    flexDirection: 'row',
    gap: rs(14),
    elevation: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  slotCardSelected: {
    borderColor: C.white,
  },

  // Left box
  slotInfoBox: {
    backgroundColor: C.white,
    borderRadius: rs(16),
    padding: rs(12),
    alignItems: 'center',
    minWidth: rs(100),
    justifyContent: 'center',
  },

  slotInfoLabel: {
    fontSize: rf(10),
    color: C.textMid,
    fontWeight: '700',
  },

  slotTime: {
    fontSize: rf(15),
    fontWeight: '900',
    color: C.textDark,
    marginBottom: vs(6),
  },

  dateBadge: {
    backgroundColor: C.purple,
    borderRadius: rs(12),
    paddingVertical: vs(3),
    paddingHorizontal: rs(10),
    width: '100%',
    alignItems: 'center',
  },

  dateBadgeText: {
    fontSize: rf(10),
    color: C.white,
    fontWeight: '800',
  },

  // Right
  slotRight: {
    flex: 1,
    justifyContent: 'center',
    gap: vs(6),
  },

  slotRightLabel: {
    fontSize: rf(14),
    fontWeight: '800',
    color: C.white,
  },

  slotRightSub: {
    fontSize: rf(11),
    color: 'rgba(255,255,255,0.7)',
  },

  rupeeCircle: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(4),
  },

  rupeeText: {
    fontSize: rf(16),
    color: C.white,
    fontWeight: '800',
  },

  // ── Modal ────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,16,53,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: rs(24),
  },

  modalContent: {
    width: '100%',
    maxWidth: rs(340),
    backgroundColor: C.bg,
    borderRadius: rs(28),
    padding: rs(20),
    elevation: 14,
  },

  modalHeader: {
    backgroundColor: C.purple,
    borderRadius: rs(22),
    padding: rs(14),
    flexDirection: 'row',
    gap: rs(14),
    marginBottom: vs(16),
  },

  modalTokenBox: {
    backgroundColor: C.white,
    borderRadius: rs(16),
    padding: rs(12),
    alignItems: 'center',
    minWidth: rs(90),
  },

  modalTokenLabel: {
    fontSize: rf(10),
    color: C.textMid,
  },

  modalTokenNum: {
    fontSize: rf(36),
    fontWeight: '900',
    color: C.textDark,
  },

  modalTimeBadge: {
    backgroundColor: C.purple,
    borderRadius: rs(12),
    paddingVertical: vs(4),
    paddingHorizontal: rs(8),
    width: '100%',
    alignItems: 'center',
  },

  modalTimeBadgeSmall: {
    fontSize: rf(8),
    color: 'rgba(255,255,255,0.8)',
  },

  modalTimeBadgeText: {
    fontSize: rf(11),
    color: C.white,
    fontWeight: '800',
  },

  modalInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: vs(6),
  },

  modalTitle: {
    fontSize: rf(15),
    fontWeight: '800',
    color: C.white,
  },

  modalDate: {
    fontSize: rf(12),
    color: 'rgba(255,255,255,0.75)',
  },

  modalAmountBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: rs(14),
    paddingVertical: vs(8),
    paddingHorizontal: rs(12),
    marginTop: vs(4),
  },

  modalAmountLabel: {
    fontSize: rf(9),
    color: 'rgba(255,255,255,0.75)',
  },

  modalAmountValue: {
    fontSize: rf(28),
    fontWeight: '900',
    color: C.white,
  },

  // Buttons
  confirmButton: {
    backgroundColor: C.purple,
    borderRadius: rs(50),
    paddingVertical: vs(15),
    alignItems: 'center',
    marginBottom: vs(10),
  },

  confirmButtonText: {
    color: C.white,
    fontSize: rf(15),
    fontWeight: '800',
  },

  cancelButton: {
    backgroundColor: C.purpleLight,
    borderRadius: rs(50),
    paddingVertical: vs(13),
    alignItems: 'center',
  },

  cancelButtonText: {
    color: C.purple,
    fontSize: rf(14),
    fontWeight: '800',
  },
});

export default TokenSlotBooking;