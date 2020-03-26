const mongoose = require( 'mongoose' );

const salesmanCollectionSchema = mongoose.Schema({
    name : { 
        type : String,
        required : true
    },
    id : {
        type : Number
    },
    fruit : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'fruits'
    }
});

const salesmanCollection = mongoose.model( 'salesmans', salesmanCollectionSchema );

const Salesmans = {
    createSalesman : function( newSalesman ){
        return salesmanCollection
                .create( newSalesman )
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err;
                });
    },
    getAllSalesmen : function(){
        return salesmanCollection
                .find()
                .populate('fruit', ['name'])
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err;
                });
    }
}

module.exports = { Salesmans };