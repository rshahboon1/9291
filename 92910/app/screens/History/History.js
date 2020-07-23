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
  Content,
} from "native-base";
import Globals from "../../../Globals";
import ResultCard from "../../components/ResultCard/ResultCard";
export default class History extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };

  render() {
    return (
      <Container style={{ backgroundColor: Globals.colors.bg }}>
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
            <Title>البحث السابق</Title>
          </Body>
          <Right style={{ flex: 1 }}></Right>
        </Header>
        <Content padder>
          <ResultCard name="رضوان" phone="0926548523" repeat="12" />
          <ResultCard name="رضوان" phone="0926548523" repeat="12" />
          <ResultCard name="رضوان" phone="0926548523" repeat="12" />
        </Content>
      </Container>
    );
  }
}
