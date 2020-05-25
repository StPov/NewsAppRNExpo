import React, { Component } from "react";
import {
  AppRegistry,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Channel from "../components/Channel";
import { FlatList } from "react-native-gesture-handler";

export default class SourcesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  async componentDidMount() {
    return fetch(
      "https://newsapi.org/v2/sources?apiKey=8c66ce1dfb9245cf9fe9be0a484d713e"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let channels = this.state.dataSource.sources;
      return (
        <View>
          <FlatList
            data={channels}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={(itemData) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SourceDetails", {
                    source: itemData.item,
                  })
                }
              >
                <Channel
                  name={itemData.item.name}
                  description={itemData.item.description}
                  // image={`../../assets/images/channels_background/news${Math.floor(Math.random()*10)}.jpg`}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent("example", () => SourcesScreen);
