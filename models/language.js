var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
    name: {type: String, required: true},
    version: {type: String, required: true}
})

var model = mongoose.model('Language', LanguageSchema)
module.exports = model