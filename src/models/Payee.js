// Payee prototype

export default function Payee(name) {
  this.id = `${Date.now()}`;
  this.name = name;
  // this.date = new Date();
  this.created = new Date();
  // this.color = '#ffffff'
  // this.category = category;

  // console.log(this);
}
