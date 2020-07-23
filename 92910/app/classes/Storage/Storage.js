import AsyncStorage from "@react-native-community/async-storage";
import * as _ from "lodash";

export default class Storage {
  constructor(table) {
    this._TABLE = table;
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this._TABLE);

      if (value !== null) {
        // We have data!!
        // console.log(value);
        return value;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      // Error retrieving data
    }
  };
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem(this._TABLE, data);
    } catch (error) {
      // Error saving data
    }
  };
  async getLastTimeUpload() {
    const value = await this._retrieveData();
    return value || new Date("2019-07-22T16:07:21.786Z");
  }

  setLastTimeUpload(date) {
    // const date = new Date();
    this._storeData(date);
  }

  async saveToHistory(data) {
    console.log("saveing to history");

    const hisArray = [];
    let oldHistory = await this._retrieveData();
    // console.log(
    //   "=========================",
    //   oldHistory,
    //   oldHistory.length,
    //   typeof oldHistory,
    //   "---------------------------------"
    // );
    if (oldHistory.length > 2) {
      oldHistory = JSON.parse(oldHistory);
      // console.log(ol)
      if (oldHistory.length > 15) {
        oldHistory = oldHistory.slice(0, 15); //the lenght of the dat to be stored in local storage
      }
      oldHistory.unshift(data);
      this._storeData(JSON.stringify(oldHistory));
    } else {
      hisArray.push(data);
      this._storeData(JSON.stringify(hisArray));
    }
  }
  static clearHistory = async () => {
    this._storeData("");
  };
  async getFromHistory() {
    console.log("get from history");
    let data = await this._retrieveData();
    if (data.length > 2) {
      data = JSON.parse(data);
    } else {
      data = [];
    }
    // console.log(data, "history git ");
    return data;
  }
  async getUserData() {
    let data = await this._retrieveData();
    if (data.length > 2) {
      data = JSON.parse(data);
    } else {
      const now = new Date();
      data = {
        firstTimeUse: false,
        // deviceId: null,
        // contactsCount: 0,
        // date: now,
      };
    }
    // console.log(data, "history git ");
    return data;
  }
}
