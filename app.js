var models = require('./models')
var mongoose = require('mongoose')
var db = require('./models/db')

var action = models.Action
var language = models.Language

language.findOne(null, function (err, lang) {
    console.log(lang)
    action.findOne(null, function (err, act) {
        var a = new action({
            name: 'A simple action collection',
            type: 'actioncollection',
            actioncollection: [{
                action: act,
                orderId: 1,
                description: 'This is description 1'
            },
            {
                action: act,
                orderId: 2,
                description: 'This is description 2'
            }]
            
        })
        
        a.save(function (err, p) {
            if (err)
                console.error(err)
            console.log(p)
        })
    })
})


