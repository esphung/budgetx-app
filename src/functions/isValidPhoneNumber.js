export default function isValidPhoneNumber(phoneNumber) {
  phoneNumber.replace('-', '');
  var phoneno = /^([+])?([0-9]{1,5})?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneNumber.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}
