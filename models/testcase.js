var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash')

var TestCaseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    status: { 
        type: String,
        default: 'tobeautomated',
        enum: ['automated', 'tobeautomated', 'manual']
    },
    description: String,
    date: { type: Date, default: Date.now },
    actions: [{
        action: {
            type: Schema.Types.ObjectId, 
            ref: 'Action'
        },
        orderId: Number,
        description: String,
        _id: false
    }],
    inputs: [{
        key: String,
        value: String
    }]
})