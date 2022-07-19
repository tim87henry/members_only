var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema(
    {
        title: {type: String, required: true},
        text: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        time: {type: Date}
    }
);

module.exports = mongoose.model('Message', messageSchema);