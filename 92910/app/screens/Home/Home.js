import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
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
export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Globals.colors.pr2 }}>
          <Left>
            {/* <Button transparent>
              <Icon name="arrow-back" />
            </Button> */}
          </Left>
          <Body
            style={{
              // backgroundColor: "red",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Title>بحث</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={{ flexDirection: "row" }}>
          <Button
            transparent
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 3,
              borderRadius: 0,
              borderBottomColor: Globals.colors.green2,
            }}
          >
            <Text
              style={{
                color: Globals.colors.font1,
                fontSize: 18,
              }}
            >
              البحث بالاسم
            </Text>
          </Button>
          <Button
            transparent
            style={{ flex: 1, justifyContent: "center", borderRadius: 0 }}
          >
            <Text style={{ color: Globals.colors.font1, fontSize: 18 }}>
              البحث بالرقم
            </Text>
          </Button>
        </View>

        <Header
          searchBar
          style={{
            paddingVertical: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: Globals.colors.pr2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Item
            style={{
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: Globals.colors.green2,
                height: 88,

                paddingVertical: 3,
                // paddingHorizontal: 8,
              }}
            >
              <Icon
                name="ios-search"
                style={{
                  color: "#fff",
                }}
              />
            </Button>
            <Input placeholder="ادخل رقم الهاتف" />
            {/* <Icon name="ios-people" /> */}
          </Item>
        </Header>
      </Container>
    );
  }
}
