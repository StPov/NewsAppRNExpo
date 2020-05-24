import React from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import { Text, Card, Divider } from "react-native-elements";
import moment from "moment";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedArticles: []
    };
  }
  saveArticle = async (newsItem) => {
    try {
      this.setState({savedArticles: [...this.state.savedArticles, newsItem]})
      // this.setState({savedArticles: this.state.savedArticles.push(newsItem)})
      await AsyncStorage.setItem(
        'array',
        JSON.stringify(this.state.savedArticles)
      );
      console.log("Success")
      // console.log(newsItem)
    } catch (error) {
      console.log("Failure")
      console.log(error)
    }
  };

  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url,
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";

    return (
      <TouchableOpacity
        useForeground
        onPress={() => Linking.openURL(url)}
        onLongPress={() => {
          Alert.alert(
            "Сохранить новость?",
            "",
            [
              {
                text: "Сохранить",
                onPress: () => {
                    this.saveArticle(this.props.article)
                },
              },
              {
                text: "Отмена",
                // onPress: () => console.log("Нажата отмена"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: urlToImage || defaultImg,
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            {description || "Read More.."}
          </Text>
          <Divider style={{ backgroundColor: "#dfe6e9" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: "italic",
    color: "#b2bec3",
    fontSize: 10,
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: "#00000f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
};
