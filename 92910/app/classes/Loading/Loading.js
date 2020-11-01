import Storage from "../Storage/Storage";
// import * as Device from "expo-device";
import DeviceInfo from "react-native-device-info";
import CryptoJS from "react-native-crypto-js";
import Encryption from "../Encryption/Encryption";
import Global from "../../../Globals";
import Axios from "axios";

export default class Loading {
  constructor({} = {}) {
    this.deviceId = "";
    this.encryptedId = "";
    // this.getDeviceId();
    this.userData = {};
    this.userDataTableName = "userData";
    this.Storage = new Storage(this.userDataTableName);
  }
  async getDeviceId() {
    const id = await DeviceInfo.getUniqueId();
    const bundleversion = await DeviceInfo.getBuildNumber();
    const Encrypt = await new Encryption().encrypt(id);

    // console.log("getting device id ...", id);
    this.deviceId = id;
    this.bundleversion = bundleversion;
    this.encryptedId = Encrypt;
  }
  async getUserData() {
    const data = await this.Storage.getUserData();
    this.userData = data;
    // console.log(data, "555555555555555");
    // this.isFirstTimeUse();
  }
  async isFirstTimeUse() {
    await this.getUserData();

    // console.warn(this.userData.firstTimeUse);
    // alert(this.userData.firstfTimeUse);
    // console.warn(this.userData);
    return this.userData.firstTimeUse;
  }
  async checkUpdate() {
    const endurl = `/app9291/v1/mobile/appusercontrol`;
    const url = Global.site.url + Global.site.endPoint + endurl;

    console.log(url, this.encryptedId, this.deviceId);
    // return true;

    const registred = await Axios.post(
      url,
      {
        id: this.deviceId,
        bundleversion: this.bundleversion,
      },
      {
        headers: {
          "User-Agent": "app9291 android",
          Auth: this.encryptedId,
        },
      }
    )
      .then((response) => {
        return response.data;
        // here will be cheerio scraping
      })
      .catch(function (e) {
        console.log(e);
        return { state: 201 };
      });
    return registred;
  }
  async registerNewUser() {
    const endurl = `/app9291/v1/mobile/registeruser?id=${this.deviceId}`;
    const url = Global.site.url + Global.site.endPoint + endurl;

    console.log(url);
    // return true;

    const registred = await Axios.get(url, {
      headers: {
        "user-Agent": "app9291 android",
        auth: this.encryptedId,
      },
    })
      .then((response) => {
        return response.data;
        // here will be cheerio scraping
      })
      .catch(function (e) {
        console.log(e);
        return { state: 201 };
      });
    return registred;
    // console.warn(registred);
  }
  //   async checkUserRegistred() {
  //     //backend check if user exists
  //     return false;
  //   }
  //   async getOldUserOnline() {
  //     console.log("getting old user data ...");
  //   }
}
