import React, { Component } from "react";
import { View, Text } from "react-native";
import Site from "./Site";
import AppDownload from "./AppDownload";
import YoutubeWatch from "./YoutubeWatch";
import FacebookPageOrGroup from "./FacebookPageOrGroup";

export default class MyAds extends Component {
  static get propTypes() {
    return MyAds._propTypes;
  }
  static set propTypes(value) {
    MyAds._propTypes = value;
  }
  UNSAFE_componentWillMount() {
    // console.warn(this.props.theAd);
  }

  render() {
    const {
      title,
      description,
      type,
      img,
      uri,
      group,
      page,
    } = this.props.theAd;
    switch (type) {
      case "site":
        return (
          <Site
            title={title}
            description={description}
            img={img}
            mylink={uri}
          />
        );
        break;
      case "appDownload":
        return (
          <AppDownload
            title={title}
            description={description}
            img={img}
            mylink={uri}
          />
        );
        break;
      case "youtubeWatch":
        return (
          <YoutubeWatch
            title={title}
            description={description}
            img={img}
            mylink={uri}
          />
        );
        break;
      case "facebookLike":
        return (
          <FacebookPageOrGroup
            title={title}
            description={description}
            img={img}
            mylink={uri}
            group={group}
            page={page}
          />
        );
        break;

      default:
        return <View>{/* <Text>test</Text> */}</View>;
        break;
    }
    // return (
    //     <View>
    //         <Text> prop </Text>
    //     </View>
    // )
  }
}
