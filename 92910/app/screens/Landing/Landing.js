import React, { Component } from "react";
import { Text, View, Image } from "react-native";
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
    const first = await this.state.loading.isFirstTimeUse();
    console.log(first);
    if (first) {
      alert("yes");
      const registred = await this.state.loading.registerNewUser();
      if (registred) {
        // alert();
        console.log("user registred succussfully ");
        this.setState({
          progressWithOnComplete: this.state.progressWithOnComplete + 40,
        });
      } else {
        console.log("error regisstring the user try later");
      }
    } else {
      alert("not first time ");
      this.setState({
        progressWithOnComplete: this.state.progressWithOnComplete + 40,
      });
    }
    const checkUpdate = await this.state.loading.checkUpdate();
    if (checkUpdate) {
      console.log("need update");
    } else {
      this.setState({
        progressWithOnComplete: this.state.progressWithOnComplete + 50,
      });

      console.log("dont need update");
    }
    setTimeout(() => {
      // this.setState({ progressWithOnComplete: 100 });
    }, 2000);
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
