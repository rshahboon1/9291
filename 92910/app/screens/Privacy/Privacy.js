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
    // console.log(props.navigation?.state?.params);
    const { type, landing } = props.navigation?.state?.params;
    this.state = {
      type,
      landing,
    };
    // console.log(type);
    // this.setState({ type });
  }

  goBack() {
    console.log("clicked", this.state.type);
    // return;
    if (this.state.landing) {
      // console.log("t");

      this.props.navigation.navigate("Landing");
    } else {
      // console.log("f");

      this.props.navigation.goBack();
    }
  }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Globals.colors.pr2 }}>
          <Left>
            <Button
              style={{ width: 50 }}
              transparent
              onPress={(_) => this.goBack()}
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
        {/* <View style={{ padding: 9 }}> */}
        <WebView
          source={{ uri: `https://www.phonelibya.com/${this.state.type}/` }}
        />
        {/* </View> */}
      </Container>
    );
  }
}
