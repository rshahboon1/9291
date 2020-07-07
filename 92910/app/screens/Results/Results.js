import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon,
} from "native-base";
import Global from "../../../Globals";
import ResultCard from "../../components/ResultCard/ResultCard";
import { TouchableHighlight } from "react-native-gesture-handler";
import Plan from "../../components/Plan/Plan";

export default class Results extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  render() {
    return (
      <Container style={{ backgroundColor: Global.colors.bg }}>
        <Header style={{ backgroundColor: Global.colors.pr2 }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={(_) => this.props.navigation.goBack()}>
              <Icon name="arrow-left" type="MaterialCommunityIcons" />
            </Button>
          </Left>
          <Body
            style={{
              // backgroundColor: "red",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Title>نتائج البحث</Title>
          </Body>
          <Right></Right>
        </Header>
        <View style={{ paddingTop: 10 }}>
          <ResultCard name="radwan shah" phone="092654823" repeat="3" />
          <ResultCard name="radwan shah" phone="092654823" repeat="3" />

          <ResultCard name="radwan shah" phone="092654823" repeat="3" />
          <ResultCard name="radwan shah" phone="092654823" repeat="3" />
          <ResultCard name="radwan shah" phone="092654823" repeat="3" />

          <View style={{ zIndex: 1 }}>
            <Button
              style={{
                backgroundColor: Global.colors.green2,
                justifyContent: "center",
                alignItems: "center",
                // paddingVertical: 12,
                zIndex: 1,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                عرض جميع الاسماء
              </Text>
            </Button>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 999,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plan navigation={this.props.navigation} type="silver" />
        </View>
      </Container>
    );
  }
}
