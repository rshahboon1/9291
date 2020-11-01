import Global from "../../../Globals";
import Axios from "axios";

export default class Plans {
  constructor({ cardOne, CardTwo, deviceId, encryptedId } = {}) {
    this.cardOne = cardOne;
    this.CardTwo = CardTwo;
    this.deviceId = deviceId;
    this.encryptedId = encryptedId;
  }

  async activateSilver() {
    // alert(this.phoneNumber);
    // return;

    if (!this.cardOne) return;
    const endurl = `/app9291/v1/mobile/silvergold?id=${this.deviceId}&card1=${this.cardOne}`;
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

    return result;
  }
  async activateGold() {
    if (!this.cardOne && !this.CardTwo) return;
    const endurl = `/app9291/v1/mobile/silvergold?id=${this.deviceId}&card1=${this.cardOne}&card2=${this.CardTwo}`;
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
