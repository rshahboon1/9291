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
  Input,
} from "native-base";
import { createStackNavigator } from "react-navigation-stack";
import Drawer from "react-native-drawer";
import Contacts from "../../classes/Contacts/Contacts";
import Globals from "../../../Globals";
import Results from "../Results/Results";
import Vip from "../Vip/Vip";
import DrawerPannel from "../DrawerPannel/DrawerPannel";
import History from "../History/History";
import Privacy from "../Privacy/Privacy";
import Search from "../../classes/Search/Search";
import Validation from "../../classes/validation/index";
class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  constructor(props) {
    super(props);
    const search = new Search({ phoneNumber: "0926548523" });
    this.state.search = search;
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  state = {
    nameSearch: false,
  };
  search = async () => {
    !this.state.nameSearch ? this.searchByNumber() : this.searchByName();
  };
  searchByName() {
    console.log("serach by name");
  }
  searchByNumber() {
    console.log("serach by Number");
  }
  async UNSAFE_componentWillMount() {
    let c = new Contacts();
    // c.getLastTimeContactUpload();
    // alert();
    // c.uploadContacts();//TODO  add later in case production
    this.state.search.searchForPhone();
    // console.log("+++++++++++++++++++++++++");
    // console.log(this.state.search, "the search test class");
  }
  async handleChange(phonenumberOrName) {
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
        content={<DrawerPannel navigation={this.props.navigation} />}
        tapToClose={true}
        openDrawerOffset={0.3} // 30% gap on the right side of drawer
        panCloseMask={0.3}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        // tweenHandler={(ratio) => ({
        //   main: { opacity: (2 - ratio) / 2 },
        // })}
      >
        <Container>
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
              onPress={() => this.setState({ nameSearch: true })}
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
              onPress={() => this.setState({ nameSearch: false })}
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
                    this.state.nameSearch ? "مثال : محمد علي " : "0926543210"
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
                    this.state.nameSearch ? "مثال : محمد علي" : "0926543210"
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
const homeStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  Results: {
    screen: Results,
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
