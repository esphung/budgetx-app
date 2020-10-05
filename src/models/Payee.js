import uuidv4 from 'functions/uuidv4';

function Payee({ owner }) {
  const obj = {
    id: uuidv4(),
    name: '',
    owner: owner,
    version: 0,
  };
  return obj;
}

export default Payee