import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ route }) => {
  const carouselRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const { source } = route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const defaultImg =
    "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";

  const loadHeadlines = () => {
    const key = "8c66ce1dfb9245cf9fe9be0a484d713e";
    if (!fetchingFromServer && !isListEnd) {
      setFetchingFromServer(true);
      setIsListEnd(false);
      let url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&page=1&sources=${source.id}`;
      console.log(url);
      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.articles.length > 0) {
              setArticles([...articles, ...data.articles]);
              setFetchingFromServer(false);
            } else {
              setFetchingFromServer(false);
              setIsListEnd(true);
            }
          });
        }
      });
    }
  };

  const loadEverything = () => {
    const key = "8c66ce1dfb9245cf9fe9be0a484d713e";
    if (!fetchingFromServer && !isListEnd) {
      setFetchingFromServer(true);
      setIsListEnd(false);
      let url = `https://newsapi.org/v2/everything?apiKey=${key}&page=1&sources=${source.id}`;
      console.log(url);
      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.articles.length > 0) {
              setArticles([...articles, ...data.articles]);
              setFetchingFromServer(false);
            } else {
              setFetchingFromServer(false);
              setIsListEnd(true);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    loadHeadlines();
  }, []);

  const handleSingleIndexSelect = (index) => {
    setArticles([]);
    setSelectedIndex(index);
    setIsListEnd(false);
    switch (index) {
      case 0:
        loadHeadlines();
        console.log(index);
        break;
      case 1:
        loadEverything();
        console.log(index);
        break;
    }
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity useForeground onPress={() => Linking.openURL(item.url)}>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.urlToImage || defaultImg }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <View style={styles.viewTextStyle}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={7}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/blur_image.jpeg")}
      style={styles.container}
    >
      <View>
        <View style={styles.headline}>
          <View>
            <Text style={styles.cdg}>{source.name}</Text>
          </View>
          <View style={styles.segmentedControl}>
            <SegmentedControlTab
              values={["Headlines", "Everything"]}
              selectedIndex={selectedIndex}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              onTabPress={handleSingleIndexSelect}
              tabTextStyle={{ color: "#000" }}
            />
          </View>
        </View>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={articles}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
        <View style={styles.headline}>
          <Text style={styles.cdg}>TEST APP FOR CDG</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headline: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    width: "100%",
    minHeight: 60,
  },
  segmentedControl: {
    padding: 10,
    width: "50%",
    paddingTop: 20,
    // backgroundColor: 'black'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  viewTextStyle: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    shadowColor: "black",
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    marginBottom: 16,
  },
  description: {
    fontWeight: "normal",
    fontSize: 18,
    color: "white",
    shadowColor: "black",
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
  },
  cdg: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    shadowColor: "black",
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    margin: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  tabStyle: {
    borderColor: "#000",
  },
  activeTabStyle: {
    backgroundColor: "gray",
  },
});
