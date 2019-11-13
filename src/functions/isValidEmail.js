module.exports = function(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// console.log(isValidEmail('dskjds@s.co'))

// export default isValidEmail;