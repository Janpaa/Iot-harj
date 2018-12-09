const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Data = new Schema({
  cpuUsage: {
    type: String
  },
  freeMem: {
      type: String
  },
  sysTime: {
    type: String
}
},{
    collection: 'osData'
});

module.exports = mongoose.model('Data', Data);