import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
  Modal,
  Animated,
} from "react-native";
// Add this import at the top
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rs, vs, rf } from "../../utils/responsive";
import Svg, { Path, Circle, Rect } from "react-native-svg";
const videoIconImg = require("../../../assets/video_icon.png");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const doctorImg = require("../../../assets/Doctor_img.png");
const grpDoctor = require("../../../assets/grpDoctor.jpeg");

const getProfilesKey = (hospitalName) => `SavedPatientProfiles_${hospitalName}`;
const LAST_BOOKING_KEY = "LastDoctorBooking";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const StarIcon = ({ size = 16, color = "#7B5FEB" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

const AlertIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="#FF4444" />
    <Rect x="11" y="7" width="2" height="6" rx="1" fill="#fff" />
    <Circle cx="12" cy="16.5" r="1.2" fill="#fff" />
  </Svg>
);

const ChevronDown = ({ size = 12, color = "#999" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BackIcon = ({ size = 20, color = "#333" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckIcon = ({ size = 18, color = "#7B5FEB" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowRightIcon = ({ size = 22, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Underline Input ──────────────────────────────────────────────────────────
const UnderlineInput = ({ placeholder, value, onChangeText, keyboardType, half, dark }) => (
  <View style={[styles.underlineInputWrap, half && { width: "47%" }]}>
    <TextInput
      style={[styles.underlineInput, dark && { color: "#fff" }]}
      placeholder={placeholder}
      placeholderTextColor={dark ? "rgba(255,255,255,0.4)" : "#BBBBBB"}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || "default"}
    />
    <View style={[styles.underlineLine, dark && { backgroundColor: "rgba(255,255,255,0.25)" }]} />
  </View>
);

// ─── Underline Dropdown ───────────────────────────────────────────────────────
const UnderlineDropdown = ({ placeholder, value, onPress, half, dark }) => (
  <TouchableOpacity
    style={[styles.underlineInputWrap, half && { width: "47%" }]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.dropdownRow}>
      <Text
        style={[
          styles.dropdownPlaceholder,
          value && { color: dark ? "#fff" : "#333" },
          !value && dark && { color: "rgba(255,255,255,0.4)" },
        ]}
      >
        {value || placeholder}
      </Text>
      <ChevronDown color={dark ? "rgba(255,255,255,0.5)" : "#999"} />
    </View>
    <View style={[styles.underlineLine, dark && { backgroundColor: "rgba(255,255,255,0.25)" }]} />
  </TouchableOpacity>
);

// ─── Profile Avatar ───────────────────────────────────────────────────────────
const ProfileAvatar = ({ name, size = 44 }) => {
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  const colors = ["#7B5FEB", "#5F8BEB", "#EB5F7B", "#5FEB8B", "#EBA85F"];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
  return (
    <View
      style={[
        styles.avatarCircle,
        {
          width: rs(size),
          height: rs(size),
          borderRadius: rs(size / 2),
          backgroundColor: colors[colorIndex],
        },
      ]}
    >
      <Text style={[styles.avatarInitials, { fontSize: rf(size * 0.35) }]}>
        {initials}
      </Text>
    </View>
  );
};

// ─── Inline Profile Form (OUTSIDE main component, receives all via props) ─────
const InlineProfileForm = ({ inlineForm, setInlineForm, onSave }) => {
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];

  return (
    <View style={styles.inlineFormWrap}>
      <View style={styles.formRow}>
        <UnderlineInput
          placeholder="Name"
          value={inlineForm.name}
          onChangeText={(v) => setInlineForm((p) => ({ ...p, name: v }))}
          half
        />
        <UnderlineInput
          placeholder="Age"
          value={inlineForm.age}
          onChangeText={(v) => setInlineForm((p) => ({ ...p, age: v }))}
          keyboardType="numeric"
          half
        />
      </View>

      <View style={[styles.formRow, { marginBottom: vs(8) }]}>
        {/* Gender Dropdown */}
        <View style={{ width: "47%" }}>
          <TouchableOpacity
            style={styles.underlineInputWrap}
            activeOpacity={0.7}
            onPress={() => setShowGenderOptions(!showGenderOptions)}
          >
            <View style={styles.dropdownRow}>
              <Text style={[styles.dropdownPlaceholder, inlineForm.gender && { color: "#333" }]}>
                {inlineForm.gender || "Gender"}
              </Text>
              <ChevronDown color="#999" />
            </View>
            <View style={styles.underlineLine} />
          </TouchableOpacity>

          {/* Gender Options List */}
          {showGenderOptions && (
            <View style={genderStyles.optionsBox}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    genderStyles.optionItem,
                    inlineForm.gender === option && genderStyles.optionItemSelected,
                  ]}
                  onPress={() => {
                    setInlineForm((p) => ({ ...p, gender: option }));
                    setShowGenderOptions(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      genderStyles.optionText,
                      inlineForm.gender === option && genderStyles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {inlineForm.gender === option && (
                    <CheckIcon size={rs(16)} color="#7B5FEB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <UnderlineInput
          placeholder="Additional Info"
          value={inlineForm.additionalInfo}
          onChangeText={(v) => setInlineForm((p) => ({ ...p, additionalInfo: v }))}
          half
        />
      </View>

      <TouchableOpacity
        style={[styles.inlineSaveBtn, { marginTop: vs(20) }]}
        activeOpacity={0.85}
        onPress={onSave}
      >
        <Text style={styles.inlineSaveBtnText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── Add Profile Modal ────────────────────────────────────────────────────────
const AddProfileModal = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
    if (visible) {
      setName("");
      setAge("");
      setGender("");
      setAdditionalInfo("");
    }
  }, [visible]);

  const cycleGender = () => {
    if (!gender) setGender("Male");
    else if (gender === "Male") setGender("Female");
    else if (gender === "Female") setGender("Other");
    else setGender("");
  };

  const handleSave = () => {
    if (!name.trim() || !age.trim() || !gender.trim()) {
      Alert.alert("Missing Details", "Please fill Name, Age and Gender.");
      return;
    }
    onSave({ name: name.trim(), age: age.trim(), gender, additionalInfo: additionalInfo.trim() });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[modalStyles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={modalStyles.handle} />
          <Text style={modalStyles.title}>Add New Profile</Text>
          <View style={styles.formRow}>
            <UnderlineInput placeholder="Name" value={name} onChangeText={setName} half />
            <UnderlineInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" half />
          </View>
          <View style={[styles.formRow, { marginBottom: vs(24) }]}>
            <UnderlineDropdown placeholder="Gender" value={gender} onPress={cycleGender} half />
            <UnderlineInput placeholder="Additional Info" value={additionalInfo} onChangeText={setAdditionalInfo} half />
          </View>
          <TouchableOpacity style={modalStyles.saveBtn} activeOpacity={0.85} onPress={handleSave}>
            <Text style={modalStyles.saveBtnText}>Save Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ─── Profile Card ─────────────────────────────────────────────────────────────
const ProfileCard = ({ profile, selected, onSelect }) => (
  <TouchableOpacity
    style={[styles.profileCard, selected && styles.profileCardSelected]}
    activeOpacity={0.8}
    onPress={() => onSelect(profile.id)}
  >
    <ProfileAvatar name={profile.name} size={50} />
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileMeta}>
        Age: {profile.age}   {profile.gender}
        {profile.additionalInfo ? `   ${profile.additionalInfo}` : ""}
      </Text>
    </View>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <View style={styles.dragHandle} />
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DoctorBookingScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("live");
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [saveProfile, setSaveProfile] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [count, setCount] = useState("3");
  const [showCountPicker, setShowCountPicker] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inlineForm, setInlineForm] = useState({
    name: "",
    age: "",
    gender: "",
    additionalInfo: "",
  });
  const hospital = route?.params?.hospital;

  useEffect(() => {
    loadProfiles();
  }, []);

const loadProfiles = async () => {
  try {
    const key = getProfilesKey(hospital?.name || "default");
    const raw = await AsyncStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.length > 0) {
          setProfiles(parsed);
          setSelectedProfileId(parsed[0].id);
          setIsFirstTime(false);
        } else {
          setIsFirstTime(true);
        }
      } else {
        setIsFirstTime(true);
      }
    } catch (err) {
      console.warn("Could not load profiles", err);
      setIsFirstTime(true);
    } finally {
      setLoaded(true);
    }
  };

  // ── Called from InlineProfileForm's onSave prop ───────────────────────────
  const handleInlineSave = async () => {
    const { name, age, gender, additionalInfo } = inlineForm;
    if (!name.trim() || !age.trim() || !gender.trim()) {
      Alert.alert("Missing Details", "Please fill Name, Age and Gender.");
      return;
    }
    const newProfile = {
      name: name.trim(),
      age: age.trim(),
      gender,
      additionalInfo: additionalInfo.trim(),
      id: Date.now().toString(),
    };
    const updated = [newProfile];
    setProfiles(updated);
    setSelectedProfileId(newProfile.id);
    setIsFirstTime(false);
    try {
      await AsyncStorage.setItem(getProfilesKey(hospital?.name || "default"),
      JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save profiles", err);
    }
  };

  const handleAddProfile = async (newProfile) => {
    const profileWithId = { ...newProfile, id: Date.now().toString() };
    const updated = [...profiles, profileWithId];
    setProfiles(updated);
    setSelectedProfileId(profileWithId.id);
    try {
      await AsyncStorage.setItem(getProfilesKey(hospital?.name || "default"),
      JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save profiles", err);
    }
  };

  const handleMakePayment = async () => {
    const selected = profiles.find((p) => p.id === selectedProfileId);
    if (!selected) {
      Alert.alert("No Profile Selected", "Please select or add a patient profile to continue.");
      return;
    }
    const bookingInfo = {
      ...selected,
      count,
      hospital: hospital?.name || "Unknown",
      date: "Feb 12, 2026",
      time: "11:45pm",
      amount: hospital?.amount || "₹199.00",
    };
    try {
      if (saveProfile) {
        await AsyncStorage.setItem(getProfilesKey(hospital?.name || "default"),
    JSON.stringify(profiles));
      }
      await AsyncStorage.setItem(
        LAST_BOOKING_KEY,
        JSON.stringify({ ...bookingInfo, bookedAt: new Date().toISOString() })
      );
      navigation.navigate("Payment", { bookingInfo, hospital });
    } catch (err) {
      console.warn("Failed to save booking", err);
      navigation.navigate("Payment", { bookingInfo, hospital });
    }
  };

  // ── Renders the correct content inside the dark profiles card ────────────
  const renderProfilesSection = () => {
    if (!loaded) {
      return (
        <View style={styles.noProfilesBox}>
          <Text style={styles.noProfilesText}>Loading...</Text>
        </View>
      );
    }

    if (isFirstTime) {
      // ✅ Pass ALL needed state/handlers as props — no closures from parent scope
      return (
        <InlineProfileForm
          inlineForm={inlineForm}
          setInlineForm={setInlineForm}
          onSave={handleInlineSave}
        />
      );
    }

    return profiles.map((profile) => (
      <ProfileCard
        key={profile.id}
        profile={profile}
        selected={selectedProfileId === profile.id}
        onSelect={setSelectedProfileId}
      />
    ));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#e7dbff" translucent />

      {/* ── Hero Section ── */}
      <View style={styles.heroBg}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.75}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.doctorImageWrap}>
            <Image source={doctorImg} style={styles.doctorImage} />
          </View>
          <View style={styles.heroInfo}>
            <View style={styles.ratingBadge}>
              <StarIcon size={rs(14)} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <Text style={styles.doctorName}>Doctor Rahul{"\n"}Hameed</Text>
            <Text style={styles.specialty}>(Cardiocologist)</Text>
            {!!hospital?.name && (
              <Text style={styles.hospitalName}>{hospital.name}</Text>
            )}
            <View style={styles.slotRow}>
              <Text style={styles.slotLabel}>Available Slots</Text>
              <View style={styles.slotBadge}>
                <Text style={styles.slotBadgeText}>02/50</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* ── White Card ── */}
      <View style={styles.whiteCard}>
        <KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}
  keyboardShouldPersistTaps="handled"
  enableOnAndroid={true}
  extraScrollHeight={vs(150)}
  enableAutomaticScroll={true}
  extraHeight={vs(150)}
>
          {/* Booking Header */}
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>Booking Details</Text>
            <View style={styles.alertRow}>
              <AlertIcon size={rs(26)} />
              <Text style={styles.alertSlotText}>Available Slots</Text>
            </View>
          </View>

          {/* Tab Toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === "live" && styles.tabBtnActive]}
              onPress={() => setActiveTab("live")}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === "live" && styles.tabTextActive]}>
                Live Meet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === "video" && styles.tabBtnActive]}
              onPress={() => setActiveTab("video")}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === "video" && styles.tabTextActive]}>
                Video Call
              </Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Banner */}
          <View style={styles.scheduleBanner}>
            <View style={styles.bannerLeft}>
              <Image source={grpDoctor} style={styles.bannerDoctorImage} resizeMode="cover" />
            </View>
            <View style={styles.bannerRight}>
              <View style={styles.bannerTopRow}>
                <View style={styles.bannerIconWrap}>
                  <Image source={videoIconImg} style={styles.bannerVideoIcon} resizeMode="contain" />
                </View>
                <Text style={styles.bannerTitle}>Schedule Live{"\n"}Video Meet</Text>
              </View>
              <View style={styles.bannerBottom}>
                <Text style={styles.bannerAvail}>Now Available</Text>
                <View style={styles.bannerSlotBadge}>
                  <Text style={styles.bannerSlotText}>02/50</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Date / Time / Count Row */}
          <View style={styles.bottomRow}>
            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardLabel}>Date</Text>
              <Text style={styles.bottomCardValue}>Feb 12,2026</Text>
            </View>
            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardLabel}>Time</Text>
              <Text style={styles.bottomCardValue}>11:45pm</Text>
            </View>
            <TouchableOpacity
              style={[styles.bottomCard, styles.countCard]}
              onPress={() => setShowCountPicker(!showCountPicker)}
              activeOpacity={0.7}
            >
              <Text style={styles.bottomCardValue}>Count </Text>
              <Text style={styles.countNumber}>{count}</Text>
              <ChevronDown size={rs(12)} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Count Picker */}
          {showCountPicker && (
            <View style={styles.countPickerDropdown}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={styles.countPickerOption}
                  onPress={() => { setCount(num); setShowCountPicker(false); }}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.countPickerText, count === num && styles.countPickerTextSelected]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* ── Profiles Dark Card ── */}
          <View style={[styles.profilesCard, isFirstTime && { backgroundColor: "#fff" }]}>
            <View style={styles.profilesCardHeader}>
              <Text style={[styles.profilesCardTitle, isFirstTime && { color: "#2a0e6c" }]}>
  {isFirstTime ? "Create Profile" : "Select Profiles"}
</Text>
              {/* Only show "Add New +" when user already has profiles */}
              {!isFirstTime && loaded && (
                <TouchableOpacity
                  style={styles.addNewBtn}
                  activeOpacity={0.85}
                  onPress={() => setShowAddModal(true)}
                >
                  <Text style={styles.addNewBtnText}>Add New +</Text>
                </TouchableOpacity>
              )}
            </View>

            {renderProfilesSection()}
          </View>

          {/* Footer: Checkbox + Pay Button */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.7}
              onPress={() => setSaveProfile(!saveProfile)}
            >
              <View style={[styles.checkbox, saveProfile && styles.checkboxChecked]}>
                {saveProfile && <CheckIcon size={rs(14)} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>Save Profile to Lorel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.payBtn} activeOpacity={0.85} onPress={handleMakePayment}>
              <View style={styles.payBtnTextCol}>
                <Text style={styles.payBtnLabel}>Make Payment</Text>
                <Text style={styles.payBtnAmount}>{hospital?.amount || "₹199.00"}</Text>
              </View>
              <View style={styles.payBtnArrow}>
                <ArrowRightIcon size={rs(20)} />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* Add Profile Modal (for returning users clicking "Add New +") */}
      <AddProfileModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProfile}
      />
    </View>
  );
}

const genderStyles = StyleSheet.create({
  optionsBox: {
    position: "absolute",
    top: vs(36),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: vs(4) },
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rs(14),
    paddingVertical: vs(11),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionItemSelected: {
    backgroundColor: "#f0e9ff",
  },
  optionText: {
    fontSize: rf(14),
    color: "#555",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#7B5FEB",
    fontWeight: "700",
  },
});

// ─── Modal Styles ─────────────────────────────────────────────────────────────
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    padding: rs(24),
    paddingBottom: Platform.OS === "ios" ? vs(44) : vs(28),
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
    color: "#111",
    marginBottom: vs(24),
  },
  saveBtn: {
    backgroundColor: "#7B5FEB",
    borderRadius: rs(50),
    paddingVertical: vs(15),
    alignItems: "center",
    marginTop: vs(8),
    elevation: 6,
    shadowColor: "#7B5FEB",
    shadowOpacity: 0.35,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: vs(4) },
  },
  saveBtnText: {
    color: "#fff",
    fontSize: rf(16),
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

// ─── Main Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#e7dbff" },

  heroBg: {
    backgroundColor: "#e7dbff",
    paddingTop: Platform.OS === "ios" ? vs(54) : vs(40),
    paddingHorizontal: rs(20),
    paddingBottom: vs(28),
  },
  backBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vs(12),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: rs(6),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 3,
  },
  heroContent: { flexDirection: "row", alignItems: "flex-end" },
  doctorImageWrap: {
    width: SCREEN_WIDTH * 0.42,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  doctorImage: { width: rs(140), height: rs(180), resizeMode: "contain" },
  heroInfo: { flex: 1, paddingLeft: rs(8), paddingBottom: vs(8) },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: rs(10),
    paddingVertical: vs(5),
    borderRadius: rs(20),
    marginBottom: vs(8),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: rs(4),
    shadowOffset: { width: 0, height: vs(2) },
    elevation: 3,
    gap: rs(4),
  },
  ratingText: { fontSize: rf(14), fontWeight: "700", color: "#222" },
  doctorName: {
    fontSize: rf(19),
    fontWeight: "800",
    color: "#111",
    lineHeight: rf(26),
    marginBottom: vs(4),
  },
  specialty: { fontSize: rf(13), color: "#555", marginBottom: vs(10) },
  hospitalName: {
    fontSize: rf(13),
    color: "#333",
    fontWeight: "700",
    marginTop: -vs(6),
    marginBottom: vs(10),
  },
  slotRow: { flexDirection: "row", alignItems: "center", gap: rs(8) },
  slotLabel: { fontSize: rf(12), color: "#7B5FEB", fontWeight: "500" },
  slotBadge: {
    backgroundColor: "#7B5FEB",
    borderRadius: rs(10),
    paddingHorizontal: rs(15),
    paddingVertical: vs(4),
  },
  slotBadgeText: { color: "#fff", fontSize: rf(12), fontWeight: "700" },

  whiteCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: -vs(4) },
    elevation: 10,
  },
  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: vs(22),
    paddingBottom: vs(40),
  },

  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: vs(18),
  },
  bookingTitle: { fontSize: rf(20), fontWeight: "800", color: "#111" },
  alertRow: { flexDirection: "row", alignItems: "center", gap: rs(6) },
  alertSlotText: { fontSize: rf(13), color: "#7B5FEB", fontWeight: "500" },

  tabRow: { flexDirection: "row", gap: rs(12), marginBottom: vs(18) },
  tabBtn: {
    flex: 1,
    paddingVertical: vs(8),
    alignItems: "center",
    borderRadius: rs(25),
    backgroundColor: "#F2F2F2",
  },
  tabBtnActive: {
    backgroundColor: "#7B5FEB",
    shadowColor: "#7B5FEB",
    shadowOpacity: 0.35,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 6,
  },
  tabText: { fontSize: rf(14), fontWeight: "600", color: "#888" },
  tabTextActive: { color: "#fff", fontWeight: "800" },

  scheduleBanner: {
    backgroundColor: "#7B5FEB",
    borderRadius: rs(20),
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: vs(20),
    height: vs(100),
  },
  bannerLeft: { width: "45%" },
  bannerDoctorImage: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerRight: {
    flex: 1,
    paddingHorizontal: rs(12),
    paddingVertical: vs(16),
    justifyContent: "center",
    gap: vs(8),
  },
  bannerTopRow: { flexDirection: "row", alignItems: "center", gap: rs(8) },
  bannerIconWrap: {
    width: rs(28),
    height: rs(28),
    borderRadius: rs(14),
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerVideoIcon: { width: rs(16), height: rs(16) },
  bannerTitle: {
    fontSize: rf(14),
    fontWeight: "800",
    color: "#fff",
    lineHeight: rf(20),
    flexShrink: 1,
  },
  bannerBottom: { flexDirection: "row", alignItems: "center", gap: rs(8) },
  bannerAvail: {
    fontSize: rf(11),
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
  },
  bannerSlotBadge: {
    backgroundColor: "#fff",
    borderRadius: rs(20),
    paddingHorizontal: rs(10),
    paddingVertical: vs(3),
  },
  bannerSlotText: { fontSize: rf(11), color: "#333", fontWeight: "700" },

  bottomRow: { flexDirection: "row", gap: rs(8), marginBottom: vs(20) },
  bottomCard: {
    flex: 1,
    backgroundColor: "#f0e9ff",
    borderRadius: rs(14),
    paddingVertical: vs(10),
    paddingHorizontal: rs(10),
  },
  bottomCardLabel: { fontSize: rf(11), color: "#999", marginBottom: vs(3) },
  bottomCardValue: { fontSize: rf(13), fontWeight: "700", color: "#222" },
  countCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(14),
  },
  countNumber: { fontSize: rf(18), fontWeight: "800", color: "#222" },
  countPickerDropdown: {
    backgroundColor: "#fff",
    borderRadius: rs(12),
    marginTop: -vs(12),
    marginBottom: vs(16),
    paddingVertical: vs(8),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: rs(6),
    paddingHorizontal: rs(10),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  countPickerOption: {
    width: "22%",
    paddingVertical: vs(10),
    alignItems: "center",
    backgroundColor: "#F4F4F8",
    borderRadius: rs(10),
    marginVertical: vs(4),
  },
  countPickerText: { fontSize: rf(14), fontWeight: "600", color: "#999" },
  countPickerTextSelected: { color: "#7B5FEB", fontWeight: "800" },

  profilesCard: {
    backgroundColor: "#2a0e6c",
    borderRadius: rs(24),
    padding: rs(18),
    paddingTop: vs(16),
    marginBottom: vs(20),
  },
  profilesCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: vs(16),
  },
  profilesCardTitle: { fontSize: rf(17), fontWeight: "800", color: "#fff" },
  addNewBtn: {
    backgroundColor: "#fff",
    borderRadius: rs(50),
    paddingHorizontal: rs(16),
    paddingVertical: vs(7),
  },
  addNewBtnText: { fontSize: rf(13), fontWeight: "700", color: "#2D1B6B" },

  noProfilesBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: rs(16),
    paddingVertical: vs(24),
    alignItems: "center",
    marginBottom: vs(8),
  },
  noProfilesText: {
    fontSize: rf(14),
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },

  // ── Inline Form ──
  inlineFormWrap: {
    paddingHorizontal: rs(4),
    paddingTop: vs(4),
  },
  inlineSaveBtn: {
    backgroundColor: "#7B5FEB",
    borderRadius: rs(50),
    paddingVertical: vs(14),
    alignItems: "center",
    marginTop: vs(4),
    elevation: 6,
    shadowColor: "#7B5FEB",
    shadowOpacity: 0.35,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: vs(4) },
  },
  inlineSaveBtnText: {
    color: "#fff",
    fontSize: rf(15),
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  profileCard: {
    backgroundColor: "#EDE8FC",
    borderRadius: rs(18),
    flexDirection: "row",
    alignItems: "center",
    padding: rs(12),
    marginBottom: vs(10),
    gap: rs(12),
    borderWidth: rs(2),
    borderColor: "transparent",
  },
  profileCardSelected: { borderColor: "#7B5FEB" },
  avatarCircle: { alignItems: "center", justifyContent: "center" },
  avatarInitials: { color: "#fff", fontWeight: "800" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: rf(15), fontWeight: "800", color: "#1A1035" },
  profileMeta: {
    fontSize: rf(11),
    color: "#7B6BA8",
    marginTop: vs(3),
    fontWeight: "500",
  },
  radioOuter: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: rs(2),
    borderColor: "#7B5FEB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: "#7B5FEB" },
  radioInner: {
    width: rs(10),
    height: rs(10),
    borderRadius: rs(5),
    backgroundColor: "#7B5FEB",
  },
  dragHandle: {
    width: rs(4),
    height: vs(32),
    borderRadius: rs(2),
    backgroundColor: "#C4B0F8",
    marginLeft: rs(4),
  },

  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: vs(18),
  },
  underlineInputWrap: { width: "100%" },
  underlineInput: {
    fontSize: rf(15),
    color: "#333",
    paddingBottom: vs(6),
    paddingTop: 0,
  },
  underlineLine: { height: 1, backgroundColor: "#E0E0E0" },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: vs(6),
  },
  dropdownPlaceholder: { fontSize: rf(15), color: "#BBBBBB" },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rs(12),
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(10),
    flex: 1,
  },
  checkbox: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(6),
    borderWidth: rs(2),
    borderColor: "#7B5FEB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: { backgroundColor: "#7B5FEB", borderColor: "#7B5FEB" },
  checkboxLabel: {
    fontSize: rf(12),
    color: "#555",
    fontWeight: "600",
    flexShrink: 1,
  },

  payBtn: {
    backgroundColor: "#7B5FEB",
    borderRadius: rs(50),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(10),
    paddingLeft: rs(16),
    paddingRight: rs(6),
    gap: rs(10),
    shadowColor: "#7B5FEB",
    shadowOpacity: 0.4,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: vs(4) },
    elevation: 8,
  },
  payBtnTextCol: { flexDirection: "column" },
  payBtnLabel: {
    fontSize: rf(10),
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
  },
  payBtnAmount: {
    fontSize: rf(17),
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  payBtnArrow: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: "#2D1B6B",
    alignItems: "center",
    justifyContent: "center",
  },
});