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
  Spinner,
} from "native-base";
import Global from "../../../Globals";
import ResultCard from "../../components/ResultCard/ResultCard";
import { TouchableHighlight } from "react-native-gesture-handler";
import Plan from "../../components/Plan/Plan";
import Search from "../../classes/Search/Search";

export default class ResultsName extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  constructor(props) {
    super(props);
    const {
      data: { data, from, next },
      name,
      deviceId,
      encryptedId,
    } = this.props.navigation.state.params;
    console.log(
      this.props.navigation.state.params.data,
      "=================================="
    );
    this.state = {
      viewSilver: false,
      data,
      name,
      deviceId,
      encryptedId,
      from,
      next,
      isSearching: false,
    };
    // console.log(this.props.navigation.state.params);
  }
  async findMore() {
    if (this.state.isSearching) return;
    this.setState({ isSearching: true });
    const search = new Search({
      name: this.state.name,
      deviceId: this.state.deviceId,
      encryptedId: this.state.encryptedId,
    });
    // console.log(this.state);
    const names = await search.searchForName(this.state.from);
    // console.log(names);
    // return;
    if (names.state == 200) {
      this.setState({ isSearching: false });

      const { data, next, from } = names;
      console.log(next, from, "test  some test");
      this.setState({ data, next, from });
    } else {
      this.setState({ isSearching: false });

      // alert();
      //TODO handle other sercomstancess
    }
  }
  UNSAFE_componentWillMount() {
    // const {data: } = this.state.results;
    // console.warn(this.state.type);
  }

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
          {this.state.data.map(({ name, number }, i) => (
            <ResultCard key={i} name={name} phone={number} repeat={false} />
          ))}

          {this.state.next == true && (
            <View style={{ zIndex: 1 }}>
              <Button
                onPress={(_) => this.findMore()}
                style={{
                  backgroundColor: Global.colors.green2,
                  justifyContent: "center",
                  alignItems: "center",
                  // paddingVertical: 12,
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  عرض المجموعة التالية
                </Text>
              </Button>
            </View>
          )}
        </View>
        {this.state.isSearching && <Spinner color="red" />}
        {this.state.viewSilver && (
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
            <Plan
              close={(_) => this.setState({ viewSilver: false })}
              navigation={this.props.navigation}
              type="silver"
            />
          </View>
        )}
      </Container>
    );
  }
}
