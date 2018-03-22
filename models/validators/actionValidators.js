// rest sub-schema validation
var collectionValidation = function (next) {
    var errors = []
    var self = this
    var doc = this.actioncollection
  
    if (this.type !== 'actioncollection') return next()
  
    if (!doc) {
      //Error handling
      errors.push('NO_DOC')
    }
  
    if (this.script ) {
      //if the type is actioncollection then remove this node from data
      delete this.script
    }

    if(!doc instanceof Array){
        errors.push('actioncollection must be an array')
    }else{
        //Verify each object of actioncollection
        //TODO function verifyCollectionObject(){
        //}
        
        //sort collection based on orderId
        doc.sort(function(x, y) { 
            if(!x) return false;
            return x.orderId > y.orderId }
        ).filter(function(n){ 
            return n != undefined 
        })

        let orderNumber = 0
        _.each(doc, function(action){
            doc[i].orderId = orderNumber
            orderNumber++
        })
    }

    
    _.each(errors, function (e) {
      self.invalidate(e, JSON.stringify(e))
    })
  
    // logger.info('validateHeaders', errors)
    return next()
  }

  // rest sub-schema validation

var scriptValidation = function (next) {
    var errors = []
    var self = this
    var doc = this.script
  
    if (this.type !== 'script') return next()
  
    if (!doc) {
      //Error handling
      errors.push('NO_DOC')
    }
  
    if (this.actioncollection ) {
      //if the type is script then remove this node from data
      delete this.actioncollection
    }

    
    //sort collection based on orderId
    if(!doc.language){
        errors.push('field script.language is not provided')
    }
    if(!doc.path){
        errors.push('field script.path is not provided')
    }
    if(!doc.type){
        errors.push('field script.type is not provided')
    }

    _.each(errors, function (e) {
      self.invalidate(e, JSON.stringify(e))
    })
  
    // logger.info('validateHeaders', errors)
    return next()
  }

  exports.scriptValidation = scriptValidation
  exports.collectionValidation = collectionValidation