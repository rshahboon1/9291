import Storage from "../Storage/Storage";
// import * as Device from "expo-device";
import DeviceInfo from "react-native-device-info";

export default class Loading {
  constructor({} = {}) {
    this.deviceId = "";
    this.getDeviceId();
    this.userData = {};
    this.userDataTableName = "userData";
    this.Storage = new Storage(this.userDataTableName);
  }
  async getDeviceId() {
    const id = await DeviceInfo.getUniqueId();
    console.log("getting device id ...", id);
    this.deviceId = id;
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
    // // console.warn(this.userData);
    return this.userData.firstTimeUse;
  }
  async checkUpdate() {
    return false;
  }
  async registerNewUser() {
    console.log("registring the new user  which id is ...", this.deviceId);
    return true;
  }
  //   async checkUserRegistred() {
  //     //backend check if user exists
  //     return false;
  //   }
  //   async getOldUserOnline() {
  //     console.log("getting old user data ...");
  //   }
}
