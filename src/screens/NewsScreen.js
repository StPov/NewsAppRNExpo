import React from "react";
import { FlatList, TextInput, View, StyleSheet } from "react-native";
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

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData = () => {
    const key = "8c66ce1dfb9245cf9fe9be0a484d713e";
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({ fetching_from_server: true, isListEnd: false }, () => {
        let url = `https://newsapi.org/v2/everything?apiKey=${key}&page=${this.state.page}&q=Sevastopol`;
        console.log(url);

        fetch(url).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data);
              if (data.articles.length > 0) {
                this.setState({
                  articles: [...this.state.articles, ...data.articles],
                  fetching_from_server: false,
                  refreshing: false,
                  page: this.state.page + 1,
                });
              } else {
                this.setState({
                  fetching_from_server: false,
                  isListEnd: true,
                });
              }
            });
          }
        });
      });
    }
  };

  handleRefresh() {
    this.setState({ articles: [], refreshing: true }, () =>
      this.loadMoreData()
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
});
