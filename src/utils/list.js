import _ from 'lodash';

export function updateRecord(_records, record){
  const records = _records;
  var index = _.findIndex(records, (i) => {
    return i.id === record.id; 
  });
  records[index] = record;
  return records;
}

export function destroyRecord(_records, id) {
  var records = _.remove(_records, (i) => {
    return i.id === id; 
  });
  return records;
}