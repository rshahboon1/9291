import React from "react";
import { StyleSheet } from "react-native";
import Globals from "../../../Globals";
const onDev = Globals.app.debuging;

import {
  AdMobBanner,
  InterstitialAd as AdMobInterstitial,
  PublisherBanner,
  RewardedAd as AdMobRewarded,
  BannerAdSize,
  TestIds,
} from "react-native-admob";
import { View } from "native-base";
const style = StyleSheet.create({
  adView: { alignItems: "center", justifyContent: "center" },
});
export function HomeAd() {
  //ca-app-pub-3940256099942544/6300978111 //this is for develpment reason
  return (
    <View style={style.adView}>
      <AdMobBanner
        adUnitID={
          !onDev
            ? "ca-app-pub-3698961787387868/8413178699"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        adSize="fullBanner"
        testDevices={[PublisherBanner.simulatorId]}
        onAdFailedToLoad={(error) => console.warn(error)}
      />
    </View>
  );
}
