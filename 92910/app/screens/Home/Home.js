import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
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
  Spinner,
  Input,
} from "native-base";
import History from "../History/History";
import Privacy from "../Privacy/Privacy";
import Vip from "../Vip/Vip";
import { connect } from "react-redux";

import Results from "../Results/Results";
import ResultsName from "../ResultsName/ResultsName";
import { createStackNavigator } from "react-navigation-stack";
import Drawer from "react-native-drawer";
import Contacts from "../../classes/Contacts/Contacts";
import Globals from "../../../Globals";

import DrawerPannel from "../DrawerPannel/DrawerPannel";

import Search from "../../classes/Search/Search";
import Validation from "../../classes/validation/index";
import DeviceInfo from "react-native-device-info";
import Encryption from "../../classes/Encryption/Encryption";
import MyAds from "../../components/MyAds/MyAds";
import Plan from "../../components/Plan/Plan";
import { HomeAd } from "../../components/Ads/Ads";

class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: "#333",
      display: "none",
    },
  };
  constructor(props) {
    super(props);
    const { theAd = {}, noAds = false } = this.props.appData;
    this.state = {
      nameSearch: false,
      phonenumberOrName: "",
      viewGold: false,
      theAd,
      noAds,
      isSearching: false,
    };
    // alert(theAd);
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  search = async () => {
    if (this.state.isSearching) return;
    !this.state.nameSearch ? this.searchByNumber() : this.searchByName();
  };
  async searchByName() {
    if (this.state.phonenumberOrName == "") return;
    this.setState({ isSearching: true });
    const search = new Search({
      name: this.state.phonenumberOrName,
      deviceId: this.state.deviceId,
      encryptedId: this.state.encryptedId,
    });
    const names = await search.searchForName();
    if (names.state == 200) {
      this.setState({ isSearching: false });

      // console.log(names);
      // return;
      this.props.navigation.navigate("ResultsName", {
        data: names,
        name: this.state.phonenumberOrName,
        deviceId: this.state.deviceId,
        encryptedId: this.state.encryptedId,
      });
    } else {
      this.setState({ isSearching: false });

      if (names.state == 403) {
        this.setState({ viewGold: true });
        //TODO handle other sercomstancess
      } else {
        alert("نأسف لم نتمكن من العثور علي نتائج");
      }
    }
  }
  async getDeviceId() {
    const deviceId = await DeviceInfo.getUniqueId();
    // alert(deviceId);
    const encryptedId = await new Encryption().encrypt(deviceId);
    // alert(encryptedId);
    this.setState({ deviceId, encryptedId });
  }

  async searchByNumber(more = "phonefind") {
    // console.log(Validation.rightPhoneNumber(this.state.phonenumberOrName));
    // return;
    if (!Validation.rightPhoneNumber(this.state.phonenumberOrName)) {
      alert("ارجوا التأكد من الرقم");
      return;
    }
    this.setState({ isSearching: true });

    const search = new Search({
      phoneNumber: this.state.phonenumberOrName,
      deviceId: this.state.deviceId,
      encryptedId: this.state.encryptedId,
    });
    const Results = await search.searchForPhone(more);
    if (Results.state == 200) {
      this.setState({ isSearching: false });

      this.props.navigation.navigate("Results", {
        data: Results,
        phone: this.state.phonenumberOrName,
        deviceId: this.state.deviceId,
        encryptedId: this.state.encryptedId,
        noAds: this.state.noAds,
      });
    } else {
      this.setState({ isSearching: false });

      //TODO handle other sercomstancess
      alert("نأسف لم نتمكن من العثور علي نتائج");
    }
  }
  async UNSAFE_componentWillMount() {
    // console.warn(
    //   this.props.appData,
    //   "==============================================="
    // );
    await this.getDeviceId();
    let c = new Contacts({
      deviceId: this.state.deviceId,
      encryptedId: this.state.encryptedId,
    });
    // c.getLastTimeContactUpload();
    // alert();
    c.uploadContacts(); //TODO  add later in case production
    // this.state.search.searchForPhone();
    // console.log("+++++++++++++++++++++++++");
    // console.log(this.state.search, "the search test class");
  }
  async handleChange(phonenumberOrName) {
    if (this.state.isSearching) this.setState({ isSearching: false });

    if (!this.state.nameSearch) {
      if (phonenumberOrName.length != 11) this.setState({ phonenumberOrName });
      if (Validation.rightPhoneNumber(phonenumberOrName)) {
        this.setState({ visibleSearchAlert: true });
      }
    } else {
      this.setState({ phonenumberOrName });
    }
  }
  render() {
    return (
      <Drawer
        side="right"
        ref={(ref) => (this._drawer = ref)}
        type="static"
        content={
          <DrawerPannel
            theAd={this.state.theAd}
            navigation={this.props.navigation}
          />
        }
        tapToClose={true}
        openDrawerOffset={0.3} // 30% gap on the right side of drawer
        panCloseMask={0.3}
        closedDrawerOffset={-3}
        styles={drawerStyles}

        // tweenHandler={(ratio) => ({
        //   main: { opacity: (2 - ratio) / 2 },
        // })}
      >
        <Container
          style={
            {
              // backgroundColor: "blue",
              // flexDirection: "column-reverse"
            }
          }
        >
          <Header style={{ backgroundColor: Globals.colors.pr2 }}>
            <Right></Right>
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
              <Button transparent onPress={(_) => this.openControlPanel()}>
                <Icon name="menu" />
              </Button>
            </Right>
          </Header>
          <View style={{ flexDirection: "row" }}>
            <Button
              transparent
              onPress={() =>
                this.setState({ nameSearch: true, phonenumberOrName: "" })
              }
              style={{
                flex: 1,
                justifyContent: "center",
                borderBottomWidth: 3,
                borderRadius: 0,
                borderBottomColor: this.state.nameSearch
                  ? Globals.colors.green2
                  : "#fff",
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
              onPress={() =>
                this.setState({ nameSearch: false, phonenumberOrName: "" })
              }
              style={{
                flex: 1,
                justifyContent: "center",
                borderRadius: 0,
                borderBottomWidth: 3,
                borderBottomColor:
                  this.state.nameSearch == false ? Globals.colors.pr1 : "#fff",
              }}
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
              backgroundColor: this.state.nameSearch
                ? Globals.colors.green2
                : Globals.colors.pr2,

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
                  backgroundColor:
                    this.state.nameSearch == false
                      ? Globals.colors.green2
                      : Globals.colors.pr2,
                  height: 88,

                  paddingVertical: 3,
                  // paddingHorizontal: 8,
                }}
                onPress={() => this.search()}
              >
                <Icon
                  name="ios-search"
                  style={{
                    color: "#fff",
                  }}
                />
              </Button>
              {/* <Input placeholder="ادخل رقم الهاتف" /> */}
              {!this.state.nameSearch && (
                <Input
                  // onChangeText={(phonenumberOrName) => this.setState({phonenumberOrName})}
                  onChangeText={(Text) => {
                    this.handleChange(Text);
                  }}
                  value={this.state.phonenumberOrName}
                  keyboardType={"numeric"}
                  placeholder={
                    this.state.nameSearch ? "مثال : احمد صبحي " : "0926543210"
                  }
                  multiline={true}
                  returnKeyType="search"
                  // returnKeyLabel='ارسال'
                  // onKeyPress={_ => alert()}
                  onSubmitEditing={(_) => this._search()}
                  // keyboardType={'web-search'}
                />
              )}
              {this.state.nameSearch && (
                <Input
                  // onChangeText={(phonenumberOrName) => this.setState({phonenumberOrName})}
                  onChangeText={(Text) => {
                    this.handleChange(Text);
                  }}
                  multiline={true}
                  value={this.state.phonenumberOrName}
                  keyboardType={"default"}
                  placeholder={
                    this.state.nameSearch ? "مثال : احمد صبحي" : "0926543210"
                  }
                  returnKeyType="search"
                  // returnKeyLabel='ارسال'
                  // onKeyPress={_ => alert()}
                  onSubmitEditing={(_) => this._search()}
                  // keyboardType={'web-search'}
                />
              )}
              {/* <Icon name="ios-people" /> */}
            </Item>
          </Header>
          {this.state.isSearching && <Spinner color="red" />}
          {this.state.viewGold && (
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
                close={(_) => this.setState({ viewGold: false })}
                navigation={this.props.navigation}
                type="gold"
                deviceId={this.state.deviceId}
                encryptedId={this.state.encryptedId}
              />
            </View>
          )}

          {!this.state.noAds && (
            <View
              style={{
                paddingBottom: 8,
                flexDirection: "column",
                flex: 1,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <HomeAd />

              <MyAds theAd={this.state.theAd} />
            </View>
          )}
        </Container>
      </Drawer>
    );
  }
}
const drawerStyles = StyleSheet.create({
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // overflow: "hidden",
    // flex: 1,
    // width: "100%",
  },
  main: { paddingLeft: 3 },
});

const mapStateToProps = (state) => ({
  appData: state.appReducer.app.appData,
});

const mapDispatchToProps = (dispatch) => ({});

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
const homeStack = createStackNavigator({
  Home: {
    screen: connectedHome,
  },

  Results: {
    screen: Results,
  },
  ResultsName: {
    screen: ResultsName,
  },
  Vip: {
    screen: Vip,
  },
  History: {
    screen: History,
  },
  Privacy: {
    screen: Privacy,
  },
});
export default homeStack;
