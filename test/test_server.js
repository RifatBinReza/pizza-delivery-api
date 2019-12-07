//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//TODO: Add more test cases for failed events and required parameters or query validations.

describe('orders', ()=>{

  /**
  * Test post user/customer route
  */
  describe('POST user', ()=>{
    it('it should POST a customer', (done)=>{
      let user = {
        first_name: 'Rifat Bin',
        last_name: 'Reza',
        address: 'House 131, Road 8, Uttara, Dhaka 1230',
        email: 'rifatbinreza@gmail.com',
      }
      chai.request(server)
      .post('/api/user/add')
      .send(user)
      .end((err, res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status');
        res.body.should.have.property('status').eql('success');
        done()
      })
    })
  })
  /**
   * Test POST order route
   */
  describe('POST order', ()=>{
    it('it should POST an order', (done)=>{
      let order = {
        type: 'margarita',
        size: 'large',
        quantity: 20,
        customer_id: 1
      }
      chai.request(server)
      .post('/api/order/add')
      .send(order)
      .end((err, res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status');
        res.body.should.have.property('status').eql('success');
        done()
      })
    })
  })

  /**
  * Test GET order route
   */
  describe('GET/:id order', ()=>{
    it('it should get an order by the given id', (done)=>{
      chai.request(server)
      .get('/api/order/1')
      .end((err, res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status')
        res.body.should.have.property('status').eql('success')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('order');
        res.body.data.should.have.property('customer')
        done()
      })
    })
  })
})