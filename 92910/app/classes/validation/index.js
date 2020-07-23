class Validation {
  static isMadar = phoneNumber => {
    return phoneNumber.slice(0, 3) == "091" ? true : false;
  };

  static rightPhoneNumber(phonenumber) {
    return phonenumber.length == 10 ? true : false;
  }
  static phoneStartsWithZiro(phonenumber) {
    return phonenumber.slice(0, 1) == "0" ? true : false;
  }
}

export default Validation;
