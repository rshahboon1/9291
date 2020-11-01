import Storage from "../Storage/Storage";
import Global from "../../../Globals";
import Axios from "axios";

export default class Search {
  constructor({ phoneNumber, name, deviceId, encryptedId } = {}) {
    this.encryptedId = encryptedId;
    this.deviceId = deviceId;
    this.phoneNumber = phoneNumber;
    this.phoneNumberHistoryResult;

    this.name = name;
    this.historyTableName = "history";
  }

  async searchForPhone(more = "phonefind") {
    // alert(this.phoneNumber);
    // return;

    if (!this.phoneNumber) return;
    const endurl = `/app9291/v1/mobile/${more}?id=${this.deviceId}&phone=${this.phoneNumber}`;
    const url = Global.site.url + Global.site.endPoint + endurl;
    // console.log(url);
    // return;
    // alert();
    // console.log(this.encryptedId, this.deviceId);
    // return true;

    const result = await Axios.get(url, {
      headers: {
        "User-Agent": "app9291 android",
        Auth: this.encryptedId,
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
    console.log(result);
    if (result.state == 200) {
      this.phoneNumberHistoryResult = {
        name: result.data.result[0].name,
        phone: this.phoneNumber,
      };
      // console.log("the phone search");
      // return;
      const lS = new Storage(this.historyTableName);
      await lS.saveToHistory(this.phoneNumberHistoryResult);
    }
    return result;
  }

  async searchForName(from = 0) {
    // alert();
    if (!this.name) return;
    const endurl = `/app9291/v1/mobile/name?id=${this.deviceId}&name=${this.name}&from=${from}`;
    const url = Global.site.url + Global.site.endPoint + endurl;
    // console.log(url);
    // return;
    // alert();
    // console.log(this.encryptedId, this.deviceId);
    // return true;

    const result = await Axios.get(url, {
      headers: {
        "User-Agent": "app9291 android",
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
    // console.log(result);

    return result;
  }
}
