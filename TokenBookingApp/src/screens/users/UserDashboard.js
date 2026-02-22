import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const PURPLE       = '#7B5FEB';
const PURPLE_LIGHT = '#EDE8FC';
const PURPLE_MID   = '#C4B0F8';
const PURPLE_DARK  = '#6347D4';
const TEXT_DARK    = '#1A1035';
const TEXT_MID     = '#7B6BA8';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [seconds, setSeconds] = useState(89);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const tabs = [
    { id: 'home',    icon: '🏠' },
    { id: 'list',    icon: '☰'  },
    { id: 'search',  icon: '🔍' },
    { id: 'bell',    icon: '🔔' },
    { id: 'profile', icon: '👤' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

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
              <Text style={styles.greeting}>
                Hello <Text style={styles.greetingName}>Karthik!</Text>
              </Text>
              <Text style={styles.subGreeting}>Complete Your Profile Now...</Text>
            </View>
          </View>
          <View style={styles.notifWrapper}>
            <View style={styles.notifButton}>
              <Text style={styles.notifIcon}>🔔</Text>
            </View>
            <View style={styles.notifBadge} />
          </View>
        </View>

        {/* Token Card */}
        <View style={styles.tokenCard}>
          {/* Token Box */}
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Token Number</Text>
            <Text style={styles.tokenNumber}>05</Text>
            <View style={styles.slotBadge}>
              <Text style={styles.slotBadgeSmall}>Slot Starts Soon</Text>
              <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>
          </View>

          {/* Image Grid */}
          <View style={styles.imageGrid}>
            <View style={styles.imageTop}>
              <Text style={styles.imageEmoji}>🚗</Text>
            </View>
            <View style={styles.imageBottom}>
              <View style={styles.imageSmall}>
                <Text style={styles.imageEmoji}>📱</Text>
              </View>
              <View style={styles.imageSmall}>
                <Text style={styles.imageEmoji}>💼</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          {/* Recently Added Row */}
          <View style={styles.recentlyAddedRow}>
            <Text style={styles.recentlyAddedText}>Recently Added</Text>
            <Text style={styles.filterIcon}>⇅</Text>
          </View>

          {/* Hospital Row */}
          <View style={styles.hospitalRow}>
            <View style={styles.hospitalAvatar}>
              <Text style={styles.avatarEmoji}>👨‍👩‍👧</Text>
            </View>
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>Hospital Name</Text>
              <Text style={styles.hospitalSub}>Anna nagar (East), Road 45 ...</Text>
            </View>
            <View style={styles.hospitalRight}>
              <Text style={styles.hospitalCount}>02/50</Text>
              <View style={styles.arrowCircle}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </View>
          </View>

          {/* Book Button */}
          <TouchableOpacity style={styles.bookButton} activeOpacity={0.85}>
            <View style={styles.bookIconCircle}>
              <Text style={styles.bookIconText}>+</Text>
            </View>
            <Text style={styles.bookText}>Book New Slot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.navIcon, activeTab === tab.id && styles.navIconActive]}>
              {tab.icon}
            </Text>
            {activeTab === tab.id && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    marginTop:40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clockIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    fontSize: 22,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    letterSpacing: 0.2,
  },
  greetingName: {
    color: PURPLE,
    fontWeight: '700',
  },
  subGreeting: {
    fontSize: 11,
    color: TEXT_MID,
    marginTop: 2,
  },
  notifWrapper: {
    position: 'relative',
  },
  notifButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  notifIcon: {
    fontSize: 20,
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Token Card
  tokenCard: {
    backgroundColor: PURPLE,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
    shadowColor: PURPLE_DARK,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tokenBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    minWidth: 130,
    flexShrink: 0,
  },
  tokenLabel: {
    fontSize: 12,
    color: TEXT_MID,
    fontWeight: '600',
    textAlign: 'center',
  },
  tokenNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: TEXT_DARK,
    lineHeight: 70,
    marginVertical: 4,
  },
  slotBadge: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    alignItems: 'center',
    width: '100%',
  },
  slotBadgeSmall: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  timerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Image Grid
  imageGrid: {
    flex: 1,
    gap: 8,
  },
  imageTop: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: PURPLE_MID,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 90,
    opacity: 0.9,
  },
  imageBottom: {
    flexDirection: 'row',
    gap: 8,
  },
  imageSmall: {
    flex: 1,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#b8a3f5',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  imageEmoji: {
    fontSize: 30,
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: PURPLE_MID,
    opacity: 0.4,
  },
  dotActive: {
    width: 20,
    backgroundColor: PURPLE_DARK,
    opacity: 1,
  },

  // Bottom Card
  bottomCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    shadowColor: PURPLE,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  recentlyAddedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  recentlyAddedText: {
    fontSize: 12,
    color: TEXT_MID,
    fontWeight: '600',
  },
  filterIcon: {
    fontSize: 14,
    color: TEXT_MID,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  hospitalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  hospitalSub: {
    fontSize: 11,
    color: TEXT_MID,
    marginTop: 2,
  },
  hospitalRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  hospitalCount: {
    fontSize: 13,
    fontWeight: '700',
    color: PURPLE,
  },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: PURPLE_MID,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: '600',
  },

  // Book Button
  bookButton: {
    backgroundColor: PURPLE,
    borderRadius: 50,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: PURPLE_DARK,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  bookIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookIconText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '300',
    lineHeight: 24,
  },
  bookText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
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
    color: PURPLE_MID,
  },
  navIconActive: {
    color: PURPLE,
  },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: PURPLE,
    marginTop: 3,
  },
});

export default UserDashboard;