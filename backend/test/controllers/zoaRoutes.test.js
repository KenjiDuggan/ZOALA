process.env.NODE_ENV = 'test'; 

let mongoose = require('mongoose'); 
let Zoa = require('../../models/zoa'); 

let chai = require('chai'); 
let chaiHttp = require('chai-http'); 
let index = require('../../index'); 
let should = chai.should(); 

const OK = 200; 

chai.use(chaiHttp); 

describe('Zoa User', () => {
    beforeEach((done) => {
        Zoa.remove({}, (err) => {
            done(); 
        });
    });

    describe('/GET zoa', () => {
        it('it should GET all zoa users', (done) => {
            chai.request(index)
                .get('/zoas')
                .end((err, res) => {
                    res.should.have.status(201); 
                    res.body.should.be.a('array'); 
                    res.body.length.should.be.eql(0); 
                done(); 
                }); 
        }); 
    }); 


    describe('/POST zoa', () => {
        it('it should not POST a zoa user without name field', (done) => {
            let zoa = {
                hours: 8, 
                available: true,
            }
            chai.request(index)
                .post('/zoas')
                .send(zoa)
                .end((error, res) => {
                    res.should.have.status(400); 
                    res.body.should.be.a('object'); 
                    res.body.should.have.property('error'); 
                    res.body.error.errors.name.should.have.property('name'); 
                    res.body.error.errors.name.should.have.property('kind').eql('required'); 
                done(); 

                })
        });

        it('it should POST a zoa user', (done) => {
            let zoa = {
                name: 'wowzer', 
                hours: 12, 
                available: true
            }
            
            chai.request(index)
                .post('/zoas')
                .send(zoa)
                .end((error, res) => {
                    res.should.have.status(201); 
                    res.body.should.be.a('object'); 
                    res.body.should.have.property('hours').eql(12); 
                    res.body.should.have.property('name'); 
                    res.body.should.have.property('hours'); 
                    res.body.should.have.property('available'); 
                done(); 
                });
        });
    }); 


    describe('/GET/:id zoa', () => {
        it('it should GET a zoa user by his ID', (done) => {
            let zoa = new Zoa({
                name: 'Ken', 
                hours: 8, 
                available: true
            });
            zoa.save((error, zoa) => {
                chai.request(index)
            .get('/zoas/' + zoa.id)
            .send(zoa)
            .end((error, res) => {
                res.should.have.status(201); 
                res.body.should.be.a('object'); 
                res.body.should.have.property('name'); 
                res.body.should.have.property('hours'); 
                res.body.should.have.property('available'); 
                res.body.should.have.property('_id').eql(zoa.id); 
            done(); 
            });
            });
        });
    });

    describe('/PUT/:id zoa', () => {
        it('it should update zoa user given the id', (done) => {
            let zoa = new Zoa({
                name: 'Ken', 
                hours: 12, 
                available: true
            });
            zoa.save((err, zoa) => {
                chai.request(index)
                .put('/zoas/' + zoa.id)
                .send({
                    name: 'Ken', 
                    hours: 12, 
                    available: true
                })
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Ken'); 
                    res.body.should.have.property('hours').eql(12); 
                done(); 
                });
            });
        });
    });

    describe('/DELETE/:id zoa', () => {
        it('it should DELETE a zoa user given the ID', (done) => {
            let zoa = new Zoa({
                name: 'Ken', 
                hours: 12, 
                available: true
            })
            zoa.save((err, zoa) => {
                chai.request(index)
                .delete('/zoas/', zoa.id)
                .end((err, res) => {
                    res.should.have.status(201); 
                    res.body.should.be.a('object'); 
                    res.body.should.have.property('name').eql('Ken'); 
                    res.body.results.should.have.property('ok').eql(1);
                    res.body.results.should.have.property('n').eql(1);
                done(); 
                });
            });
        });
    });


});