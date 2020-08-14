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
import Search from "../../classes/Search/Search";
import MyAds from "../../components/MyAds/MyAds";
import Globals from "../../../Globals";

import {
  AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from "react-native-admob";
const Debuging = Globals.app.debuging;
export default class Results extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  constructor(props) {
    super(props);
    const {
      data: {
        data: { result: results, rest },
        type,
      },
      phone,
      deviceId,
      encryptedId,
      noAds,
    } = this.props.navigation.state.params;

    this.state = {
      viewSilver: false,
      results,
      phone,
      deviceId,
      encryptedId,
      rest,
      type,
      noAds,
    };

    // console.log(this.props.navigation.state.params);
    if (!noAds) {
      let adunit = Debuging
        ? "ca-app-pub-3940256099942544/1033173712"
        : "ca-app-pub-3698961787387868/1589051366";
      // alert(adunit);

      AdMobInterstitial.setAdUnitID(adunit);
    }
  }
  async findMore() {
    // console.log("find more ", this.state);

    // return;

    const search = new Search({
      phoneNumber: this.state.phone,
      deviceId: this.state.deviceId,
      encryptedId: this.state.encryptedId,
    });
    const res = await search.searchForPhone("phonemorefind");
    if (res.state == 200) {
      // console.log(results);
      // return;
      const {
        data: { result: results },
      } = res;
      // console.log(results);
      this.setState({ results, rest: 0 });
    } else {
      //TODO handle other sercomstancess
    }
  }
  UNSAFE_componentWillMount() {
    // const {data: } = this.state.results;
    // console.warn(this.state.type);
  }
  handleSilver() {
    // console.log(this.state);
    if (this.state.type == "") {
      this.setState({ viewSilver: true });
    } else {
      // console.log(this.state.findMore, "000000000000000000000000000");
      this.findMore();
    }
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
          {!this.state.noAds && <MyAds theAd={false} />}
          {this.state.results.map(({ name, number }, i) => (
            <ResultCard
              key={i}
              name={name}
              phone={this.state.phone}
              repeat={number}
            />
          ))}

          {this.state.rest != "0" && (
            <View style={{ zIndex: 1 }}>
              <Button
                onPress={(_) => this.handleSilver()}
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
                  عرض جميع الاسماء
                </Text>
              </Button>
            </View>
          )}
        </View>

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
              deviceId={this.state.deviceId}
              encryptedId={this.state.encryptedId}
            />
          </View>
        )}
      </Container>
    );
  }
}
