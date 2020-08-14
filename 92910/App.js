import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Root } from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./app/screens/Home/Home";
import LandingScreen from "./app/screens/Landing/Landing";
import { Provider } from "react-redux";
import Store from "./app/Redux/Store/Store";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
      return (
        <Root>
          <Provider store={Store}>
            <AppContainer />
          </Provider>
        </Root>
      );
    }
  }
}
const AppSwitchNavigator = createSwitchNavigator({
  Landing: { screen: LandingScreen },
  Home: { screen: HomeScreen },
});
const AppContainer = createAppContainer(AppSwitchNavigator);
