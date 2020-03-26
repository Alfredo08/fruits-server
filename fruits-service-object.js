const mongoose = require( 'mongoose' );

const fruitCollectionSchema = mongoose.Schema({
    name : { 
        type : String,
        required : true
    },
    id : {
        type : Number
    }
});

const fruitCollection = mongoose.model( 'fruits', fruitCollectionSchema );

const Fruits = {
    createFruit : function( newFruit ){
        return fruitCollection
                .create( newFruit )
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err;
                });
    },
    getAll : function(){
        return fruitCollection
                .find()
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err;
                }); 
    },
    getByName : function( name ){
        return fruitCollection
                .findOne( {name} )
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err;
                }); 
                
    }
}

module.exports = { Fruits };



