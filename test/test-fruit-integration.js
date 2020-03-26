const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Fruits } = require( './../fruits-service-object' );
const { app, connectToDatabase, closeServer } = require('./../server');

const TEST_DATABASE_URL = 'mongodb://localhost/test-fruitsdb';

chai.use( chaiHttp );

function generateFruitData(){
    return {
        name : 'apple',
        id : 123       
    };
}

function seedFruitData(){
    console.log( 'seeding fruit data' );

    const seedData = generateFruitData();

    return Fruits.createFruit( seedData );
}

function tearDownDb(){
    return mongoose.connection.dropDatabase();
}

describe(' Fruits API tests', () => {
    before( () => {
        return connectToDatabase(TEST_DATABASE_URL);
    });

    beforeEach( () => {
        return seedFruitData();
    });

    afterEach( () => {
        return tearDownDb();
    });

    after( () => {
        return closeServer();
    });

    describe( '/POST new fruit endpoint', () => {
        it('should add a new fruit', () => {
            const newFruit = { 
                name : 'Pear',
                id : 456
            };

            return chai.request( app )
                .post('/api/addFruit')
                .send( newFruit )
                .then( res => {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'name', '_id');
                    expect(res.body.name).to.equal(newFruit.name);
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.id).to.equal(newFruit.id);
                });

        })
    })

})
