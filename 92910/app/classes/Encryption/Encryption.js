// var CryptoJS = require("crypto-js");
import CryptoJS from "react-native-crypto-js";
export default class Encryption {
  constructor() {
    this.iv = CryptoJS.enc.Hex.parse("f6c3f06743ecb664280f11f499856573");
    this.key = CryptoJS.enc.Hex.parse("2bc8741c734fc8518b1058a1dfdfd6bd");
    return this;
  }

  async encrypt(text) {
    const Encrypted = await CryptoJS.AES.encrypt(text, this.key, {
      iv: this.iv,
    }).toString();
    console.log(Encrypted, "test encrypted", text, "the real id");
    return Encrypted;
  }
}
