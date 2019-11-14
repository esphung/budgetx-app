// Payee prototype

export default function Payee(id, name) {
  this.id = String((new Date()).getTime());
  this.name = name;
  this.created = new Date();
  // this.color = '#ffffff'
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
