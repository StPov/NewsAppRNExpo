import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';

export default class Channel extends Component {
    render() {
        let focusText;
        let opacity;
        if (this.props.isFocused) {
            focusText = (<Text style={{color: "#ff0"}}>Focused!</Text>);
            opacity = {opacity: 1};

        } else {
            focusText = (<Text style={{color: "#fff"}}>Not Focused!</Text>);
            opacity = {opacity: 0.4};
        }

        return (
            <View style={[styles.square, styles.wrapper]} onLayout={this.props.onLayout}>
                <Image style={[styles.square, opacity, {position: "absolute"}]} source={require('../../../assets/channel_background/news6.jpg')} />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
            </View>
        )
    }
}

const dim = Dimensions.get("screen");
const styles = StyleSheet.create({
    square: {
        width: dim.width,
        height: dim.width / 2,
    },
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    textWrapper: {
        position: "absolute",
        padding: 20,
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        alignContent: "center",
        alignSelf: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: 8
    },
    description: {
        color: "#fffaf0",
        fontSize: 16,
        fontWeight: "bold",
        alignContent: "center",
        alignSelf: "center",
        textShadowColor: '#000000',
        shadowRadius: 10,
        textShadowOffset: {
            width: 0, height: 2
        }
    }
});
