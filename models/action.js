var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')

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
    //to perform action you need inputs
    inputs: [{
        value: String,
        type: String,
        description: String,
        _id: false
    }],
    actionPerformed: Number
})
//TODO add collection schema

ActionSchema.add({
script: {
    //type is the script type that we support?
    //do we need to give it as reference?
    language: {type: Schema.Types.ObjectId, ref: 'Language'},
    path: { type: String },
    //only git type is supported for now
    type: { type: String, enum:['git']},
    _id: false
    }
})

ActionSchema.add({
    actioncollection: [{
        //type is the script type that we support?
    //do we need to give it as reference?
        action: {
            type: Schema.Types.ObjectId, 
            ref: 'Action'},
        orderId: Number,
        description: String,
        _id: false
    }]
})

ActionSchema.pre('save', function (next) {
    var validations = require('./validators/actionValidators')
    var self = this

    _.each(validations, function(v){
        v.call(self, next)
    })
    //add pramas of each actionCollection to top action
    //better to do it at run time?
    next()
  })

var model = mongoose.model('Action', ActionSchema)
module.exports = model