const mongoose = require('mongoose')
const { Schema } = mongoose

const crypto = require("crypto")

const adminSchema = new Schema({
    portalName: {
        type: String,
    },
    address: {
        type: String
    },
    email: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    dates: {
        type: [{date: String, clicked: Boolean}],
    },
    time: {
        type: [{time: String, clicked: Boolean}],
    },
    price: {
        type: Number
    },
    hash : String, 
    salt : String,
})

adminSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
     
    // Hashing user's salt and password with 1000 iterations, 
        
    this.hash = crypto.pbkdf2Sync(password, this.salt,  1000, 64, `sha512`).toString(`hex`); 
}; 
     
   // Method to check the entered password is correct or not 
adminSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

module.exports = mongoose.model('Admin', adminSchema); 