import React, { Component } from "react";
import { Text, View, Image, Alert } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import logo from "../../assets/logo.png";
import Global from "../../../Globals";
import Loading from "../../classes/Loading/Loading";
import { connect } from "react-redux";

import Storage from "../../classes/Storage/Storage";
import { Button } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
class Landing extends Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#333',
      display: "none",
    },
  };
  state = {
    progressWithOnComplete: 10,
    barWidth: 300,
  };
  constructor(props) {
    super(props);
    const ldg = new Loading();
    this.state.loading = ldg;
  }
  agreeToTerms = () => {
    const storage = new Storage("userData");
    storage.setUserData({ firstTimeUse: false });
    this.setState({
      progressWithOnComplete: this.state.progressWithOnComplete + 10,
    });
  };

  async UNSAFE_componentWillMount() {
    // console.warn(this.props.state);
    // return;
    await this.state.loading.getDeviceId();
    const first = await this.state.loading.isFirstTimeUse();
    // return;
    // alert(first);
    if (first) {
      this.setState({ notAgree: true });
      const registred = await this.state.loading.registerNewUser();
      // alert(registred["state"]);
      // console.log(registred);
      // return;
      if (registred.state == 200) {
        // alert();
        // console.log("user registred succussfully ");
        this.setState({
          progressWithOnComplete: this.state.progressWithOnComplete + 30,
        });
      } else {
        alert("ناسف خطاء رقم 1 , يمكنك محاولة لاحقا");
        console.log("error regisstring the user try later");
      }
    } else {
      this.setState({
        progressWithOnComplete: this.state.progressWithOnComplete + 40,
      });
    }
    const checkUpdate = await this.state.loading.checkUpdate();
    console.log(checkUpdate);
    // return;
    if (checkUpdate.state == 200) {
      const { appNeedUpdate, noAds, theAd } = checkUpdate;
      if (!appNeedUpdate) {
        this.setState({
          progressWithOnComplete: this.state.progressWithOnComplete + 50,
        });
        console.log("need update");
      } else {
        //TODO TAKE APP TO CONSOLE PAGE ON THE NEXT UPDATE
        alert("يحتاج التطبيق الي تحديث ");
      }
      this.props.setAppData({ noAds, theAd });
      // this.setState({ });
    } else {
      alert("ناسف خطاء رقم 2 , يمكنك محاولة لاحقا");
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Global.colors.bg,
        }}
      >
        <Image
          source={logo}
          style={{ width: 200, height: 200, marginBottom: 40, borderRadius: 8 }}
        />

        <ProgressBarAnimated
          barAnimationDuration={1200}
          // value={10}
          height={6}
          borderWidth={0}
          width={this.state.barWidth}
          value={this.state.progressWithOnComplete}
          backgroundColor={Global.colors.pr1}
          // onComplete={() => {
          //   if (
          //     !this.state.needUpdate &&
          //     !this.props.userData.userData.appNeedUpdate
          //   ) {
          //     this.props.navigation.navigate(this.state.page);
          //   }
          // }}
          onComplete={
            () => this.props.navigation.navigate("Home")
            // this.props.navigation.navigate("Home", {
            //   theAd: this.state.theAd,
            //   noAds: this.state.noAds,
            // })
          }
        />
        {this.state.notAgree && (
          <View>
            <Button
              onPress={(_) => this.agreeToTerms()}
              style={{
                paddingHorizontal: 30,
                marginTop: 20,
                // width: "90%",
                marginHorizontal: 4,

                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Get Started</Text>
            </Button>
            <View
              style={{
                // backgroundColor: "red",

                paddingHorizontal: 1,
                marginTop: 50,
                // display: "flex",
                // flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                // alignSelf: "flex-start",
              }}
            >
              <Text style={{ fontSize: 10 }}>
                By clicking "Get Started" if you reside in the EU,EEA or
                Switerland you are accept the
                <Text
                  style={{
                    textDecorationLine: "underline",
                    marginHorizontal: 2,
                  }}
                  onPress={(_) => alert("view terms of service")}
                >
                  {" "}
                  Terms of Service
                </Text>
              </Text>

              <Text style={{ fontSize: 10 }}>
                and if you reside in any other country you accept the
                <Text
                  style={{
                    textDecorationLine: "underline",
                    marginHorizontal: 2,
                  }}
                  onPress={(_) => alert("view terms of service")}
                >
                  Termsof service
                </Text>
                <Text> and</Text>{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    marginHorizontal: 2,
                  }}
                  onPress={(_) => alert("view terms of service")}
                >
                  {" "}
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  setAppData: (appData) => dispatch({ type: "setAppData", appData }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
