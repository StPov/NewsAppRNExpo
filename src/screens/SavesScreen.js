import React from "react";
import { FlatList, View, StyleSheet, AsyncStorage } from "react-native";
import Article from "../components/Article";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      text: "",
      refreshing: true,
      loading: false,
      isListEnd: false,
      fetching_from_server: false,
      page: 1,
    };
  }

  retrieveArticle = async () => {
    try {
      const value = await AsyncStorage.getItem("array");
      if (value !== null) {
        let parsedObj = JSON.parse(value);
        this.setState({ articles: parsedObj.reverse() });
      }
    } catch (error) {
      // Error retrieving data
      console.log("Retrieving error");
    }
    this.setState({ refreshing: false });
  };

  componentDidMount() {
    this.retrieveArticle();
  }

  handleRefresh() {
    this.setState({ articles: [], refreshing: true }, () =>
      this.retrieveArticle()
    );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={(item) => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 5,
  },
});
