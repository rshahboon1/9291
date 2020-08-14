import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
// import { Button } from "native-base";
import History from "../History/History";
import { createStackNavigator } from "react-navigation-stack";
import Global from "../../../Globals";
import logo from "../../assets/logo.png";
import { Button, Icon } from "native-base";

class DrawerPannel extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: Global.colors.pr1,
          height: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: Global.colors.bg,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
          }}
        >
          <Image
            source={logo}
            style={{
              width: 100,
              height: 100,
              marginBottom: 25,
              borderRadius: 8,
            }}
          />
          <Text>كاش الأرقام 9291</Text>
        </View>
        <View
          style={{
            // backgroundColor: Global.colors.pr1,
            paddingTop: 30,
            // flex: 1,
          }}
        >
          <Button
            transparent
            style={{ justifyContent: "flex-end" }}
            onPress={(_) =>
              this.props.navigation.navigate("History", {
                theAd: this.props.theAd,
                // theAd: {},
              })
            }
          >
            <Text style={styles.listBtnTxt}>البحث السابق</Text>
            <Icon
              active
              name="history"
              type="MaterialCommunityIcons"
              style={{ color: "#fff" }}
            />
          </Button>
          <Button
            transparent
            style={{ justifyContent: "flex-end" }}
            onPress={(_) => this.props.navigation.navigate("History")}
          >
            <Text style={styles.listBtnTxt}>مشاركة التطبيق</Text>
            <Icon
              active
              name="share-variant"
              type="MaterialCommunityIcons"
              style={{ color: "#fff" }}
            />
          </Button>
          <Button
            transparent
            style={{ justifyContent: "flex-end" }}
            onPress={(_) => this.props.navigation.navigate("Privacy")}
          >
            <Text style={styles.listBtnTxt}>شروط الاستخدام</Text>
            <Icon
              active
              name="vpn"
              type="MaterialCommunityIcons"
              style={{ color: "#fff" }}
            />
          </Button>
          <Button
            transparent
            style={{ justifyContent: "flex-end" }}
            onPress={(_) => this.props.navigation.navigate("History")}
          >
            <Text style={styles.listBtnTxt}>فيسبوك</Text>
            <Icon
              active
              name="facebook"
              type="MaterialCommunityIcons"
              style={{ color: "#fff" }}
            />
          </Button>
          <Button
            transparent
            style={{ justifyContent: "flex-end" }}
            onPress={(_) => this.props.navigation.navigate("History")}
          >
            <Text style={styles.listBtnTxt}>انستقرام</Text>
            <Icon
              active
              name="instagram"
              type="MaterialCommunityIcons"
              style={{ color: "#fff" }}
            />
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listBtnTxt: { color: "#fff", fontSize: 18 },
});

export default DrawerPannel;
