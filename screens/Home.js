import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';
import hotels from '../consts/hotels';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Home = ({ navigation }) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured',];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const CategoryList = ({ navigation }) => {
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({ hotel, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...styles.cardOverLay, opacity }} />
          <View style={styles.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
              ${hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  {hotel.name}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {hotel.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.white }}>
            Find Your Hotel With
          </Text>

          <Text style={{ fontSize: 30, fontWeight: 'bold' }}></Text>
          <Text
            style={styles.nameH}>
            EasyBooking
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 }}
          />
        </View>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}
            horizontal
            data={hotels}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Card hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  nameH: {
    marginTop: -20,
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 0,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },

});

export default Home;
