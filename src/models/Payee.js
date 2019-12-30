// Payee function class

export default function Payee(name) {
  const currentDate = new Date();
  this.id = `${Date.now(currentDate)}`;
  this.name = (name) ? name : '';
  this.created = currentDate;
}
