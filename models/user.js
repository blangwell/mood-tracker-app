'use strict';

const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: { //sequelize looks for this syntax
          args: [1, 99],
          msg: 'Name must be 1 to 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { // sequelize validation
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook('beforeCreate', function(pendingUser) {
    // we use function() because we are constructing
    // remember fat arrows dont play nice with constructors
    // hash the password ; second arg is how many times we're hashing it
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    
    // set the user password to the hash
    pendingUser.password = hash;
  })
  // compare entered password for whats in the database
  user.prototype.validPassword = function(passwordTyped) {
    //this.password is the actual password the use typed in
    // compare sync takes this.password and encrypts it and compares it
    // returns boolean
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    // return true or false based on if pwd is correct
    return correctPassword;
  };

  // remove the password before it gets serialized (create session and maneuver to app)
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
}