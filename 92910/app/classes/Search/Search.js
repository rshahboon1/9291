import Storage from "../Storage/Storage";

export default class Search {
  constructor({ phoneNumber, name, deviceId } = {}) {
    this.deviceId = deviceId;
    this.phoneNumber = phoneNumber;
    this.phoneNumberHistoryResult;

    this.name = name;
    this.historyTableName = "history";
  }

  async searchForPhone() {
    // alert();
    // return;
    if (!this.phoneNumber) return;
    this.phoneNumberHistoryResult = { name: "test Name", phone: "test phone" };
    // console.log("the phone search");
    // return;
    const lS = new Storage(this.historyTableName);
    // await lS.saveToHistory(this.phoneNumberHistoryResult);
  }

  searchForName() {
    if (!this.name) return;

    console.log("the name search");
  }
}
