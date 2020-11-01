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
import Storage from "../../classes/Storage/Storage";
import MyAds from "../../components/MyAds/MyAds";
import { ScrollView } from "react-native-gesture-handler";
export default class History extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  state = {
    history: [],
  };
  async UNSAFE_componentWillMount() {
    // this.nameInput.focus();

    const lS = new Storage("history");
    const history = await lS.getFromHistory();
    // this.state.history = data;
    this.setState({ history });
    // console.log(history);
    // alert(123);
  }
  clearHistory = () => {
    const lS = new Storage("history");
    lS.clearHistory();
    this.setState({ history: [] });
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

        <ScrollView
          padder
          style={{ flex: 1, paddingHorizontal: 8, marginVertical: 8 }}
        >
          {/* <Title>البحث السابق</Title> */}
          <MyAds
            theAd={
              this.props.navigation.state.params?.theAd
                ? this.props.navigation.state.params?.theAd
                : false
            }
          />

          {this.state.history.map(({ name, phone }, key) => {
            // console.log(name);

            return <ResultCard key={key} name={name} phone={phone} />;
          })}
          {this.state.history.length > 0 && (
            <Button
              block
              danger
              style={{ marginVertical: 4 }}
              // transparent
              onPress={(_) => this.clearHistory()}
            >
              <Icon name="trash" />
            </Button>
          )}
        </ScrollView>
      </Container>
    );
  }
}
