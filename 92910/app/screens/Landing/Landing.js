import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import logo from "../../assets/logo.png";
import Global from "../../../Globals";
export default class Landing extends Component {
  state = {
    progressWithOnComplete: 10,
    barWidth: 300,
  };
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({ progressWithOnComplete: 100 });
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
