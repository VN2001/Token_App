import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

// Mock available slots with time and amount
const MOCK_AVAILABLE_SLOTS = [
  { id: '1', time: '09:00 AM', date: 'Today', amount: 50, available: true },
  { id: '2', time: '10:30 AM', date: 'Today', amount: 75, available: true },
  { id: '3', time: '02:00 PM', date: 'Today', amount: 50, available: true },
  { id: '4', time: '04:15 PM', date: 'Today', amount: 100, available: true },
  { id: '5', time: '09:00 AM', date: 'Tomorrow', amount: 50, available: true },
  { id: '6', time: '11:00 AM', date: 'Tomorrow', amount: 75, available: true },
];

const TEAL = '#7ececa';
const TEAL_LIGHT = '#e8f6f6';
const TEAL_DARK = '#5bbcbc';

const TokenSlotBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
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
      <ScrollView
        style={styles.slotList}
        contentContainerStyle={styles.slotListContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_AVAILABLE_SLOTS.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.slotCard,
              selectedSlot?.id === slot.id && styles.slotCardSelected,
            ]}
            onPress={() => handleSlotPress(slot)}
            activeOpacity={0.7}
          >
            <View style={styles.slotTimeContainer}>
              <Text style={styles.slotTime}>{slot.time}</Text>
              <Text style={styles.slotDate}>{slot.date}</Text>
            </View>
            <View style={styles.slotIndicator}>
              <Text style={styles.slotIndicatorText}>₹</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showAmountModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Slot Amount</Text>
            {selectedSlot && (
              <>
                <View style={styles.modalSlotInfo}>
                  <Text style={styles.modalTime}>{selectedSlot.time}</Text>
                  <Text style={styles.modalDate}>{selectedSlot.date}</Text>
                </View>
                <View style={styles.amountBox}>
                  <Text style={styles.amountLabel}>Amount to Pay</Text>
                  <Text style={styles.amountValue}>₹{selectedSlot.amount}</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
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
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2e2e',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  slotList: {
    maxHeight: 280,
  },
  slotListContent: {
    gap: 10,
    paddingBottom: 4,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: TEAL_LIGHT,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: TEAL,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  slotCardSelected: {
    borderColor: TEAL_DARK,
    backgroundColor: '#d4f0ef',
  },
  slotTimeContainer: {
    flex: 1,
  },
  slotTime: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a2e2e',
    letterSpacing: 0.3,
  },
  slotDate: {
    fontSize: 12,
    color: '#4a7070',
    marginTop: 4,
    fontWeight: '500',
  },
  slotIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotIndicatorText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a2e2e',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  modalSlotInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTime: {
    fontSize: 24,
    fontWeight: '700',
    color: TEAL_DARK,
    letterSpacing: 0.5,
  },
  modalDate: {
    fontSize: 14,
    color: '#4a7070',
    marginTop: 4,
    fontWeight: '500',
  },
  amountBox: {
    backgroundColor: TEAL_LIGHT,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: TEAL,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a7070',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '800',
    color: TEAL_DARK,
    letterSpacing: 0.5,
  },
  closeButton: {
    backgroundColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default TokenSlotBooking;
