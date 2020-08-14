import React from "react";
import { StyleSheet } from "react-native";
import Globals from "../../../Globals";
const onDev = Globals.app.debuging;

import {
  BannerAd,
  InterstitialAd as AdMobInterstitial,
  // PublisherBanner,
  RewardedAd as AdMobRewarded,
  BannerAdSize,
  TestIds,
} from "react-native-admob";
import { View } from "native-base";
const style = StyleSheet.create({
  adView: { alignItems: "center", justifyContent: "center" },
});
export function HistoryAd() {
  //ca-app-pub-3940256099942544/6300978111 //this is for develpment reason
  return (
    <View style={style.adView}>
      <BannerAd
        unitId={
          !onDev
            ? "ca-app-pub-3698961787387868/8268974007"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}

        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}
export function AdmediumRectangle() {
  return (
    <View style={style.adView}>
      <AdMobBanner
        // style={{flex: 1}}
        adSize="mediumRectangle"
        adUnitID={
          !onDev
            ? "ca-app-pub-3698961787387868/6689580948"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        unitId={TestIds.BANNER}
        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}
// export function AdlargeBanner() {
//   return (
//     <View style={style.adView}>
//       <AdMobBanner
//         adSize="largeBanner"
//         adUnitID="ca-app-pub-3940256099942544/6300978111"
//       // testDevices={[AdMobBanner.simulatorId]}
//       // onAdFailedToLoad={error => console.error(error)}
//       />
//     </View>
//   );
// }
export function SearchScreenAd() {
  return (
    <View style={style.adView}>
      <BannerAd
        unitId={
          !onDev
            ? "ca-app-pub-3698961787387868/3484578852"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}

        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}
export function UserModelAd() {
  return (
    <View style={style.adView}>
      <BannerAd
        unitId={
          !onDev
            ? "ca-app-pub-3698961787387868/4533936647"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}

        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}

export function NameModelAd() {
  //ca-app-pub-3940256099942544/6300978111 //this is for develpment reason
  return (
    <View style={style.adView}>
      <BannerAd
        unitId={
          !onDev
            ? "ca-app-pub-3698961787387868/9083076817"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}

        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}

export function UserMsgAd() {
  //ca-app-pub-3940256099942544/6300978111 //this is for develpment reason
  return (
    <View style={style.adView}>
      <BannerAd
        unitId={
          !onDev
            ? "ca-app-pub-3698961787387868/5919170503"
            : "ca-app-pub-3940256099942544/6300978111"
        }
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}

        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
}
