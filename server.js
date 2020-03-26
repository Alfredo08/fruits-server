const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const { Fruits } = require( './fruits-service-object' );
const { Salesmans } = require( './salesman-service-object' );

const jsonParser = bodyParser.json();

const app = express();

app.get( '/api', ( req, res ) => {
    return res.status(200).json({test:'test'})
});

app.post( '/api/addFruit', jsonParser, ( req, res ) => {

    const { name, id } = req.body;

    Fruits
        .createFruit( { name, id } )
        .then( newFruit => {
            return res.status(201).json( newFruit );
        })
        .catch( err => {
            return res.status(500).send("Somehting went wrong!");
        })
});

app.post( '/api/addSalesman', jsonParser, ( req, res ) => {
    const { name, id, fruit } = req.body;

    Fruits
        .getByName( fruit )
        .then( result => {
            // Validate that you get something, otherwise send an error
            let newSaleman ={
                name,
                id,
                fruit : result._id
            };

            Salesmans
                .createSalesman( newSaleman )
                .then( newSaleman => {
                    return res.status(201).json( newSaleman );
                });
        });
});

app.get( '/api/getAllSalesman', ( req, res ) => {
    Salesmans
        .getAllSalesmen()
        .then( list => {
            return res.status(200).json( list );
        });
});

let server = app.listen(8080, () => {
    console.log( "Listening on port 8080" );
    connectToDatabase('mongodb://localhost/fruitsdb');
});

function connectToDatabase( DATABASE_URL ){

    return new Promise( ( resolve, reject ) => {
        mongoose.connect( DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, ( error ) => {
            if( error ){
                return reject( error );
            }
            else{
                return resolve("Success");
            }
        })
    })
    .then( dbResponse => {
        console.log( "Database connected correctly!", dbResponse );
    })
    .catch( err => {
        mongoose.disconnect();
        console.log( "Something went wrong with the connection!", err );
    })
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

module.exports = { app, connectToDatabase, closeServer };