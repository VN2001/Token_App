import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

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
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: C.textDark,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  slotListContent: { gap: 12, paddingBottom: 4 },

  // ── Slot Card (purple, mirrors tokenCard) ──────────────────────────────────
  slotCard: {
    backgroundColor: C.purple,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  slotCardSelected: {
    borderColor: C.white,
    shadowOpacity: 0.6,
  },

  // Left white box
  slotInfoBox: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
    flexShrink: 0,
    justifyContent: 'center',
  },
  slotInfoLabel: {
    fontSize: 10,
    color: C.textMid,
    fontWeight: '700',
    marginBottom: 2,
  },
  slotTime: {
    fontSize: 15,
    fontWeight: '900',
    color: C.textDark,
    letterSpacing: 0.3,
    marginBottom: 6,
    textAlign: 'center',
  },
  dateBadge: {
    backgroundColor: C.purple,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
  },
  dateBadgeText: {
    fontSize: 10,
    color: C.white,
    fontWeight: '800',
  },

  // Right content
  slotRight: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  slotRightLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: C.white,
  },
  slotRightSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  rupeeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  rupeeText: {
    fontSize: 16,
    color: C.white,
    fontWeight: '800',
  },

  // ── Modal ──────────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,16,53,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: C.bg,
    borderRadius: 28,
    padding: 20,
    shadowColor: C.purpleDeep,
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },

  // Modal header card (mirrors tokenCard layout)
  modalHeader: {
    backgroundColor: C.purple,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  modalTokenBox: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 90,
    flexShrink: 0,
    justifyContent: 'center',
  },
  modalTokenLabel: {
    fontSize: 10,
    color: C.textMid,
    fontWeight: '700',
    marginBottom: 2,
  },
  modalTokenNum: {
    fontSize: 36,
    fontWeight: '900',
    color: C.textDark,
    lineHeight: 40,
    marginVertical: 2,
  },
  modalTimeBadge: {
    backgroundColor: C.purple,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '100%',
  },
  modalTimeBadgeSmall: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
  },
  modalTimeBadgeText: {
    fontSize: 11,
    color: C.white,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  modalInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: C.white,
  },
  modalDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
  },
  modalAmountBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  modalAmountLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  modalAmountValue: {
    fontSize: 28,
    fontWeight: '900',
    color: C.white,
    letterSpacing: 0.5,
  },

  // Buttons
  confirmButton: {
    backgroundColor: C.purple,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: C.purpleDark,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  confirmButtonText: {
    color: C.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  cancelButton: {
    backgroundColor: C.purpleLight,
    borderRadius: 50,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: C.purple,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

export default TokenSlotBooking;