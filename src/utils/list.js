import _ from 'lodash';

export function updateRecord(_records, record){
  const records = _records;
  var index = _.findIndex(records, (i) => {
    return i.id === record.id; 
  });
  records[index] = record;
  return records;
}