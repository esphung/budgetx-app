/*
FILENAME:  Color.js
PURPOSE:   Color type for Financely UI (optional)
AUTHOR:    Eric Phung
CREATED:   01/07/2020 01:47 AM
*/

const Color = (name, value) => {
  return {
    // id: Date.now(),
    name: name,
    value: value,
  }
}// end Color definition

// add prototype method
Object.prototype.setName = function(str) {
	this.name = str;
}// end prototype method

Object.prototype.setValue = function(str) {
  // body...
  this.value = str;
};

module.exports = Color;

// // Test
// let test = {
//   name: 'hello'
// }

// test.setName('world');
// console.log(test);

// const color = new Color('white', '#ffffff');
const color = Color('white', '#ffffff');

color.setName('black');

color.setValue('#000000')

console.log(color);


