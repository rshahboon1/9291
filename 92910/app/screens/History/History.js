import React, { Component } from "react";
import { Text, View } from "react-native";

export default class History extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  render() {
    return (
      <View>
        <Text> history </Text>
      </View>
    );
  }
}
