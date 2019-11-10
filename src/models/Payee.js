// Payee prototype

function Payee(id, name, color) {
  this.id = id;
  this.name = name;
  this.date = new Date();
  this.color = color;
  // this.category = category;

}

// // Default payees list
// const payees = [
//   {
//     name: 'Apple'
//   }
// ];

// const payee = new Payee(payees.length, 'AT&T');

// console.log(payee.stringify);

// payees.unshift(payee);

// console.log(JSON.stringify(payees));
