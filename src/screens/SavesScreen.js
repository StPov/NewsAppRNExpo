import React from "react";
import { FlatList, TextInput, View, StyleSheet } from "react-native";
import Article from "../services/models/Article";

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

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData = (querry = "Sevastopol") => {
    const key = "8c66ce1dfb9245cf9fe9be0a484d713e";
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({ fetching_from_server: true, isListEnd: false }, () => {
        fetch(
          `https://newsapi.org/v2/everything?apiKey=${key}&page=${this.state.page}&q=${querry}`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.articles.length > 0) {
              this.page = this.page + 1;
              this.setState({
                articles: [...this.state.articles, ...responseJson.articles],
                fetching_from_server: false,
                refreshing: false,
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };

  handleRefresh() {
    this.setState({ articles: [], refreshing: true }, () =>
      this.loadMoreData()
    );
  }

  searchData(text) {
    this.setState({ articles: [], refreshing: true, text: text }, () =>
      setTimeout(() => {
        this.loadMoreData(text);
      }, 500)
    );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.searchData(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={(item) => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
          onEndReached={this.loadMoreData}
          onEndReachedThreshold={0.5}
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

  textInput: {
    textAlign: "left",
    paddingLeft: 18,
    height: 42,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "#FFFF",
  },
});
