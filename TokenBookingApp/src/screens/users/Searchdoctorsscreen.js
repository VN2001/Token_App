import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rs, vs, rf } from '../../utils/responsive';

// ─── Icons ────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke="#bbb" strokeWidth="2" />
    <Path d="M21 21l-4.35-4.35" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Sliders/filter icon matching the screenshot
const FilterIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Line x1="4" y1="6" x2="20" y2="6" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    <Line x1="4" y1="12" x2="20" y2="12" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    <Line x1="4" y1="18" x2="20" y2="18" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="6" r="2.5" fill="#fff" stroke="#555" strokeWidth="1.5" />
    <Circle cx="16" cy="12" r="2.5" fill="#fff" stroke="#555" strokeWidth="1.5" />
    <Circle cx="10" cy="18" r="2.5" fill="#fff" stroke="#555" strokeWidth="1.5" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#fff" strokeWidth="2" />
    <Circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth="2" />
  </Svg>
);

const StarIcon = ({ size = 12, color = '#f5a623' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
    />
  </Svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const DOCTORS = [
  { id: '1', name: 'Shahul Hameed Hameed', spec: 'Gyno', rating: 4.5, price: '₹199.00', image: require('../../../assets/grpDoctor.jpeg') },
  { id: '2', name: 'Shahul Hameed Hameed', spec: 'Gyno', rating: 4.5, price: '₹199.00', image: require('../../../assets/grpDoctor.jpeg') },
  { id: '3', name: 'Shahul Hameed Hameed', spec: 'Gyno', rating: 4.5, price: '₹199.00', image: require('../../../assets/grpDoctor.jpeg') },
];

const MAP_REGION = {
  latitude: 11.0168,
  longitude: 76.9558,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const MAP_MARKER = { latitude: 11.0168, longitude: 76.9558 };

// ─── Doctor Card ──────────────────────────────────────────────────────────────

const DoctorCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.docCard} activeOpacity={0.85} onPress={onPress}>
    <Image source={item.image} style={styles.docImage} resizeMode="cover" />
    <View style={styles.docInfo}>
      <Text style={styles.docName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.docMeta}>
        <Text style={styles.docSpec}>{item.spec}</Text>
        <View style={styles.ratingRow}>
          <StarIcon />
          <Text style={styles.ratingVal}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.docPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchDoctorsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search for Doctors</Text>
          <View style={{ width: rs(32) }} />
        </View>

        {/* ── Search bar ── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <SearchIcon />
            <TextInput
              placeholder="Search for Hospitals"
              placeholderTextColor="#c0c0c0"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <FilterIcon />
          </TouchableOpacity>
        </View>

        {/* ── Clinic section header ── */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Hameed Clinic</Text>
            <Text style={styles.sectionSub}>35 Doctors available</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* ── Doctor cards (horizontal scroll) ── */}
        <FlatList
          data={DOCTORS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
          renderItem={({ item }) => (
            <DoctorCard
              item={item}
              onPress={() => navigation?.navigate('DoctorDetail', { doctor: item })}
            />
          )}
        />

        {/* ── Find in Map section ── */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <View>
              <Text style={styles.sectionTitle}>Find in Map</Text>
              <Text style={styles.sectionSub}>5.5km</Text>
            </View>
            <TouchableOpacity style={styles.viewMapBtn}>
              <MapPinIcon />
              <Text style={styles.viewMapText}>View in Google maps</Text>
            </TouchableOpacity>
          </View>

          {/* Map + aside card side by side */}
          <View style={styles.mapRow}>
            <View style={styles.mapThumb}>
              <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={MAP_REGION}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
              >
                <Marker coordinate={MAP_MARKER} />
              </MapView>
            </View>

            {/* Aside doctor card */}
            <View style={styles.asideCard}>
              <Image
                source={require('../../../assets/grpDoctor.jpeg')}
                style={styles.asideImage}
                resizeMode="cover"
              />
              <View style={styles.asideInfo}>
                <Text style={styles.asideName} numberOfLines={2}>Shahul Hameed Hameed</Text>
                <View style={styles.asideMeta}>
                  <Text style={styles.asideSpec}>Gyno</Text>
                  <View style={styles.ratingRow}>
                    <StarIcon size={10} />
                    <Text style={styles.ratingVal}>4.5</Text>
                  </View>
                </View>
                <Text style={styles.docPrice}>₹199.00</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PURPLE = '#6C4FD4';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topPill: {
    width: rs(120),
    height: vs(5),
    borderRadius: rs(3),
    backgroundColor: '#1a1a1a',
    alignSelf: 'center',
    marginTop: vs(8),
    marginBottom: vs(4),
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: vs(24),
  },

  // ── Header ─────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    paddingTop: vs(16),
    paddingBottom: vs(14),
    backgroundColor: '#fff',
  },

  backBtn: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(10),
    borderWidth: 1,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },

  headerTitle: {
    fontSize: rf(17),
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },

  // ── Search ─────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(10),
    paddingHorizontal: rs(16),
    paddingBottom: vs(18),
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    backgroundColor: '#f7f7f9',
    borderRadius: rs(28),          // pill shape
    paddingHorizontal: rs(16),
    paddingVertical: vs(11),
    borderWidth: 1,
    borderColor: '#efefef',
  },

  searchInput: {
    flex: 1,
    fontSize: rf(14),
    color: '#1a1a1a',
    padding: 0,
  },

  filterBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    backgroundColor: '#f7f7f9',
    borderWidth: 1,
    borderColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Section header ─────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    marginBottom: vs(12),
  },

  sectionTitle: {
    fontSize: rf(16),
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },

  sectionSub: {
    fontSize: rf(11),
    color: PURPLE,
    marginTop: vs(2),
    fontWeight: '500',
  },

  viewAll: {
    fontSize: rf(13),
    color: PURPLE,
    fontWeight: '700',
  },

  // ── Doctor cards ───────────────────────
  cardsScroll: {
    paddingHorizontal: rs(16),
    paddingBottom: vs(20),
    gap: rs(12),
  },

  docCard: {
    width: rs(115),
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 0.5,
    borderColor: '#ececec',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  docImage: {
    width: rs(115),
    height: vs(80),
  },

  docInfo: {
    padding: rs(9),
  },

  docName: {
    fontSize: rf(11),
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: vs(16),
    marginBottom: vs(2),
  },

  docSpec: {
    fontSize: rf(10),
    color: '#b0b0b0',
    marginBottom: vs(4),
  },

  docMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(4),
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    marginBottom: vs(4),
  },

  ratingVal: {
    fontSize: rf(10),
    fontWeight: '600',
    color: '#1a1a1a',
  },

  docPrice: {
    fontSize: rf(12),
    fontWeight: '800',
    color: PURPLE,
  },

  // ── Map section ────────────────────────
  mapSection: {
    paddingHorizontal: rs(16),
    marginTop: vs(2),
  },

  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(14),
  },

  viewMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
    backgroundColor: '#1a1a2e',
    borderRadius: rs(24),
    paddingHorizontal: rs(14),
    paddingVertical: vs(9),
  },

  viewMapText: {
    fontSize: rf(12),
    fontWeight: '600',
    color: '#fff',
  },

  mapRow: {
    flexDirection: 'row',
    gap: rs(12),
    alignItems: 'stretch',
  },

  mapThumb: {
    flex: 1,
    height: vs(160),
    borderRadius: rs(16),
    overflow: 'hidden',
    backgroundColor: '#dce8d4',
  },

  // ── Aside doctor card ──────────────────
  asideCard: {
    width: rs(115),
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 0.5,
    borderColor: '#ececec',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: 'flex-start',
  },

  asideImage: {
    width: '100%',
    height: vs(80),
  },

  asideInfo: {
    padding: rs(8),
  },

  asideMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(3),
  },

  asideName: {
    fontSize: rf(11),
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: vs(15),
    marginBottom: vs(2),
  },

  asideSpec: {
    fontSize: rf(10),
    color: '#b0b0b0',
    marginBottom: vs(3),
  },

  // ── Bottom indicator ───────────────────
  bottomBar: {
    alignItems: 'center',
    paddingVertical: vs(10),
    backgroundColor: '#fff',
  },

  bottomIndicator: {
    width: rs(120),
    height: vs(5),
    borderRadius: rs(3),
    backgroundColor: PURPLE,
  },
});