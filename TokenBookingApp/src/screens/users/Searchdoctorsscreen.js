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
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';
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

const FilterIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M4 6h16M7 12h10M10 18h4" stroke="#555" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const MapIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4M9 7l6-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f5a623" />
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
      <Text style={styles.docSpec}>{item.spec}</Text>
      <View style={styles.ratingRow}>
        <StarIcon />
        <Text style={styles.ratingVal}>{item.rating}</Text>
      </View>
      <Text style={styles.docPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

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
              placeholderTextColor="#bbb"
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
            <Text style={styles.sectionSub}>25 Doctors available</Text>
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
              <Text style={styles.sectionSub}>2.5km</Text>
            </View>
            <TouchableOpacity style={styles.viewMapBtn}>
              <MapIcon />
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
                <Text style={styles.asideSpec}>Gyno</Text>
                <View style={styles.ratingRow}>
                  <StarIcon />
                  <Text style={styles.ratingVal}>4.5</Text>
                </View>
                <Text style={styles.docPrice}>₹199.00</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom indicator */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PURPLE = '#7B5EA7';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: vs(20),
  },

  // ── Header ─────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    paddingVertical: vs(14),
    backgroundColor: '#fff',
  },

  backBtn: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(10),
    borderWidth: 0.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // ── Search ─────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(10),
    paddingHorizontal: rs(16),
    paddingBottom: vs(14),
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    backgroundColor: '#f5f5f7',
    borderRadius: rs(14),
    paddingHorizontal: rs(14),
    paddingVertical: vs(10),
    borderWidth: 0.5,
    borderColor: '#eaeaea',
  },

  searchInput: {
    flex: 1,
    fontSize: rf(13),
    color: '#1a1a1a',
    padding: 0,
  },

  filterBtn: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(10),
    backgroundColor: '#f5f5f7',
    borderWidth: 0.5,
    borderColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Section header ─────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    marginBottom: vs(10),
  },

  sectionTitle: {
    fontSize: rf(15),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  sectionSub: {
    fontSize: rf(11),
    color: PURPLE,
    marginTop: vs(2),
  },

  viewAll: {
    fontSize: rf(12),
    color: PURPLE,
    fontWeight: '600',
  },

  // ── Doctor cards ───────────────────────
  cardsScroll: {
    paddingHorizontal: rs(16),
    paddingBottom: vs(16),
    gap: rs(10),
  },

  docCard: {
    width: rs(110),
    backgroundColor: '#fff',
    borderRadius: rs(14),
    borderWidth: 0.5,
    borderColor: '#eee',
    overflow: 'hidden',
    elevation: 2,
  },

  docImage: {
    width: rs(110),
    height: vs(90),
  },

  docInfo: {
    padding: rs(8),
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
    color: '#aaa',
    marginBottom: vs(4),
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    marginBottom: vs(3),
  },

  ratingVal: {
    fontSize: rf(10),
    fontWeight: '600',
    color: '#1a1a1a',
  },

  docPrice: {
    fontSize: rf(12),
    fontWeight: '700',
    color: PURPLE,
  },

  // ── Map section ────────────────────────
  mapSection: {
    paddingHorizontal: rs(16),
    marginTop: vs(4),
  },

  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(12),
  },

  viewMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
    backgroundColor: PURPLE,
    borderRadius: rs(20),
    paddingHorizontal: rs(14),
    paddingVertical: vs(8),
  },

  viewMapText: {
    fontSize: rf(12),
    fontWeight: '600',
    color: '#fff',
  },

  mapRow: {
    flexDirection: 'row',
    gap: rs(10),
  },

  mapThumb: {
    flex: 1,
    height: vs(130),
    borderRadius: rs(14),
    overflow: 'hidden',
    backgroundColor: '#e8ead8',
  },

  // ── Aside doctor card ──────────────────
  asideCard: {
    width: rs(110),
    backgroundColor: '#fff',
    borderRadius: rs(14),
    borderWidth: 0.5,
    borderColor: '#eee',
    overflow: 'hidden',
    elevation: 2,
  },

  asideImage: {
    width: '100%',
    height: vs(70),
  },

  asideInfo: {
    padding: rs(7),
  },

  asideName: {
    fontSize: rf(10),
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: vs(14),
    marginBottom: vs(2),
  },

  asideSpec: {
    fontSize: rf(9),
    color: '#aaa',
    marginBottom: vs(3),
  },

  // ── Bottom indicator ───────────────────
  bottomBar: {
    alignItems: 'center',
    paddingVertical: vs(10),
    backgroundColor: '#fff',
  },

  bottomIndicator: {
    width: rs(100),
    height: vs(4),
    borderRadius: rs(2),
    backgroundColor: PURPLE,
  },
});