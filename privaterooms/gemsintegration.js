"use strict"

//Checks to see how many gems a user has
const checkUserGems = function (user){
    return 100000;
}

//Checks to see if a specific user has at least this number of gems
const hasEnoughGems = function(user, amount){
    return true;
}

//Removes this number of gems from a user
const chargeGems = function(user, amount){
    return true;
}

module.exports = {
    checkUserGems: checkUserGems,
    hasEnoughGems: hasEnoughGems,
    chargeGems: chargeGems
}