import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Item,
  Input,
} from "native-base";
import Globals from "../../../Globals";
import { WebView } from "react-native-webview";

export default class Privacy extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  constructor(props) {
    super(props);
    console.log();
  }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Globals.colors.pr2 }}>
          <Left>
            <Button
              style={{ width: 50 }}
              transparent
              onPress={(_) => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body
            style={{
              // backgroundColor: "red",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Title>شروط الاستخدام</Title>
          </Body>
          <Right style={{ flex: 1 }}></Right>
        </Header>
        <WebView source={{ uri: "https://reactnative.dev/" }} />
      </Container>
    );
  }
}
