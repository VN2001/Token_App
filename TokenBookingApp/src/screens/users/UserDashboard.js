import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: '⌂' },
    { id: 'list', icon: '☰' },
    { id: 'search', icon: '⌕' },
    { id: 'bell', icon: '🔔' },
    { id: 'profile', icon: '👤' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f5f5" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.clockIcon}>
              <Text style={styles.clockText}>🕐</Text>
            </View>
            <View>
              <Text style={styles.dayText}>Monday</Text>
              <Text style={styles.locationText}>Tirunelveli, Maharaj...</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            {/* Toggle */}
            <View style={styles.toggle}>
              <View style={styles.toggleThumb} />
            </View>
            {/* Menu icon */}
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={[styles.menuLine, { width: 14 }]} />
              <View style={styles.menuLine} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Token Card */}
        <View style={styles.tokenCard}>
          {/* Token Number Box */}
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Token{'\n'}Number</Text>
            <Text style={styles.tokenNumber}>05</Text>
          </View>

          {/* Image Grid */}
          <View style={styles.imageGrid}>
            <View style={styles.imageTop}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageEmoji}>🚗</Text>
              </View>
            </View>
            <View style={styles.imageBottom}>
              <View style={[styles.imagePlaceholder, styles.imagePlaceholderSm]}>
                <Text style={styles.imageEmoji}>📱</Text>
              </View>
              <View style={[styles.imagePlaceholder, styles.imagePlaceholderSm]}>
                <Text style={styles.imageEmoji}>💼</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Arrow Button */}
        <View style={styles.arrowRow}>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* No Available Slots */}
        <View style={styles.slotsCard}>
          <Text style={styles.slotsText}>No Available Slots</Text>
        </View>

        {/* Create New Slot */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createIcon}>+</Text>
        </TouchableOpacity>
        <Text style={styles.createLabel}>Create a New Slot</Text>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === tab.id && styles.navIconActive,
              ]}
            >
              {tab.icon}
            </Text>
            {activeTab === tab.id && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const TEAL = '#7ececa';
const TEAL_LIGHT = '#e8f6f6';
const TEAL_DARK = '#5bbcbc';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },

  // Header
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  clockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    fontSize: 18,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2e2e',
    letterSpacing: 0.3,
  },
  locationText: {
    fontSize: 11,
    color: '#7a9e9e',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: TEAL,
    justifyContent: 'center',
    paddingHorizontal: 3,
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  menuButton: {
    gap: 4,
    padding: 4,
  },
  menuLine: {
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#4a7070',
  },

  // Token Card
  tokenCard: {
    width: '100%',
    backgroundColor: TEAL_LIGHT,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: TEAL,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tokenBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    minWidth: 110,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tokenLabel: {
    fontSize: 11,
    color: '#7a9e9e',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 15,
  },
  tokenNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1a2e2e',
    lineHeight: 56,
    marginTop: 2,
  },

  // Image Grid
  imageGrid: {
    flex: 1,
    marginLeft: 14,
    gap: 8,
  },
  imageTop: {
    flex: 1,
  },
  imageBottom: {
    flexDirection: 'row',
    gap: 8,
  },
  imagePlaceholder: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
  },
  imagePlaceholderSm: {
    height: 60,
  },
  imageEmoji: {
    fontSize: 28,
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#c5dada',
  },
  dotActive: {
    backgroundColor: TEAL_DARK,
    width: 20,
  },

  // Arrow
  arrowRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  arrowText: {
    fontSize: 20,
    color: '#1a2e2e',
    fontWeight: '600',
  },

  // Slots Card
  slotsCard: {
    width: '100%',
    backgroundColor: TEAL_LIGHT,
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  slotsText: {
    fontSize: 15,
    color: '#4a7070',
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // Create Button
  createButton: {
    width: '100%',
    backgroundColor: TEAL,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: TEAL_DARK,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  createIcon: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '300',
    lineHeight: 32,
  },
  createLabel: {
    fontSize: 13,
    color: '#4a7070',
    fontWeight: '500',
    marginBottom: 10,
  },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 22,
    color: '#b0c8c8',
  },
  navIconActive: {
    color: TEAL_DARK,
  },
  navDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: TEAL_DARK,
    marginTop: 3,
  },
});

export default UserDashboard;