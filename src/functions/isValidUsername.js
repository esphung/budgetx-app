export default function isValidUsername(name) {
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  if (name.match(usernameRegex)) {
    return true;
  } else {
    return false;
  }
}