const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChannelSchema = new Schema({
    _id:String,
    subscribers:Number,
    video_views:Number
  })
  var mongoose_csv = require('mongoose-csv');
  ChannelSchema.plugin(mongoose_csv);
const Channel = mongoose.model('ytchannels', ChannelSchema);

module.exports = Channel;