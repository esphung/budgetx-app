import uuidv4 from 'functions/uuidv4';

function Payee({ name = '', owner }) {
  const obj = {
    id: uuidv4(),
    name: name,
    owner: global.storageKey,
    version: 0,
  };
  return obj;
}

export default Payee