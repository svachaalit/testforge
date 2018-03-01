var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: String,
    type: { 
        type: String,
        required: [true, 'Type is required'],
        enum: ['actioncollection', 'script']
    },
    date: { type: Date, default: Date.now },
    actionPerformed: Number
})
//TODO add collection schema

ActionSchema.add({
script: {
    //type is the script type that we support?
    //do we need to give it as reference?
    language: {type: Schema.Types.ObjectId, ref: 'Language'},
    path: { type: String, required:[true, 'Script path is required']},
    //only git type is supported for now
    type: { type: String, enum:['git'], required:[true, 'Script type is required']}
    }
})

ActionSchema.add({
    actioncollection: [{
        //type is the script type that we support?
    //do we need to give it as reference?
        action: {type: Schema.Types.ObjectId, ref: 'Action'},
        orderId: Number,
        description: String
    }]
})

var model = mongoose.model('Action', ActionSchema)
module.exports = model