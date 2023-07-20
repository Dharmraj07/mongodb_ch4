const mongodb=require('mongodb');
const { getdb } = require('../util/database');
const Product = require('./product');

const ObjectId=mongodb.ObjectId;
//const getDb=require('../util/database').getdb;

class User{
  constructor(username,email,cart,id){
    this.name=username;
    this.email=email;
    this.cart=cart;
    this._id=id;
  }

  save(){
    const db=getdb();
    return db.collection('users').insertOne(this)
  }
  addToCart(product){
    // const cartProduct=this.items.cart.findIndex(cp =>{
    //   return cp._id===Product._id;

    // });
    const updatedCart={items:[{productId:new ObjectId(product._id),quantity:1}]};
    const db=getdb();
    return db.collection('users').updateOne({_id:new ObjectId(this._id)},
    {$set:{cart:updatedCart}});


  }

  static findById(userId){
    const db=getdb();
    return db.collection('users').findOne({_id: new ObjectId(userId)})
    .then(user =>{
      console.log(user);
      return user;
    })
    .catch(err =>{
      console.log(err);
    });
    
  }
}

module.exports = User;


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });