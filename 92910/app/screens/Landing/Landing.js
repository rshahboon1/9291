import React, { Component } from "react";
import { Text, View, Image, Alert } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import logo from "../../assets/logo.png";
import Global from "../../../Globals";
import Loading from "../../classes/Loading/Loading";
export default class Landing extends Component {
  state = {
    progressWithOnComplete: 10,
    barWidth: 300,
  };
  constructor(props) {
    super(props);
    const ldg = new Loading();
    this.state.loading = ldg;
  }
  async UNSAFE_componentWillMount() {
    await this.state.loading.getDeviceId();
    const first = await this.state.loading.isFirstTimeUse();
    console.log(first);
    if (first) {
      const registred = await this.state.loading.registerNewUser();
      // alert(registred["state"]);
      // console.log(registred);
      // return;
      if (registred.state == 200) {
        // alert();
        // console.log("user registred succussfully ");
        this.setState({
          progressWithOnComplete: this.state.progressWithOnComplete + 40,
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
      this.setState({ noAds, theAd });
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
          style={{ width: 200, height: 200, marginBottom: 40 }}
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
          onComplete={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
