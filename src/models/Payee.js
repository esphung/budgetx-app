import uuidv4 from '../functions/uuidv4';

function Payee(id, name, owner, version) {
  const obj = {
    id: (id) ? id : uuidv4(),
    name: (name) ? name : 'None',
    owner: (owner) ? owner : global.storageKey,
    version: (version) ? version : 0,
  };
  return obj;
}

export default Payee